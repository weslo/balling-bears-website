# Balling Bears Website

Website for the Balling Bears World of Warcraft raiding guild on Mal'Ganis.

The project uses TypeScript, React, Vite, Google Fonts, and Font Awesome Free. Shared project guidance for AI-assisted work lives in `AGENTS.md`.

Landing visuals currently use bundled image assets in `src/assets/`, including the page background and the internal bear claw watermark.
The rotating landing subtitle phrases are configured in `src/App.tsx`.
The subtitle timing and transition phases are also configured in `src/App.tsx` and `src/styles.css`.

The landing frame itself is now a responsive CSS card, so it can grow with the content on mobile instead of depending on a fixed frame image.

## Local Development

Install dependencies:

```bash
npm install
```

Start the Vite dev server with hot reloading:

```bash
npm run dev
```

Iterate on the site by editing files in `src/`. Vite will reload changes automatically while the dev server is running.

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

GitHub Pages deployment is handled by GitHub Actions on every push to `main`.

The workflow builds the site in CI and deploys the generated `dist/` output, so `dist/` should not be committed.

In GitHub, go to `Settings -> Pages -> Build and deployment -> Source` and set the source to `GitHub Actions`.

The production build is configured to deploy from the domain root (`/`), which is the correct setup for the custom bare domain.

In GitHub, go to `Settings -> Pages -> Custom domain`, enter the bare domain, and let GitHub provision the Pages mapping.

At your DNS provider, point the apex domain (`@`) at GitHub Pages with either:

- `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- Or an `ALIAS`/`ANAME` record to `weslo.github.io` if your DNS provider supports it

Add `www` as a `CNAME` pointing to `weslo.github.io` so GitHub Pages can redirect `www` to the bare domain.

Remove any conflicting `@` or `www` records, avoid wildcard DNS records for the site, and enable `Enforce HTTPS` in GitHub Pages after DNS finishes propagating.

For additional account security, verify the custom domain in GitHub so only this account can use it for Pages.

If you ever move the site back to the default GitHub Pages project URL instead of the custom domain, update the Vite `base` path in `vite.config.ts` to match that subpath.
