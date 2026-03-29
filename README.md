# My Portfolio

Static portfolio site for GitHub Pages.

## Structure

- `index.html`: page structure
- `project.html`: project case study page
- `experience.html`: experience timeline page
- `contact.html`: contact page
- `styles.css`: site styling
- `project-styles.css`: project detail page styling
- `experience-styles.css`: experience page styling
- `contact-styles.css`: contact page styling
- `script.js`: loads local JSON and renders the front page
- `project-script.js`: loads local JSON and renders the project detail page
- `experience-script.js`: loads local JSON and renders the experience page
- `contact-script.js`: loads local JSON and renders the contact page
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
