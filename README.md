# berkm125.github.io

Personal site for Berkan Mertan, built as a small Windows desktop simulation with
a OneNote-style notebook ("Berkan @ UW") as the app window.

Vanilla TypeScript + Vite, no framework. Everything is self-contained — logos and
photos are served from `public/`, and the key-clack sound is synthesized at
runtime with the Web Audio API rather than shipped as an audio file.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000, opens automatically
```

Other scripts:

```bash
npm run build    # type-check + production bundle into dist/
npm run preview  # serve the built bundle locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. Requires **Settings → Pages → Source =
GitHub Actions** on the repo (one-time).

## Layout

| Path                  | What's in it                                              |
| --------------------- | --------------------------------------------------------- |
| `src/main.ts`         | Window chrome, drag/resize, nav, theming, typewriter, audio |
| `src/content.ts`      | All page copy and links — edit here to change the site      |
| `src/style.css`       | Everything visual, including the compact/phone layout       |
| `public/images/`      | Photos, plus `logos/` for organization marks                |

To edit page text, touch only `src/content.ts`. To add or reorder pages in the
sidebar, edit the `PAGES` array at the top of `src/main.ts` and add a matching
entry to `CONTENT`.

## Notes

- The site adapts to phones: the window fills the screen, the notebook page list
  becomes a slide-in drawer, and two-column pages collapse to one column.
- Font, color palette, and light/dark choices persist via `localStorage`.
- The About page typing animation waits for a click or tap, which is also what
  unlocks the audio context in browsers that block autoplay.
