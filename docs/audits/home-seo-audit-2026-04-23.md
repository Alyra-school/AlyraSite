# Audit SEO Homepage - 2026-04-23

## Scope & Method
- Target: `http://localhost:4173/` (build production locale)
- Focus: SEO technique + Core Web Vitals + accessibilite + images/alts
- Runs: Lighthouse x3 desktop + x3 mobile (Chrome for Testing 148)
- Supporting checks: metadata/robots/sitemap review, semantic DOM review, alt inventory, aria review

## Scorecard (Lighthouse)

### Desktop (3 runs)
- Performance: avg **98** (min 96 / max 100)
- Accessibility: avg **96** (min 96 / max 96)
- Best Practices: avg **100**
- SEO: avg **100**
- LCP: avg **0.98s** (max 1.13s)
- CLS: avg **0.014**
- FCP: avg **0.72s**
- TBT: avg **0ms**

### Mobile (3 runs)
- Performance: avg **89.3** (min 86 / max 91)
- Accessibility: avg **100**
- Best Practices: avg **100**
- SEO: avg **100**
- LCP: avg **3.49s** (max 3.66s)
- CLS: avg **0.0345**
- FCP: avg **2.03s** (max 2.66s)
- TBT: avg **2ms** (max 6ms)

## Structured Findings (prioritized)

| id | category | severity | evidence | impact | fix | effort | priority |
|---|---|---:|---|---|---|---|---|
| A11Y-001 | a11y | Critical | Lighthouse `aria-hidden-focus=0`: `div.hero-orbit[aria-hidden="true"]` contains focusable `a.orbit-pill` links | Violates accessibility tree expectations, can confuse SR users and lower trust signals | Remove `aria-hidden="true"` from interactive orbit OR make orbit pills non-focusable (`tabindex=-1`) and non-interactive when hidden | S | P0 |
| A11Y-002 | a11y | Critical | Lighthouse `aria-allowed-role=0`: `article.alyra-member-card role="listitem"` flagged on 19 elements | Invalid ARIA role usage; reduces semantic reliability and a11y score | Use native list markup (`ul/li`) OR remove role attrs on `article` and rely on semantic containers | S | P0 |
| PERF-001 | perf | High | Mobile LCP avg 3.49s; Lighthouse `largest-contentful-paint` score low (0.59 run 1) | Fails CWV mobile target (<=2.5s), impacts SEO ranking and conversion | Identify LCP node and preload/priority it; reduce hero payload and critical CSS | M | P0 |
| PERF-002 | perf/images | High | Lighthouse `render-blocking-resources`: Google Fonts CSS + 2 CSS chunks, est savings up to 1.8s mobile | Slower first render/FCP/LCP mobile | Replace CSS `@import` Google Fonts with `next/font/google`; reduce blocking CSS, split critical/non-critical | M | P1 |
| IMG-001 | images/perf | High | Lighthouse `unsized-images` score 0.5, 41 image instances without explicit dimensions | CLS risk + layout instability + decode inefficiency | Move key assets to `next/image` with explicit width/height (or `fill` + sized container) | M | P1 |
| IMG-002 | images/perf | Medium | Lighthouse `uses-responsive-images` est savings ~175KB mobile / ~367KB desktop | Over-delivery bytes, slower mobile LCP | Generate responsive sizes/srcset (prefer `next/image`) for logos/cards/carousel assets | M | P1 |
| PERF-003 | perf/seo | Medium | Lighthouse `dom-size`: ~1068 elements; carousels render tripled items for infinite loops | Extra layout/paint/memory cost; crawl noise from duplicated content | Keep only 1 logical set in DOM where possible, or hide clones with `aria-hidden`/`inert`, virtualize long tracks | M | P1 |
| SEO-001 | seo/semantic | Medium | Home has no JSON-LD Organization/WebSite schema (only Course schema on program page) | Missed rich-result/brand entity opportunities | Add homepage structured data: `Organization`, `WebSite`, `EducationalOrganization` + sameAs links | S | P2 |
| SEO-002 | seo/social | Medium | Global metadata has OG/Twitter text but no `images` defined | Weak social preview consistency and lower CTR on shares | Add `openGraph.images` + `twitter.images` with dedicated social image | S | P2 |
| SEO-003 | seo/a11y | Low | Feedback cards use anchor `href="#!"` for "Lire la suite" placeholder | Crawl noise, ambiguous intent, poor keyboard expectation | Use real URLs or convert to `<button>` when no navigation target | S | P2 |

## Images & Alt Audit

### Current state summary
- `img` usage on homepage sections: high (logos, team, cards, hero visuals, press)
- Decorative images with empty alt: present and mostly valid (`hero symbol`, decorative visuals)
- Informative images: generally have non-empty alt labels (logos, experts, posts, parcours)

### Alt quality checks
- Good:
  - Logos: `alt="Logo {name}"`
  - Editorial cards/blog: descriptive `imageAlt` from data
  - Team/experts: person name as alt
- To improve:
  - Decorative visuals should stay `alt=""` and be marked non-essential for SR context
  - For repeated logos in infinite/marquee clones, avoid repetitive screen-reader noise (`aria-hidden` on clones)

## SEO Technical Checklist Result
- Metadata base: present (`metadataBase`, title template, description)
- Canonical: present (default `/` + per-page path canonical)
- Robots: index/follow present
- Sitemap: present (`/sitemap.xml`) with static + dynamic routes
- HTML lang: `fr` present
- Heading hierarchy on homepage: one `h1`, multiple `h2/h3` coherent overall
- Main landmark + skip link: present

## 2-Wave Remediation Plan

### Wave 1 (1-2 days, quick wins)
1. Fix P0 a11y blockers (`aria-hidden-focus`, invalid `role=listitem`).
2. Replace Google Fonts `@import` with `next/font/google`.
3. Convert LCP-relevant hero image(s) and key above-the-fold assets to `next/image` with explicit dimensions/priority.
4. Remove placeholder `href="#!"` links.

### Wave 2 (3-5 days, structural)
1. Refactor infinite carousels to reduce duplicated DOM and SR noise.
2. Complete responsive image strategy for all homepage media (sizes/srcset, compression budget).
3. Add homepage JSON-LD and OG/Twitter image strategy.
4. Re-run Lighthouse x3 desktop/mobile and compare deltas against this baseline.

## Target Budgets (Go/No-Go)
- Mobile LCP: <= 2.5s (No-Go if > 3.0s)
- CLS: <= 0.1 (currently pass)
- Desktop Perf score: >= 95
- Mobile Perf score: >= 92
- Accessibility score: 100 desktop/mobile

## Appendix - Raw artifacts
- Lighthouse JSON runs:
  - `tmp/lh/desktop-1.json`
  - `tmp/lh/desktop-2.json`
  - `tmp/lh/desktop-3.json`
  - `tmp/lh/mobile-1.json`
  - `tmp/lh/mobile-2.json`
  - `tmp/lh/mobile-3.json`
