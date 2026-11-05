# Project pipeline — status

High-level roadmap for the Product Architect portfolio. **Implemented** items reflect the codebase as of the last doc update; verify in Git if unsure.

## Infrastructure — done

- [x] Next.js App Router + TypeScript
- [x] Tailwind v4 + semantic CSS variables (light/dark via `data-theme`)
- [x] Lenis smooth scroll (desktop) + GSAP ScrollTrigger
- [x] Custom cursor, theme toggle, easter eggs
- [x] Sanity CMS embedded at `/studio`
- [x] Vercel deploy + env-based Sanity fetch with code fallbacks

## Visual experience — largely done

- [x] Hero (“system boot” style)
- [x] Case studies: two-column layout, sticky hero (desktop), metrics, challenge/solution grid
- [x] Behance embed modal (selected projects)
- [x] Category pills on hero image (top-right)
- [x] Light mode polish (sections, mesh/grid)
- [x] Case study width aligned with IDE section (`max-w-7xl`, section-level `md:px-12`)
- [x] Homepage pagination: 4 case studies, then +2 per “View more”
- [x] Category + tech stack filter pills (tags scoped to selected categories)
- [ ] Optional: wireframe → final scroll narrative per project (data exists; UI not fully used)
- [ ] Optional: stronger “canvas → IDE” transition between sections

## Technical depth — partial

- [x] About: IDE section with scroll-pinned tabs (profile / stack / metrics)
- [x] CMS-editable IDE tab content
- [ ] Skills terminal (beyond decorative fake terminal output)
- [ ] Contact: advanced CTA effects (“glass shatter” etc.)

## Optimization & launch — ongoing

- [x] Responsive layout (mobile/tablet/desktop breakpoints)
- [ ] Lighthouse / Core Web Vitals pass documented
- [ ] Custom domain on Vercel (owner may use `modgetdesigns` naming)
- [ ] Optional: protect `/studio` in production (middleware / Sanity roles)

## Content (owner / CMS)

- [x] Sanity project `qczwyuw7`, categories managed in Studio as `category` documents
- [ ] All portfolio projects migrated to Sanity (fallback `projects.ts` still used when CMS empty or partial)
- [ ] Asset naming convention under `public/projects/` (hero, wireframe, final per slug)

## Graphic design portfolio — planned

- [ ] Add graphic design works alongside the product/UX case studies (likely a new Sanity type next to `caseStudy`)
- [ ] Post-hero portfolio chooser: when visitors scroll off the hero, an animated prompt with micro-interactions asks which portfolio they want to explore
- [ ] Each choice leads into its own “world” (distinct look and flow for UX case studies vs graphic design)
- Note: anything conditionally rendered next to the pinned IDE section needs an always-mounted wrapper (GSAP pin-spacer breaks React sibling insertion)

## Removed / rejected

- [x] Scroll “chew” animation — removed per owner request; do not re-add without explicit spec
