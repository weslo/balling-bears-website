# Balling Bears Website

Website for the Balling Bears World of Warcraft raiding guild on Mal'Ganis.

The project uses TypeScript, React, Vite, Google Fonts, and Font Awesome Free. Shared project guidance for AI-assisted work lives in `AGENTS.md`.

Landing visuals currently use bundled image assets in `src/assets/`, including the frame and page background.
The rotating landing subtitle phrases are configured in `src/App.tsx`.

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

If the repository name changes, update the Vite `base` path in `vite.config.ts` to match the new Pages URL path.
