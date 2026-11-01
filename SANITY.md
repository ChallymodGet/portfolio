# Sanity CMS (embedded Studio)

Edit case studies and the About IDE section at **`/studio`** without touching code.

## 1. Connect your Sanity project

You already have a Sanity account. In [sanity.io/manage](https://www.sanity.io/manage):

1. Open your project (or create one).
2. Copy **Project ID**.
3. Create `.env.local` in the repo root (see `.env.example`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. **CORS origins** (Project → API → CORS origins): add  
   `http://localhost:3000` and your Vercel URL (e.g. `https://portfolio-opal-six-66.vercel.app`).

## 2. Run Studio locally

```bash
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio), sign in with the same Sanity account, and create documents.

## 3. Content types

| Type | Use |
|------|-----|
| **Case Study** | One per portfolio project (slug = site id, e.g. `shkula`). Match categories: EdTech, HealthTech, FinTech, Enterprise, Delivery. Image fields are **paths** like `/projects/shkula/hero.png` (files stay in `public/`). |
| **About IDE Tab** | Three tabs: `profile`, `stack`, `metrics` — code + preview text for the IDE section. |

Until Sanity has published documents, the site uses the built-in fallbacks in `src/lib/projects.ts` and `src/lib/ideDefaults.ts`.

## 4. Production (Vercel)

Add the same `NEXT_PUBLIC_*` variables in Vercel → Project → Settings → Environment Variables, then redeploy.

Optional: restrict who can use `/studio` in production with [Sanity’s access controls](https://www.sanity.io/docs/studio/deployment) or Vercel middleware later.
