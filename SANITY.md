# Sanity CMS (embedded Studio)

Edit case studies and the About IDE section at **`/studio`** without touching code.

**Project:** Portfolio · **ID:** `qczwyuw7` · **Dataset:** `production` · **Org:** ModGet Designs

---

## 1. Local setup

Copy [env.local.example](./env.local.example) to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=qczwyuw7
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

```bash
npm run dev
```

- Site: http://localhost:3000  
- Studio: http://localhost:3000/studio  

Sign in with a Sanity account that is a **member** of this project (wrong account → “Request access”).

---

## 2. CORS (required for Studio + browser API)

Sanity manage → **Portfolio** → **API** → **CORS origins**. Add each origin you use, **Allow credentials: Yes**:

| Origin | Notes |
|--------|--------|
| `http://localhost:3000` | Local dev |
| Production URL | Check **Vercel → Project modgetdesigns → Settings → Domains**. Examples: `https://portfolio-opal-six-66.vercel.app`, or `https://modgetdesigns.vercel.app` after domain is attached and deployed |

Update CORS whenever the production hostname changes.

---

## 3. Content types

| Type | Use |
|------|-----|
| **Case Study** | One document per portfolio project. **Slug** → site id (e.g. `shkula`, `nbioteck`, `grabem`). **Order** controls sort. **Category tag** references a **Category** document (manage under **Categories**, or “Create new” from the case study dropdown — e.g. Mobility). Older docs may still show a read-only legacy text category until a tag is picked. Image fields are **string paths** like `/projects/shkula-hero.png` (files in `public/projects/`). Optional **Behance embed URL** for modal. |
| **About IDE Tab** | Three tabs typical: `profile`, `stack`, `metrics` — `fileName`, `code`, `preview`, `order`. |

If no published documents (or fetch fails), the site uses **`src/lib/projects.ts`** and **`src/lib/ideDefaults.ts`**.

After schema changes (new fields/categories), redeploy Vercel so `/studio` and the site share the same code.

---

## 4. Production (Vercel)

1. **Settings → Environment Variables:** same `NEXT_PUBLIC_SANITY_*` as `.env.local`.
2. Redeploy after env or schema changes.
3. Revalidate: home data cached ~60s (`unstable_cache` in `src/lib/sanity.fetch.ts`).

---

## 5. Do not use (for this repo)

Sanity’s “create monorepo” CLI (`npm create sanity@latest` with separate `studio/` + `web/` folders) — this app embeds Studio in Next.js at `/studio` only.

More context for agents: [docs/AGENT-HANDOFF.md](./docs/AGENT-HANDOFF.md)
