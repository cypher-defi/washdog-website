# GEO Audit Report: WashDog

**Audit Date:** 2026-04-07
**URL:** https://www.washdog.cl
**Business Type:** Local Business — Dog Grooming (Ñuñoa, Santiago, Chile)
**Pages Analyzed:** 20 (homepage, 6 service pages, 6 breed pages, 3 blog posts, /equipo, /blog index, /servicios/precio-peluqueria-nunoa)

---

## Executive Summary

**Overall GEO Score: 59/100 (Fair — up from ~42 in March)**

WashDog has made significant infrastructure improvements since the previous audit: SSR-rendered schema, llms.txt, security headers, Bing verification, and a complete rewrite of 6 breed pages. The site now has solid technical GEO foundations and increasingly strong schema coverage. The main drag on the score is brand authority and platform presence — both expected for a business that opened in February 2026. Content E-E-A-T is progressing well but needs more depth in author credentials and external citations across service pages.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 72/100 | 25% | 18.0 |
| Brand Authority | 28/100 | 20% | 5.6 |
| Content E-E-A-T | 65/100 | 20% | 13.0 |
| Technical GEO | 82/100 | 15% | 12.3 |
| Schema & Structured Data | 76/100 | 10% | 7.6 |
| Platform Optimization | 28/100 | 10% | 2.8 |
| **Overall GEO Score** | | | **59.3/100** |

---

## Critical Issues (Fix Immediately)

### C1 — AggregateRating not linked to a verifiable source

The homepage, all service pages, and schema markup assert 5/5 stars from 29 reviews — but there is no visible link to a Google Business Profile, Facebook reviews page, or any third-party platform where users can verify this. Google's Quality Rater Guidelines explicitly flag unverifiable aggregate rating claims as a trustworthiness risk that can trigger manual quality review.

**Fix:** Add a "Ver reseñas en Google" link pointing to the Google Business Profile URL on the homepage, and add the Google Business Profile URL to `sameAs` in LocalBusiness schema.

### C2 — Homepage claims "certified groomers" but /equipo has no certifications

The homepage mentions certified groomers, but the `/equipo` page has no certifications, courses, or training credentials listed for José Pablo. This inconsistency between pages is a concrete trustworthiness red flag for Google Quality Raters.

**Fix:** Either add José Pablo's actual grooming training to /equipo (course name, institution), or change the homepage copy to match what the bio actually claims.

---

## High Priority Issues

### H1 — llms.txt contains stale blog URLs that 404

The `/llms.txt` file lists 7 blog URLs, but 2 of them point to non-existent pages:
- `/blog/frecuencia-bano-perros` — does NOT exist
- `/blog/shampoo-correcto-perros` — does NOT exist

The actual blog has 12 posts. The llms.txt is missing 7 of them and linking to dead URLs. When AI crawlers fetch llms.txt and follow these links, they hit 404s, which undermines trust in the document.

**Fix:** Update `public/llms.txt` to match actual blog posts.

---

### H2 — No individual Review schema (only AggregateRating)

The site shows an AggregateRating of 5/5 from 29 reviews everywhere, but there are no `Review` schema objects with individual reviewText, author, and datePublished. AI systems like Google AI Overviews heavily weight individual review schema for trust signals. The testimonials on breed pages (Camila R., Valentina S., Francisco T., etc.) are perfect candidates.

**Fix:** Add `Review` schema blocks to breed pages where named testimonials exist.

---

### H3 — Blog index page has no visible author bylines

When crawling `/blog`, no individual author bylines are visible. The `BlogPosting` schema has correct author attribution (José Pablo), but it's invisible to users on the listing page. This weakens E-E-A-T signals for the blog as a whole.

**Fix:** Add author name + date to each blog card on the `/blog` listing page.

---

## Medium Priority Issues

### M1 — llms.txt missing 5 recent blog posts

Even after fixing dead URLs, the llms.txt only lists 7 of 12 blog posts. Missing:
- `/blog/como-cuidar-pelo-golden-retriever`
- `/blog/cuando-llevar-perro-peluquero-primera-vez`
- `/blog/diferencia-bano-corte-peluqueria-canina`
- `/blog/como-secar-perro-despues-bano`
- `/blog/senales-corte-pelo-perro`

**Fix:** Add all 12 blog posts to llms.txt.

### M2 — Breed pages lack external citations

Breed service pages (Golden Retriever, Labrador, French Bulldog, etc.) contain expert content about coat biology and grooming protocols, but none cite external sources (AKC, AVMA, veterinary organizations). Blog posts have citations; service pages don't. This asymmetry limits E-E-A-T for the service pages.

