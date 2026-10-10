# OVH VPS setup

How to go from no server to mvmpatron.pl running on an OVH VPS. Cloud Run keeps serving the
site until step 7, so nothing visitors see changes before then.

## 1. Before ordering: create an SSH key on your computer

Skip this if you already have `~/.ssh/id_ed25519.pub`.

```sh
ssh-keygen -t ed25519 -C "adam@mvmpatron"
cat ~/.ssh/id_ed25519.pub   # Windows PowerShell: type $env:USERPROFILE\.ssh\id_ed25519.pub
```

If the VPS was ordered without a key, log in once with the emailed password and append that
line to `~/.ssh/authorized_keys` on the server. Check that a key login works before step 3.

## 2. Order the VPS

In the OVHcloud Control Panel, order a VPS with:

- **Plan:** the smallest current tier is enough (the site uses about 100 MB of RAM).
- **Image:** Ubuntu 24.04 or newer LTS (plain OS, no preinstalled apps). The live server runs 26.04.
- **Location:** the data centre closest to Poland that is offered (Warsaw if available, otherwise Frankfurt, Strasbourg or Gravelines).
- **SSH key:** paste the public key from step 1.
- **Backups:** the automated backup option is worth enabling; the site itself has no data, but it saves redoing this setup.

Note the VPS IPv4 (and IPv6, if shown) from the confirmation email. OVH Ubuntu images log in as `ubuntu`.

## 3. Secure the server and install Docker

```sh
ssh ubuntu@<VPS_IP>
```

Then run, as `ubuntu`. Paste one command at a time: `apt-get` reads the rest of a pasted block
as its own input and the later lines never run.

```sh
sudo apt-get update && sudo apt-get -y upgrade
sudo apt-get install -y ufw fail2ban unattended-upgrades docker.io docker-compose-v2

# SSH: keys only, no root login. The 00- prefix matters: the first value sshd reads wins, and
# cloud images ship 50-cloud-init.conf with PasswordAuthentication yes.
printf 'PasswordAuthentication no\nKbdInteractiveAuthentication no\nPermitRootLogin no\n' | sudo tee /etc/ssh/sshd_config.d/00-hardening.conf
sudo systemctl reload ssh

# Firewall: SSH, HTTP, HTTPS only
sudo ufw allow OpenSSH && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 443/udp
sudo ufw --force enable

sudo systemctl enable --now docker fail2ban
sudo sshd -T | grep -Ei '^(passwordauthentication|permitrootlogin)'   # both must say no

# A separate user that GitHub Actions deploys as
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG docker deploy
sudo mkdir -p /opt/mvmpatron && sudo chown deploy:deploy /opt/mvmpatron
```

Being in the `docker` group gives `deploy` root-level control of the server. That is acceptable
here because the VPS runs nothing else and `deploy` can only log in with its key.

## 4. Create the site's settings file

```sh
sudo -u deploy tee /opt/mvmpatron/.env > /dev/null <<'ENV'
DOMAIN=test.mvmpatron.pl
GEMINI_API_KEY=<your Gemini API key>
ENV
sudo chmod 600 /opt/mvmpatron/.env
```

Start with `test.mvmpatron.pl` so the VPS can be checked before the real domain moves. Caddy
can only get an HTTPS certificate for a name that already points at the VPS.

## 5. Connect GitHub Actions

On the VPS, create a key that only GitHub Actions uses:

```sh
sudo -u deploy sh -c 'mkdir -p ~/.ssh && ssh-keygen -t ed25519 -N "" -f ~/.ssh/github-actions -C github-actions && cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'
sudo cat /home/deploy/.ssh/github-actions   # private key, for the VPS_SSH_KEY secret
```

On your computer, get the server's fingerprint line:

```sh
ssh-keyscan -t ed25519 <VPS_IP>
```

In GitHub, open the repository, then **Settings > Secrets and variables > Actions**:

