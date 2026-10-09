# OVH VPS setup

How to go from no server to mvmpatron.pl running on an OVH VPS. Cloud Run keeps serving the
site until step 7, so nothing visitors see changes before then.

## 1. Before ordering: create an SSH key on your computer

Skip this if you already have `~/.ssh/id_ed25519.pub`.

```sh
ssh-keygen -t ed25519 -C "adam@mvmpatron"
cat ~/.ssh/id_ed25519.pub   # you paste this into the OVH order form
```

## 2. Order the VPS

In the OVHcloud Control Panel, order a VPS with:

- **Plan:** the smallest current tier is enough (the site uses about 100 MB of RAM).
- **Image:** Ubuntu 24.04 (plain OS, no preinstalled apps).
- **Location:** the data centre closest to Poland that is offered (Warsaw if available, otherwise Frankfurt, Strasbourg or Gravelines).
- **SSH key:** paste the public key from step 1.
- **Backups:** the automated backup option is worth enabling; the site itself has no data, but it saves redoing this setup.

Note the VPS IPv4 (and IPv6, if shown) from the confirmation email. OVH Ubuntu images log in as `ubuntu`.

## 3. Secure the server and install Docker

```sh
ssh ubuntu@<VPS_IP>
```

Then run, as `ubuntu`:

```sh
set -e
sudo apt-get update && sudo apt-get -y upgrade
sudo apt-get install -y ufw fail2ban unattended-upgrades

# SSH: keys only, no root login
printf 'PasswordAuthentication no\nPermitRootLogin no\n' | sudo tee /etc/ssh/sshd_config.d/90-hardening.conf
sudo systemctl reload ssh

# Firewall: SSH, HTTP, HTTPS only
sudo ufw allow OpenSSH && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 443/udp
sudo ufw --force enable

# Automatic security updates
sudo dpkg-reconfigure -f noninteractive unattended-upgrades

# Docker Engine + Compose plugin (official repository)
curl -fsSL https://get.docker.com | sudo sh

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
3. When it finishes, open https://test.mvmpatron.pl and check the logo, the services, the map, the cookie banner and the AI chat, on a computer and a phone.

## 7. Move mvmpatron.pl to the VPS

1. The day before: in the DNS zone, lower the TTL of the `A`/`AAAA` records for `mvmpatron.pl` and `www` to 300 seconds. Write down their current values; they are your rollback.
2. On the VPS, set `DOMAIN=mvmpatron.pl` in `/opt/mvmpatron/.env`, then `cd /opt/mvmpatron && docker compose up -d`.
3. In the DNS zone, point `mvmpatron.pl` and `www` (`A` records, plus `AAAA` if the VPS has IPv6) at the VPS. Delete any other `A`/`AAAA` records for those names that point at Google.
4. **Do not touch the `MX`, `TXT`, `SPF` or `DKIM` records:** they carry email for `mvm@mvmpatron.pl`.
5. Within a few minutes, https://mvmpatron.pl loads from the VPS and Caddy has its certificate. Check it as in step 6.

Rollback: put the old `A`/`AAAA` values back. Cloud Run is still running.

## 8. Retire Cloud Run (after about two weeks)

In the Google Cloud console: remove the domain mapping for mvmpatron.pl, delete the Cloud Run
service, delete the `gemini_api_key` secret and the images in Artifact Registry. Raise the DNS
TTL back to 3600 and delete the `test` record.

## Day to day

| Task | How |
| --- | --- |
| Deploy a change | Merge a pull request into `main`; GitHub Actions deploys it |
| See what runs | `cd /opt/mvmpatron && docker compose ps` |
| Read logs | `docker compose logs --tail 100 web` (or `caddy`) |
| Roll back | Click **Revert** on the pull request in GitHub and merge the revert; it deploys the previous version |
| Change the Gemini key | Edit `.env`, then `docker compose up -d` |