**Fix:** Add 1-2 external citations per breed page (e.g., AKC breed grooming guides).

### M3 — sameAs has Google Maps URL but that's not a valid entity link

The LocalBusiness schema has 5 sameAs URLs (Google Maps, Instagram, Facebook, TikTok, YouTube) but the Google Maps URL is not a recognized sameAs destination for AI entity resolution. It should be replaced with the Google Business Profile URL. Also missing: LinkedIn (if applicable), Páginas Amarillas, Foursquare once those listings are live.

**Fix:** Remove the Google Maps URL from sameAs, replace with the stable Google Business Profile URL (`https://g.co/kgs/...`), and add directory URLs as they go live.

### M3b — foundingDate uses invalid ISO 8601 format

`foundingDate: "2026-02"` is not valid ISO 8601 — it must be a full date: `"2026-02-01"`. This is flagged as a schema validation error.

**Fix:** Change `foundingDate` to `"2026-02-01"` in `LocalBusinessJsonLd.tsx`.

### M3c — Logo property uses hero photo instead of actual logo

The `logo` property in LocalBusiness schema points to `hero-beagle.png` — the dog photo. Google's Rich Results guidelines require the logo to be a wordmark or logomark, not a product/hero image. This can prevent logo display in Knowledge Panels.

**Fix:** Create a dedicated logo image file and reference it in the logo property.

### M4 — /equipo page has no certifications or formal credentials

José Pablo's bio describes his experience and motivation but mentions no formal grooming certifications, courses, or professional affiliations. Even basic credentials would strengthen E-E-A-T signals.

**Fix:** If José Pablo has any grooming courses or certifications, add them to the /equipo page and to the Person schema's `hasCredential` property.

### M5 — Local page titles too long (60+ chars on geo pages)

The technical subagent found `/servicios/bano-perros-nunoa` has an 82-character title: "WashDog baño perros en Ñuñoa — Peluquería Canina Premium Santiago | Washdog Ñuñoa". All 60 geo-targeted local pages likely have the same issue. Google truncates titles at ~60 characters.

**Fix:** Audit all local page titles. Use the pattern `[Service] en [Neighborhood] | WashDog` — e.g., "Baño de Perros en Ñuñoa | WashDog" (34 chars).

### M6 — robots.txt doesn't explicitly name AI crawlers

The wildcard `User-agent: *` covers all crawlers including AI ones, but explicitly listing GPTBot, ClaudeBot, PerplexityBot, and anthropic-ai with `Allow: /` signals intentional AI accessibility and prevents any future ambiguity.

**Fix:** Add named blocks for each major AI crawler in `robots.txt`.

### M8 — BlogPosting schemas missing `image` property

All 12 blog posts are missing the `image` property in their BlogPosting schema. This is a required property for Google Article rich results eligibility. The OG image already exists in the page `<head>` — it just needs to be injected into the schema at build time.

**Fix:** Add `image` to BlogPosting schema generation in `src/app/blog/[slug]/layout.tsx`, pulling from the post's OG image URL.

### M9 — HowTo step text is truncated in Golden Retriever blog post

Steps 3 and 4 in the HowTo schema for `/blog/como-cuidar-pelo-golden-retriever` have incomplete or self-referential `text` content. While HowTo no longer produces Google rich results (removed Sep 2023), AI systems still read this for semantic understanding.

**Fix:** Update the HowTo step generation to include full instructional text, not just the heading.

### M10 — No YouTube videos despite having a channel

The YouTube channel @washdogexpress exists and is linked sitewide, but has no videos. AI systems frequently cite YouTube to assess brand legitimacy. An empty channel is a missed authority signal and blocks VideoObject schema.

**Fix:** Publish at least 1-2 short videos (30-60 seconds each) showing the grooming process, the space, or a before/after.

---

## Low Priority Issues

### L1 — AggregateRating count is hardcoded at 29

`reviewCount: 29` is static in schema. As reviews grow, it won't update automatically.

### L2 — Open Graph image is generic (hero-beagle.png)

All pages share the same OG image. Breed pages and blog posts would benefit from unique OG images for better social sharing previews.

### L3 — Pricing page has no testimonials

`/servicios/precio-peluqueria-nunoa` is a high-intent page. Adding 1-2 customer quotes addressing value would improve conversion and citability.

### L4 — Newsletter pages have no Article schema

The `/newsletter` and `/newsletter/issue-*` pages appear to have no structured data. Low priority since these aren't core conversion pages.

### L5 — 90 geo-targeted local pages may be creating thin content signals

