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

## GitHub repository settings

In the GitHub repository UI:

1. Open `Settings`.
2. Open `Pages` in the left sidebar.
3. Set `Source` to `GitHub Actions`.
4. Make sure your default deployment branch is `main`, or update `.github/workflows/deploy.yml` if you deploy from a different branch.
5. Push your changes to GitHub.
6. Open the `Actions` tab and confirm the `Deploy to GitHub Pages` workflow completes successfully.
7. After the first successful deploy, GitHub will show the public Pages URL in `Settings -> Pages`.
