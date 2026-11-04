# Onofuevure Charles — Portfolio

Interactive product-design portfolio (Next.js App Router). Live site is deployed on **Vercel**; content is editable via **embedded Sanity Studio** at `/studio`.

**Repo:** [github.com/ChallymodGet/portfolio](https://github.com/ChallymodGet/portfolio)  
**Production (check Vercel for current URL):** `https://portfolio-opal-six-66.vercel.app` — Vercel project was renamed to **modgetdesigns**; confirm **Settings → Domains** for the active hostname.

**Contact / CTA:** [Calendly 30min](https://calendly.com/modgetdesigns/30min) · `modgetdesigns@gmail.com`

---

## Stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js **16.4.x** (App Router, Turbopack dev/build) |
| UI | React, Tailwind CSS **v4** (`@import "tailwindcss"` in `src/app/globals.css`) |
| Motion | GSAP + ScrollTrigger, Lenis smooth scroll (desktop), Framer Motion |
| CMS | Sanity v6, embedded Studio (`next-sanity`) |
| Hosting | Vercel (team: ModGet Designs) |

Read **`docs/AGENT-HANDOFF.md`** before making non-trivial changes — architecture, pitfalls, and owner preferences are documented there.

---

## Quick start

```bash
npm install
cp env.local.example .env.local   # fill Sanity project ID (see SANITY.md)
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)  
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

```bash
npm run build      # must pass before deploy
npm run type-check
npm run lint
```

---

## Project layout (high level)

```
src/app/
  layout.tsx              # Root html/body, theme script, globals.css
  (site)/                 # Public portfolio (Hero, case studies, footer chrome)
    layout.tsx            # ThemeToggle, Lenis, cursor, easter eggs
    page.tsx              # Server: fetch CMS → HomePage (Suspense + fallbacks)
  studio/[[...tool]]/     # Embedded Sanity Studio (no site chrome)

src/components/
  HomePage.tsx            # Client home shell; case study pagination (4 +2)
  canvas/                 # Hero, CaseStudy, BehanceEmbedModal
  ide/IDESection.tsx        # Scroll-pinned IDE “about” block (desktop)
  animations/             # SmoothScroll, ThemeToggle, CustomCursor, EasterEggs

sanity/                   # Schemas, structure, env helpers
sanity.config.ts          # Studio config (basePath /studio)

src/lib/
  projects.ts             # Fallback case studies (no CMS / empty dataset)
  ideDefaults.ts            # Fallback IDE tabs
  sanity.*                  # Client, GROQ, cached fetch + fallbacks
```

---

## Content

- **Case studies:** Sanity type `caseStudy` or fallbacks in `src/lib/projects.ts`. Images are **paths under `public/`** (e.g. `/projects/shkula-hero.png`), not Sanity assets, unless you change that.
- **About IDE:** Sanity type `ideTab` or `src/lib/ideDefaults.ts`.
- **Categories:** managed in Studio as `category` documents (see `sanity/schemaTypes/category.ts`); add new ones without code changes.

Details: **[SANITY.md](./SANITY.md)**

---

## Deploy (Vercel)

1. Connect repo `ChallymodGet/portfolio`, branch `main`.
2. Set env vars (same as `.env.local`):  
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`.
3. After deploy, add production URL to **Sanity → API → CORS** (credentials enabled).
4. **Next.js 16:** Home uses `unstable_cache` + `<Suspense>` so production build can prerender with Cache Components enabled (`next.config.ts`).

---

## Git / commits

- **Do not** add `Co-authored-by` trailers (see `.cursor/rules/git-commits-no-coauthors.mdc`).
- Optional hook: `git -c core.hooksPath=githooks commit -m "message"`.

---

## Docs index

| File | Purpose |
|------|---------|
| [docs/AGENT-HANDOFF.md](./docs/AGENT-HANDOFF.md) | Continuation guide for humans and AI agents |
| [SANITY.md](./SANITY.md) | CMS setup, schemas, CORS |
| [PIPELINE.md](./PIPELINE.md) | Product roadmap vs implemented state |
| [AGENTS.md](./AGENTS.md) | Next.js version notes (auto-maintained by `next dev`) |
| [env.local.example](./env.local.example) | Env template (copy to `.env.local`) |
