# MVM Patron website

Marketing site for MVM Patron, a tyre and wheel service in Pisarzowice. Site text is in Polish;
code, comments and commit messages are in English.

## Stack
- React 19 + TypeScript, built with Vite 6 into `dist/`; Tailwind CSS 3 compiled at build time
- Node 22 + Express in `server/server.js`: serves `dist/` and the AI chat endpoint `POST /api/chat`,
  which calls Gemini with the server-side `GEMINI_API_KEY`
- One Docker image (`Dockerfile`), listens on port 8080, health check at `/healthz`
- Production: OVH VPS running `compose.yaml` (the app plus Caddy for HTTPS, config in `Caddyfile`).
  Setup and operations: `docs/server-setup.md`

## Commands
- Install: `npm ci` and `npm ci --prefix server`
- Dev server (frontend only, no chat): `npm run dev` → http://localhost:3000
- Type-check and build: `npm run build`
- Run the built site with the server: `npm run build && cp -r dist server/ && GEMINI_API_KEY=... node server/server.js` → http://localhost:8080
- Full production stack locally: `cp .env.example .env`, set `DOMAIN=localhost`, then `docker compose up --build` → https://localhost

## Conventions
- Components live in `components/`, one per file, styled with Tailwind classes
- Images go in `public/images/` and are referenced as `/images/<file>`
- Never put API keys in frontend code or the repo; secrets live in `.env` on the server
- Work on a branch and open a pull request; `npm run build` must pass (CI checks it)
- Merging to `main` deploys to production automatically via `.github/workflows/deploy.yml`
