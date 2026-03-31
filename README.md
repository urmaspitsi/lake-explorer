# Lake Explorer

This project is configured to build as a static site for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The app uses `HashRouter` and Vite `base: "./"` so the generated `dist/` output works when hosted from a GitHub Pages repository subpath.

## GitHub Pages deployment

Push the repository to GitHub and enable Pages with the "GitHub Actions" source. The workflow in `.github/workflows/deploy.yml` will build and publish `dist/` automatically on pushes to `main`.
