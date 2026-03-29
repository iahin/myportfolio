# My Portfolio

Static portfolio site for GitHub Pages.

## Structure

- `index.html`: page structure
- `project.html`: project case study page
- `styles.css`: shared styling for all pages
- `scripts/home/`: front page modules by section
- `scripts/pages/`: page entry scripts
- `scripts/shared/`: shared fetch and DOM helpers
- `data/site.json`: local content source
- `assets/images/`: local image assets
- `assets/fonts/`: optional local font files

## Editing content

Update [`data/site.json`](./data/site.json) to change:

- hero text
- contact email
- highlight cards
- featured projects
- image paths

## Local Fonts

To match the current design system exactly without external requests, place these files in `assets/fonts/`:

- `Inter-VariableFont_opsz,wght.woff2`
- `SpaceGrotesk-VariableFont_wght.woff2`
- `Manrope-VariableFont_wght.woff2`

## GitHub Pages

The repository already includes a static GitHub Pages workflow at [`.github/workflows/static.yml`](./.github/workflows/static.yml), and this scaffold works with it as-is.
