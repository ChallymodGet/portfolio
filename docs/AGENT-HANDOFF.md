# Agent handoff — portfolio repo

Use this file when continuing work in a new chat or with another AI. Prefer reading code over guessing; this doc is the map, not the source of truth.

---

## Owner & product intent

- **Owner:** Onofuevure Charles (ModGet Designs) — senior product designer portfolio.
- **Tone:** High-end, motion-rich, “product architect” — not a generic template.
- **Primary CTAs:** Calendly `https://calendly.com/modgetdesigns/30min`, email `modgetdesigns@gmail.com` (in IDE profile / about content).
- **CMS:** Owner edits case studies and about copy in **`/studio`**, not in Git, when possible.

---

## Environments & IDs

| Item | Value |
|------|--------|
| GitHub | `ChallymodGet/portfolio`, default branch **`main`** |
| Sanity org | ModGet Designs |
| Sanity project name | Portfolio |
| Sanity **project ID** | `qczwyuw7` |
| Sanity dataset | `production` |
| Vercel project name | `modgetdesigns` (renamed from `portfolio`) |
| Production URL | **Verify in Vercel → Domains.** Historically `https://portfolio-opal-six-66.vercel.app`. Renaming to `modgetdesigns.vercel.app` requires adding that domain under **Settings → Domains** and a production deploy; `DEPLOYMENT_NOT_FOUND` means domain not linked yet. |

**Secrets:** Never commit `.env.local`. Template: `env.local.example` → copy to `.env.local`.

---

## Architecture decisions (do not break casually)

### App Router split

- **`src/app/layout.tsx`** — minimal root (font, theme flash script, `globals.css` only).
- **`src/app/(site)/layout.tsx`** — portfolio chrome: `ThemeToggle`, `CustomCursor`, `EasterEggs`, `SmoothScroll` (Lenis).
- **`src/app/studio/`** — Sanity Studio only; no Lenis/cursor from site layout.

### Data loading (home)

- **`src/app/(site)/page.tsx`** — async server component; wraps CMS fetch in **`<Suspense>`** with fallback to `projects.ts` + `ideDefaults.ts`.
- **`src/lib/sanity.fetch.ts`** — uses **`unstable_cache`** + `next: { revalidate: 60 }` on GROQ fetches. Required for **Next 16** production build with `cacheComponents: true` in `next.config.ts`.
- If Sanity env vars are missing or fetch fails → **fallbacks** (site still builds and runs).

### Case studies UI

- **`CaseStudy.tsx`:** Two-column layout on `lg+`; hero image uses **`position: sticky`** (not GSAP pin — pin + Lenis caused scroll jank).
- **Do not** put `overflow-x: hidden` on `<main>` or ancestors of sticky columns — breaks sticky. Body uses `overflow-x: clip` in `globals.css`.
- **Width alignment with IDE block:** Section horizontal padding is on **`<section>`** (`px-3 sm:px-4 md:px-12`), inner content `max-w-7xl` **without** extra horizontal padding (matches `IDESection`).
- **Challenge/solution:** Responsive grid (`sm:2`, `xl:3` columns); all cards shown (no per-card “view more”).
- **Behance:** Optional `behanceEmbedUrl` on project → in-site modal (`BehanceEmbedModal.tsx`).

### Home case study pagination

- **`HomePage.tsx`:** Shows **4** case studies initially; **“View more case studies (+2)”** reveals 2 more per click until all CMS projects are visible. Button hidden when `projects.length ≤ 4`.

### Motion

- **Lenis** only on desktop (`min-width: 1024px`, fine pointer, no reduced motion). Calls `ScrollTrigger.update` on scroll — **no** `ScrollTrigger.scrollerProxy` (was reverted due to abnormal scroll).
- **IDESection:** Full-section ScrollTrigger **pin** + scrub for tab switching on desktop only.

### Themes

- `data-theme="light" | "dark"` on `<html>`; tokens in `src/app/globals.css`. Green pill text contrast differs by theme.

---

## Sanity

- Config: `sanity.config.ts`, schemas in `sanity/schemaTypes/`.
- Studio route: `/studio` → `src/app/studio/[[...tool]]/page.tsx` (`NextStudio`).
- **Case study slug** (`slug.current`) becomes site `id` — keep stable (e.g. `shkula`, `nbioteck`).
- **Categories** must exist in schema, `Project` type, and `validCategories` in `sanity.fetch.ts` or documents are dropped on fetch.
- **Images:** String paths to `public/projects/*` unless you implement Sanity assets.
- **Studio access:** User must be a **member** of Sanity project; wrong Google/GitHub account → “Request access”.
- **CORS:** `localhost:3000` + every production origin you use, credentials enabled.

Full steps: [../SANITY.md](../SANITY.md)

---

## Next.js 16 specifics

- **`AGENTS.md`** contains the “This is NOT the Next.js you know” block — read `node_modules/next/dist/docs/` before relying on training data.
- **`experimental.agentUpgrade: "security"`** in `next.config.ts`.
- **`cacheComponents: true`**, **`partialPrefetching: true`** — home route must not do uncached fetches outside Suspense/cache.

---

## Git workflow (owner rules)

- Commit only when asked.
- **Never** `Co-authored-by: Cursor` or similar in commit messages.
- Use: `git -c core.hooksPath=githooks commit -m "..."`
- Do not force-push `main` unless explicitly requested.
- History was rewritten once to strip co-author trailers; keep messages clean going forward.

---

## Common tasks

| Task | Where to look |
|------|----------------|
| Add case study (code fallback) | `src/lib/projects.ts`, assets in `public/projects/` |
| Add CMS field | `sanity/schemaTypes/caseStudy.ts`, GROQ in `sanity.queries.ts`, map in `sanity.fetch.ts`, `src/types/project.ts` |
| Change hero / footer | `HomePage.tsx`, `Hero.tsx` |
| Change about IDE | `IDESection.tsx`, Sanity `ideTab`, `ideDefaults.ts` |
| Fix deploy prerender error | `sanity.fetch.ts` cache, `(site)/page.tsx` Suspense |
| Fix sticky image | overflow on ancestors, Lenis; avoid GSAP pin on case studies |
| New category pill | schema + `Project` type + `validCategories` set |

---

## Verify before PR / push

```bash
npm run type-check
npm run build
```

Manual: scroll full page on desktop (Lenis + IDE pin + case study sticky), `/studio` login, light/dark toggle.

---

## Known incomplete / roadmap

See [../PIPELINE.md](../PIPELINE.md). Several checklist items are outdated (case studies and IDE exist); update PIPELINE when shipping major features.

---

## Files often confused

| Wrong assumption | Reality |
|------------------|---------|
| `src/app/page.tsx` | Removed; home is `src/app/(site)/page.tsx` |
| Separate Sanity studio repo | Embedded in this Next app only |
| `npm create sanity` monorepo | Not used; ignore Sanity wizard CLI for this repo |
