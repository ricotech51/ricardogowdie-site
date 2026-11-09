# ricardogowdie.com

A fully static site built with Astro, TypeScript, and Tailwind CSS. There is no server, database, or login.

## First-time setup

1. Install Node.js 22 (LTS) from https://nodejs.org.
2. Open this folder in Visual Studio Code.
3. Open the terminal (View, then Terminal) and run `npm ci`. This installs the exact versions in `package-lock.json`.
4. Run `npm run dev` and open http://localhost:4321.

## Where your content lives

| What | Where |
| --- | --- |
| Name, headline, credentials, tools, awards, links | `src/content/site.json` |
| Case studies | `src/content/projects/*.md` |
| Experience | `src/content/experience/*.md` |
| Blog articles | `src/content/articles/*.md` |
| About page text | `src/content/pages/about.md` |
| Images | `src/assets/` |
| Resume PDF (public version only) | `public/Ricardo_J_Gowdie_Resume.pdf` |

## Adding a case study, experience entry, or article

1. Copy the matching file from `templates/` into its folder under `src/content/`.
2. Rename it with lowercase words and dashes, for example `firewall-refresh.md`.
3. Fill in the fields. Leave `draft: true` while you're working on it.
4. Run `npm run build`. If a field is missing or misspelled, the build stops and names the file and field.
5. When it's ready, change `draft: true` to `draft: false`.

Items with `draft: true` never appear on the built site. Files whose names start with `_` are ignored.

## Dependencies (and why each one is here)

| Package | Why |
| --- | --- |
| `astro` | Builds the static site from your content files. |
| `tailwindcss`, `@tailwindcss/vite` | Styling with your palette, with no CSS framework shipped to visitors. |
| `@astrojs/sitemap` | Creates `sitemap-index.xml` for search engines. |
| `typescript`, `@astrojs/check` (dev only) | Catches mistakes in code and content before you publish. |

Fonts (Space Grotesk, IBM Plex Sans, IBM Plex Mono) are plain files in `public/fonts/`, so they aren't packages. Their licenses are in the same folder.

## Deploying and maintenance

- `docs/DEPLOY.md`: putting the site on GitHub and Cloudflare Pages, and moving your domain.
- `docs/MAINTENANCE.md`: everyday editing, updates, and the account-security checklist.

## Before you publish

- Run `npm run build`. It checks types and content, then builds the site into `dist/`.
- Run `npm run audit`. It reports known security issues in dependencies.
- Search for `[PLACEHOLDER]` and fill in or hide anything that still has one.

## Keeping dependencies safe

- Dependabot (`.github/dependabot.yml`) opens a pull request each week when updates are available.
- Before you merge an update, let the build run, open the preview, and check that the site looks right.
- Always commit `package-lock.json`. Use `npm ci` instead of `npm install` so you get the exact locked versions.
- Never put passwords, API keys, your phone number, or your home address in this folder.