The sitemap has 193 URLs but only 107 indexed (88%). The gap is mostly the 90 geo-targeted pages (30 bano-perros, 30 corte-perros, 30 peluqueria-canina by location). If these pages are templated with minimal unique content per location, Google may continue to suppress them.

---

## Category Deep Dives

### AI Citability (72/100)

**Strengths:**
- Breed pages: 1,200–1,400 words each with genuinely unique, self-contained answer blocks
- Example quoteable passage (French Bulldog page): *"El French Bulldog es braquicéfalo — tiene el hocico corto y las fosas nasales comprimidas, lo que afecta directamente su capacidad de respirar."*
- Example quoteable passage (Labrador page): *"Un Labrador bien deslanado regula mejor su temperatura que uno rapado."*
- Pricing data: market comparison table with ranges for small/medium/large dogs
- FAQ sections on nearly all pages with FAQPage schema
- Speakable markup on BlogPosting (H1, H2, first paragraph)
- AVMA/AKC citations on 8+ blog posts

**Weaknesses:**
- Some blog posts are short (650 words for "5 señales")
- Service pages lack external citations
- No original statistics from local data (e.g., "% of dogs in Santiago needing deshedding in autumn")

**Top citability pages:** `/blog/precio-peluqueria-canina-nunoa`, `/servicios/peluqueria-french-bulldog-nunoa`, `/servicios/peluqueria-golden-retriever-nunoa`

---

### Brand Authority (28/100)

*Context: business opened February 2026, less than 60 days old. This score is expected.*

**Current signals:**
- Google Business Profile: 29 reviews, 5/5 stars ✓
- Social presence: Instagram, Facebook, TikTok, YouTube ✓
- Mascofans.com.ar directory listing found in search results ✓
- Appearing in 2x3.cl results for "peluquería canina Santiago" ✓

**Missing:**
- No Wikipedia/Wikidata entry (needs 3rd party references first)
- No Reddit Chile mentions (r/chile, r/santiagodechile)
- YouTube channel: 0 videos published
- No press mentions, blog mentions, or forum discussions found in web search
- Páginas Amarillas + Foursquare: being added manually

**Trajectory:** Will improve naturally as reviews accumulate and the business ages. YouTube videos are the highest-impact action available right now.

---

### Content E-E-A-T (65/100)

**Experience:** Strong — José Pablo personally performs all grooming (stated clearly on /equipo and in llms.txt). Named testimonials with real neighborhoods. "200+ dogs served" social proof.

**Expertise:** Good and improving — breed pages demonstrate technical knowledge (stripping technique for Schnauzer, hot spots for Golden, brachycephalic protocol for French Bulldog). Blog posts cite AVMA and AKC. No formal certifications mentioned.

**Authoritativeness:** Moderate — José Pablo has a Person schema with @id, dedicated /equipo page, and consistent author attribution in blog schemas. No external sites cite him as an authority yet.

**Trustworthiness:** Good — NAP consistent across all pages, privacy policy + terms present, HTTPS, Google Maps embed, RUT visible in llms.txt.

**Gap:** Blog listing page doesn't show author bylines visually (exists in schema only).

---

### Technical GEO (82/100)

**Excellent:**
- `robots.txt`: fully permissive, all AI crawlers allowed
- SSR confirmed: Next.js App Router, content is server-rendered — AI crawlers don't need JS execution
- Security headers: CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options all present
- Bing Webmaster Tools: verified via msvalidate.01 meta tag
- Google Search Console: 107/122 pages indexed (88% indexation rate)
- llms.txt: present, well-structured, accessible at /llms.txt

**Issues:**
- llms.txt has 2 dead blog URLs (see H1)
- 86 unindexed pages (mostly the 90 geo-targeted local pages) — structural SEO risk if pages are near-duplicate

---

### Schema & Structured Data (76/100)

**Present and working:**
- LocalBusiness: complete (geo, NAP, hours, OfferCatalog, AggregateRating)
- FAQPage: homepage + service pages
- BlogPosting + HowTo: blog posts
- BreadcrumbList: service pages
- Service: /servicios/bano (server-rendered in layout.tsx ✓)
- Person: José Pablo with @id, knowsAbout, worksFor
- speakable: BlogPosting schema (H1, H2, .prose p:first-of-type)
- AggregateRating: 5/5, 29 reviews

**Missing:**
- Individual Review schema (testimonials exist in HTML, not in schema)
- sameAs on Organization: only 1 URL
- VideoObject: pending YouTube content
- ItemList: could wrap the breed page set as a collection

---

### Platform Optimization (28/100)

*Context: 2-month-old local business. Score is expected.*

