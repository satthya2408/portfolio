# Satthya Jeevaa — Portfolio (Next.js)

Digital marketing portfolio built with **Next.js 15**, **React**, and **TypeScript**. Visual design, motion, hero 3D (Three.js), and campaign chart match the previous static site.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Static production build (used on Render):

```bash
npm run build
```

Output is in **`out/`**. Preview locally:

```bash
npx serve out
```

## Deploy on Render (Static Site)

1. Push this repo to GitHub (repo root = folder with `package.json`).
2. Render → **New** → **Static Site** → connect the repo.
3. Settings:

| Field | Value |
|--------|--------|
| **Root Directory** | blank, or `portfolio` if the app is in a subfolder |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `out` |

4. **Environment** → add `NODE_VERSION` = `20` (optional but recommended).
5. Deploy. Your site is served from the `out` folder.

Or use the included **`render.yaml`**: **New** → **Blueprint** → select the repo (Render reads build command and `staticPublishPath: ./out`).

**Note:** `npm start` / Node Web Service is not used — the app is fully static (`output: "export"` in `next.config.ts`).

## Edit content

Update copy and project data in **`data/portfolio.ts`** (same fields as the old `config.js`).

## Assets

Images and GIFs live under **`public/assets/`** (`images/`, `gifs/`, `videos/`).

## Project layout

| Path | Purpose |
|------|---------|
| `app/` | Next.js layout, global CSS, route entry |
| `components/Portfolio.tsx` | Composes all page sections |
| `components/SiteHeader.tsx`, `SiteFooter.tsx`, `ProjectPanel.tsx` | Chrome and project drawer |
| `hooks/` | Client runtime (3D, chart, motion) and panel state |
| `data/portfolio.ts` | All copy and project data — edit here |
| `lib/` | Canvas/Three.js/motion engines + small helpers |
| `legacy/static-site/` | Previous plain HTML/JS version (reference only) |

## Performance notes

- Production build is static HTML with a client bundle (~130 KB for the page, mostly Three.js).
- Hero 3D and chart clean up listeners/WebGL on unmount.
- Images use native `<img>` tags (same as the original site) for identical layout and GIF/video behavior.
- Further optimization (optional later): split Three.js with `next/dynamic`, or server-render static sections as RSC with smaller client islands.
