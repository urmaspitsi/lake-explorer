# Lake Explorer

`lake-explorer` is a static React site about notable lakes around the world. It combines curated lake data, large visual cards, and an interactive world map to present geographic, ecological, and historical information in a browsable format.

The current experience is content-first and dataset-driven: most of the app is rendered from TypeScript data files that describe lakes by continent, supported by local image assets and an additional section dedicated to ancient lakes.

## What The Project Includes

- A landing page with a full-screen hero section and continent jump links
- An interactive world map with clickable lake markers
- Continent sections that group lakes into browsable cards
- Expandable lake detail cards with quick stats, ecology, access notes, and external links
- A dedicated ancient lakes section with background context, sources, and lake-specific details
- Static deployment support for GitHub Pages

## Main Components

- `src/pages/Index.tsx`: assembles the full homepage in display order
- `src/components/HeroSection.tsx`: renders the opening hero and continent navigation anchors
- `src/components/WorldMap.tsx`: displays the global map, continent color legend, and lake popup details
- `src/components/ContinentSection.tsx`: renders one section per continent using the shared lake card layout
- `src/components/LakeCard.tsx`: expandable card for each lake with summary stats and deeper metadata
- `src/components/AncientLakesSection.tsx`: renders the ancient-lakes explainer, citations, and dedicated cards
- `src/components/SiteFooter.tsx`: footer content for the site

## Data And Content Structure

- `src/data/lakes.ts`: primary dataset for continent-based lakes, including coordinates, dimensions, water quality, fauna, flora, access, and reference links
- `src/data/ancientLakes.ts`: separate dataset and explanatory content for ancient lakes
- `src/assets/lakes/`: local image library used throughout the cards and map popups

Because the site is driven from static data modules, adding or updating content is mostly a matter of editing the lake objects and image references rather than changing page logic.

## Tech Stack

- React 18 + TypeScript
- Vite for development and production builds
- Tailwind CSS for styling
- Framer Motion for animated transitions
- `react-simple-maps` for the interactive world map
- `react-router-dom` with `HashRouter` for static hosting compatibility
- shadcn/ui-style component primitives in `src/components/ui`

## Project Structure

```text
src/
  assets/lakes/        Local lake imagery
  components/          Main UI sections and shared presentation components
  components/ui/       Reusable UI primitives
  data/                Static datasets for lakes and ancient lakes
  pages/               Route-level pages
  test/                Vitest setup and example test
```

## Local Development

```bash
npm install
npm run dev
```

The local dev server runs on `http://localhost:5173`.

## Local Production Preview

```bash
npm run build
npm run preview
```

Vite will print a localhost preview URL in the terminal.

## Production Build

```bash
npm run build
```

The app uses `HashRouter` and Vite `base: "./"` so the generated `dist/` output works when hosted from a GitHub Pages repository subpath.

## GitHub Pages Deployment

Push the repository to GitHub and enable Pages with the `GitHub Actions` source. The workflow in `.github/workflows/deploy.yml` will build and publish `dist/` automatically on pushes to `main`.

## GitHub Repository Settings

1. Open `Settings`.
2. Open `Pages` in the left sidebar.
3. Set `Source` to `GitHub Actions`.
4. Make sure your default deployment branch is `main`, or update `.github/workflows/deploy.yml` if you deploy from a different branch.
5. Push your changes to GitHub.
6. Open the `Actions` tab and confirm the `Deploy to GitHub Pages` workflow completes successfully.
7. After the first successful deploy, GitHub will show the public Pages URL in `Settings -> Pages`.