**Present:**
- Google Business Profile ✓ (29 reviews, 5★)
- Instagram, Facebook, TikTok (linked sitewide)
- YouTube channel: exists, 0 videos
- Mascofans.com.ar listing

**Not yet present:**
- YouTube videos (highest impact action available right now)
- Wikipedia/Wikidata
- Reddit/forum mentions
- Press or blog coverage
- Páginas Amarillas Chile (being added)
- Foursquare (being added)

---

## Quick Wins (Implement This Week)

1. **Fix llms.txt** — Remove 2 dead URLs, add all 12 current blog posts. 30-minute fix, immediate impact on AI crawler trust.
2. **Add Review schema to breed pages** — Wrap the 6 named testimonials in `Review` schema. Makes them eligible for Google rich results.
3. **Add sameAs to LocalBusiness schema** — Add Instagram, Facebook, TikTok, YouTube, Google Maps URLs to the sameAs array.
4. **Add 1 AKC citation per breed page** — One sentence + external link. Improves E-E-A-T on service pages.
5. **Publish first YouTube video** — Even 30 seconds of the space or a grooming session. Highest-impact brand authority action available.

---

## 30-Day Action Plan

### Week 1: Fix Infrastructure
- [ ] Update `public/llms.txt` — fix dead URLs, add all 12 blog posts
- [ ] Add `Review` schema to 6 breed pages (wrap testimonials)
- [ ] Add `sameAs` array to `LocalBusinessJsonLd.tsx`

### Week 2: Strengthen Content E-E-A-T
- [ ] Add 1 AKC/ASPCA citation per breed page (6 pages)
- [ ] Add author bylines (name + date) to blog card components on /blog listing
- [ ] Add any grooming certifications to /equipo and Person schema

### Week 3: Brand Authority
- [ ] Publish first YouTube video
- [ ] Confirm Páginas Amarillas and Foursquare listings are live with consistent NAP
- [ ] Add YouTube + directory URLs to sameAs

### Week 4: Content Expansion
- [ ] Write 1-2 new blog posts (topics: "shampoo hipoalergénico para perros con alergia", "cómo preparar a tu perro para su primer baño")
- [ ] Add 1-2 testimonials to pricing page
- [ ] Request re-indexing in GSC for the 6 rewritten breed pages (if not yet indexed)

---

## Score Comparison vs Previous Audit (~March 2026)

| Category | Before | After | Change |
|---|---|---|---|
| AI Citability | ~55 | 72 | +17 ↑ (breed rewrites, citations) |
| Brand Authority | ~20 | 28 | +8 ↑ (more reviews, directories) |
| Content E-E-A-T | ~48 | 65 | +17 ↑ (author entity, citations, breed pages) |
| Technical GEO | ~58 | 82 | +24 ↑ (llms.txt, SSR schema fix, headers, Bing) |
| Schema | ~55 | 76 | +21 ↑ (speakable, Person @id, Service SSR) |
| Platform | ~18 | 28 | +10 ↑ (GBP reviews, directories) |
| **Overall** | **~42** | **~59** | **+17 points** |

---

## Appendix: Pages Analyzed

| URL | Key Issues Found |
|---|---|
| / | sameAs incomplete on schema |
| /servicios/peluqueria-canina-nunoa | No individual testimonials |
| /servicios/bano | No individual testimonials |
| /servicios/corte | No individual testimonials |
| /servicios/precio-peluqueria-nunoa | No testimonials on pricing page |
| /servicios/peluqueria-golden-retriever-nunoa | No external citations, no Review schema |
| /servicios/peluqueria-french-bulldog-nunoa | No external citations, no Review schema |
| /servicios/peluqueria-labrador-nunoa | No external citations, no Review schema |
| /servicios/peluqueria-poodle-nunoa | No external citations, no Review schema |
| /servicios/peluqueria-schnauzer-nunoa | No external citations, no Review schema |
| /servicios/peluqueria-yorkshire-nunoa | No external citations, no Review schema |
| /equipo | No certifications listed |
| /blog | No author bylines on cards |
| /blog/como-cuidar-pelo-golden-retriever | ✅ Best-in-class page, 0 major issues |
| /blog/senales-corte-pelo-perro | Short (650 words), no FAQ schema |
| /blog/precio-peluqueria-canina-nunoa | ✅ Strong citability, 0 major issues |
| /blog/errores-banar-perro | Verify citations added |
| /blog/como-banar-perro-correctamente | Verify citations added |
| /llms.txt | 2 dead URLs, missing 5 blog posts |
| /robots.txt | ✅ Fully permissive |