| Kind | Name | Value |
| --- | --- | --- |
| Secret | `VPS_SSH_KEY` | the whole private key printed above |
| Secret | `VPS_KNOWN_HOSTS` | the line `ssh-keyscan` printed |
| Variable | `VPS_HOST` | the VPS IPv4 address |
| Variable | `VPS_USER` | `deploy` |

Deploys stay switched off until `VPS_HOST` is set. Then delete the private key from the VPS:
`sudo rm /home/deploy/.ssh/github-actions`.

## 6. First deploy on the test name

1. In the OVH Control Panel, open **Web Cloud > Domain names > mvmpatron.pl > DNS zone** and add an `A` record: subdomain `test`, target the VPS IPv4, TTL 300.
2. In GitHub, open **Actions > Build and deploy > Run workflow** on `main`.
3. On the VPS, add `TEST_DOMAIN=test.mvmpatron.pl` to `/opt/mvmpatron/.env` and leave `DOMAIN` unset (or `localhost`) until step 7, then `cd /opt/mvmpatron && sudo docker compose up -d`.
4. When it finishes, open https://test.mvmpatron.pl and check the logo, the services, the map and the cookie banner, on a computer and a phone.

### Test site and public site

The VPS runs two copies of the site. Every merge to `main` goes to the **test site**
(test.mvmpatron.pl). The **public site** (mvmpatron.pl) changes only when you run
**Actions > Publish to production > Run workflow** in GitHub, which copies the version from the
test site exactly as it is.

The test site asks for a login. The user name is `mvm` (`TEST_AUTH_USER` in `.env`). To set or
change the password, run this on the VPS in one line. It asks for the new password (nothing
shows while you type):

```
cd /opt/mvmpatron && read -rsp 'New test site password: ' p && echo && h=$(sudo docker compose exec -T caddy caddy hash-password --plaintext "$p") && unset p && sudo sed -i '/^TEST_AUTH_HASH=/d' .env && echo "TEST_AUTH_HASH='$h'" | sudo tee -a .env >/dev/null && sudo docker compose up -d
```

Until a password is set, nobody can log in to the test site.

## 7. Move mvmpatron.pl to the VPS

1. The day before: in the DNS zone, lower the TTL of the `A`/`AAAA` records for `mvmpatron.pl` and `www` to 300 seconds. Write down their current values; they are your rollback.
2. In GitHub, run **Actions > Publish to production** so the public copy has the latest tested version. Then on the VPS, set `DOMAIN=mvmpatron.pl` and `WWW_DOMAIN=www.mvmpatron.pl` in `/opt/mvmpatron/.env` (keep `TEST_DOMAIN=test.mvmpatron.pl`), then `cd /opt/mvmpatron && sudo docker compose up -d`.
3. In the DNS zone, point `mvmpatron.pl` and `www` (`A` records, plus `AAAA` if the VPS has IPv6) at the VPS. Delete any other `A`/`AAAA` records for those names that point at Google.
4. **Do not touch the `MX`, `TXT`, `SPF` or `DKIM` records:** they carry email for `mvm@mvmpatron.pl`.
5. Within a few minutes, https://mvmpatron.pl loads from the VPS and Caddy has its certificate. Check it as in step 6.

Rollback: put the old `A`/`AAAA` values back. Cloud Run is still running.

## 8. Retire Cloud Run (after about two weeks)

In the Google Cloud console: remove the domain mapping for mvmpatron.pl, delete the Cloud Run
service, delete the `gemini_api_key` secret and the images in Artifact Registry. Raise the DNS
TTL back to 3600. Keep the `test` record: it is the test site.

## Day to day

| Task | How |
| --- | --- |
| Try a change | Merge a pull request into `main`; it appears on https://test.mvmpatron.pl a few minutes later |
| Make it public | Check the test site, then **Actions > Publish to production > Run workflow** in GitHub |
| See what runs | `cd /opt/mvmpatron && docker compose ps` |
| Read logs | `docker compose logs --tail 100 web` (public), `web-test` (test) or `caddy` |
| Roll back | Click **Revert** on the pull request in GitHub and merge the revert, check the test site, then publish |
| Change the Gemini key | Edit `.env`, then `docker compose up -d` |
