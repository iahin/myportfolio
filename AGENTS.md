# AGENTS.md

## Purpose

This repository is a static portfolio site for **Isfaque Tuhin** hosted on **GitHub Pages**.

This file is the canonical instruction source for coding agents working in this repo. It captures the project's architecture, editing rules, content model, style expectations, and maintenance constraints.

## How AGENTS.md Works

- `AGENTS.md` is a vendor-neutral Markdown instruction file for coding agents.
- Place it at the repository root for repo-wide guidance.
- Additional nested `AGENTS.md` files can be added later for directory-specific overrides.
- When multiple files exist, the closest relevant `AGENTS.md` should take precedence over broader parent guidance.
- User instructions still override this file.

## Project Constraints

- Static site only. No framework migration.
- No external runtime tools or external UI libraries.
- No Tailwind, no CDN-delivered JS, no Google Fonts requests at runtime.
- Content must be local and editable through JSON where practical.
- Images and fonts must come from local files under `assets/`.
- GitHub Pages compatibility is required.
- CSS must stay in a single file: `styles.css`.
- JavaScript should stay modular by section/page.

## Commands

- Run locally: `py -m http.server 8000`
- Alternate local server: `python -m http.server 8000`
- Open locally: `http://localhost:8000`

There is no build step for normal development.

## Architecture

- `index.html`
  Main single-page portfolio.

- `project.html`
  Detail/profile page linked from the portfolio cards.

- `styles.css`
  Shared stylesheet for the whole site. Keep all CSS here.

- `data/site.json`
  Canonical mutable content source. Prefer storing editable copy here rather than hardcoding it in HTML or JS.

- `scripts/home/index.js`
  Homepage entry point.

- `scripts/home/navigation.js`
  Homepage navigation rendering and active-section behavior.

- `scripts/home/hero.js`
  Hero section renderer.

- `scripts/home/projects.js`
  Portfolio/capabilities section renderer.

- `scripts/home/skills.js`
  Skills section renderer.

- `scripts/home/experience.js`
  Experience timeline and final contact CTA renderer.

- `scripts/home/research.js`
  Research/publications section renderer.

- `scripts/pages/project.js`
  Detail page renderer.

- `scripts/shared/site-data.js`
  JSON loading helper.

- `scripts/shared/dom.js`
  Shared DOM helpers.

## Current Homepage Order

1. Hero
2. Portfolio
3. Skills
4. Experience
5. Research Published
6. Contact

If a new section is added, update:

- `index.html`
- `scripts/home/index.js`
- `styles.css`
- `data/site.json`
- `scripts/home/navigation.js` if the section needs navbar navigation

## Content Model Rules

- Mutable portfolio content belongs in `data/site.json`.
- Prefer data-driven labels for user-facing portfolio copy.
- Avoid hardcoding profile-specific text in templates or renderers.
- Generic system strings like loading/error messages can remain in code if needed, but portfolio-facing content should come from JSON.
- Contact links, social links, headings, summaries, skills, experience summaries, and research items should remain data-driven.

## Design Direction

Use the existing theme, but keep it restrained and editorial:

- cool, professional palette
- minimal and deliberate, not flashy
- soft tonal surfaces instead of hard dividers
- strong typography hierarchy
- compact layouts with reduced dead space
- responsive behavior across widescreen, tablet, and mobile

Do not:

- introduce neon, gamer, or terminal-hacker aesthetics
- reintroduce Tailwind or design-system boilerplate
- add heavy shadows or busy ornamentation
- add rounded floating footer cards where the page should feel grounded

## UI Rules

- Homepage navbar is a transparent immersive overlay with only the menu cluster visibly frosted.
- Homepage nav links should jump to homepage sections and highlight correctly on click and scroll.
- `project.html` should not use the full homepage navbar.
- `project.html` uses a simple back button to return to the homepage.
- Contact actions in the final CTA should remain compact: email button plus social icons.

## Styling Rules

- Keep CSS in `styles.css` only.
- Reuse the existing visual language before adding new patterns.
- Prefer tone, spacing, and typography changes over adding decorative elements.
- New sections should feel consistent with the existing homepage, but can use a slightly different minimal aesthetic.

## Responsive Rules

- The site must remain functional on mobile.
- Navbar must stay visible and usable on smaller screens.
- Homepage hero should stay compact and avoid pushing critical content too far below the fold.
- Timeline should still read as a timeline on mobile, not just as disconnected cards.
- Project/capability cards should maintain strong readability across breakpoints.

## Resume/Brand Voice

The portfolio should sound like Isfaque speaking directly to employers and collaborators:

- confident, grounded, practical
- employer-facing, not generic resume dump
- AI-aware, but never overstated
- technical claims should reflect actual experience only
- emphasize production delivery, reliability, and solving operational problems

Avoid:

- hype-heavy AI language
- vague innovation language
- generic “passionate engineer” phrasing
- claiming depth in tools or domains not supported by the resume

## AI Positioning Rules

- Keep AI references current enough to feel relevant.
- Only emphasize AI where the resume clearly supports it.
- Frame AI as applied delivery experience, not as marketing hype.
- Prefer phrases like:
  - applied AI
  - AI-enabled workflows
  - production RAG platform
  - pragmatic AI integration

Avoid inflating AI claims beyond documented work.

## Maintenance Rules

- Preserve the current JSON schema unless there is a clear reason to simplify or extend it.
- If moving content from code to JSON, remove the old hardcoded usage so there is one source of truth.
- Remove dead data blocks when they are no longer rendered.
- Remove dead template blocks when they are no longer used.
- Before deleting a renderer or data block, verify it is not referenced by the active page flow.

## Ask First

Ask before:

- adding new dependencies
- changing the hosting model
- replacing the static structure with a framework
- changing the overall visual direction substantially
- deleting large sections of resume-driven content
- introducing analytics, forms backends, or external services

## Never Do

- do not add external UI frameworks or CSS frameworks
- do not hardcode mutable portfolio content when it belongs in JSON
- do not add remote font or asset dependencies
- do not break GitHub Pages compatibility
- do not replace `styles.css` with multiple CSS files unless explicitly requested

## Verification

After meaningful UI/content changes:

1. Run a local HTTP server.
2. Check `index.html`.
3. Check `project.html`.
4. Verify navbar anchors on the homepage.
5. Verify mobile layout for hero, timeline, and contact CTA.

## Notes For Future Agents

- Some older renderer files still exist under `scripts/home/` from earlier iterations. Prefer the entry points currently used by `scripts/home/index.js`.
- Keep content edits in `data/site.json` whenever possible.
- If a section feels too verbose, reduce copy before adding more UI.
