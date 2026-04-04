# GEO Audit Report: WashDog

**Audit Date:** 19 de marzo 2026
**URL:** https://www.washdog.cl
**Business Type:** Local Business (Peluquería Canina — Ñuñoa, Santiago)
**Pages Analyzed:** 14

---

## Executive Summary

**Overall GEO Score: 67/100 (Fair)**

WashDog has a solid technical foundation — all AI crawlers are welcome, schema markup is comprehensive, and the sitemap covers 149 URLs. The main gaps are on the authority and content side: blog posts cite no external sources, there are no named staff bios, and the brand has virtually zero presence on third-party platforms that AI models train on (directories, press, Reddit, Wikipedia). Fixing those gaps would push the score into the 80s.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 68/100 | 25% | 17.0 |
| Brand Authority | 48/100 | 20% | 9.6 |
| Content E-E-A-T | 62/100 | 20% | 12.4 |
| Technical GEO | 82/100 | 15% | 12.3 |
| Schema & Structured Data | 88/100 | 10% | 8.8 |
| Platform Optimization | 58/100 | 10% | 5.8 |
| **Overall GEO Score** | | | **65.9 → 66/100** |

---

## Critical Issues (Fix Immediately)

None. No AI crawlers are blocked, the site is indexable, and key schema is in place.

---

## High Priority Issues

### 1. No llms.txt file
- **Missing:** `https://www.washdog.cl/llms.txt` → 404
- **Why it matters:** llms.txt is the emerging standard for telling AI models what your site is about and which content to prioritize. Without it, AI systems have no explicit guidance.
- **Fix:** Create `/public/llms.txt` with business description, services, and key page links.

### 2. No named author bios on blog posts
- All 11 blog posts are attributed to "Equipo WashDog" with a generic 1-line bio.
- AI models and Google's EEAT guidelines heavily weight *who* wrote the content.
- **Fix:** Create a `/equipo` page with at least 2-3 named groomers, photos, years of experience, and specializations.

### 3. Zero external source citations in blog content
- Health and care claims ("baño cada 3-6 semanas", pH values for dog skin, coat damage from over-bathing) are presented as facts with no veterinary backing.
- **Fix:** Add 1-2 citations per blog post to AVMA, veterinary dermatology sources, or local vets.

### 4. No third-party directory listings
- WashDog appears on no Chilean business directories (Páginas Amarillas, Infobel, Cyberdir).
- These are sources AI training datasets pull from heavily for local business entity recognition.
- **Fix:** Register on top 4-5 Chilean directories. NAP must match exactly: *WashDog · Av. Irarrázaval 2086 B, Ñuñoa · +56 9 8723 0388*

---

## Medium Priority Issues

- **No PriceSpecification schema** — prices exist in FAQ text but not as structured `PriceSpecification` markup.
- **No Service schema** — service pages lack `schema.org/Service` with `name`, `description`, `provider`, `areaServed`.
- **No Organization schema** — separate from LocalBusiness; would strengthen brand entity recognition.
- **No author profile URL** — BlogPosting schema has `author: Person` but no `url` linking to an author bio page.
- **Client-side rendering** — Next.js CSR is functional but SSR/SSG would improve AI crawler efficiency.
- **Testimonials lack timestamps** — reduces trustworthiness signal.
- **Only 10 Google reviews** — low volume for a business claiming "200+ perros atendidos".

---

## Low Priority Issues

- Missing `hreflang` tags (not needed now, but relevant if expanding to other Spanish-speaking markets).
- Some blog posts under 600 words — expand to 1,000+ for better citability.
- No Open Graph image on inner pages (only homepage has `og:image`).
- Featured images not in schema (`ImageObject` missing from `BlogPosting`).

---

## Category Deep Dives

### AI Citability — 68/100

**What's working:**
- Every page has a 5 Q&A FAQ section — high citability format
- Specific pricing ($10.000 / $16.000) is consistently quotable
- Blog on bathing frequency (78/100) is the strongest page — breed-specific, 1,200 words, structured headings
- Service duration facts (15-30 min baño, 1-2 hrs corte) are extractable
- Business facts (address, hours, phone) consistent across all pages

**What's missing:**
- No external citations → AI models prefer content that cites authorities
- Service pages are thin (300-500 words) → not deep enough to be cited for informational queries
- No statistics beyond "200+ perros" claim
- Testimonials are undated and unverified

**Best page:** `/blog/frecuencia-bano-perros` (78/100)
**Weakest page:** `/servicios/precio-peluqueria-nunoa` (65/100)

---

### Brand Authority — 48/100

**What's working:**
- Google Business Profile with 5.0 stars / 10 reviews in schema
- 3 named testimonials on homepage (Joselyn Valdes, Amanda Danae Valencia, Anahi Flores Aroja)
- 4 social media profiles linked (Instagram, Facebook, TikTok, YouTube @washdogexpress)
- Business entity identified as "Los Pelusos SpA"

**What's missing:**
- No Wikipedia page
- No press or media mentions detected
- No third-party review platforms (Trustpilot, TripAdvisor, Yelp)
- No veterinary partnerships or endorsements
- No industry association membership
- 10 reviews is low for entity recognition by AI models

---

### Content E-E-A-T — 62/100

| Dimension | Score | Notes |
|---|---|---|
| Experience | 70/100 | Practical knowledge evident, real testimonials |
| Expertise | 60/100 | Claims lack sourcing, no individual credentials |
| Authoritativeness | 55/100 | Anonymous team, no third-party validation |
| Trustworthiness | 70/100 | Address, phone, privacy policy, terms all present |

**Quick win:** Add 3-5 veterinary source links to existing blog posts — takes 30 minutes, meaningful EEAT improvement.

---

### Technical GEO — 82/100

**Strengths:**
- ✅ All AI crawlers allowed: GPTBot, ClaudeBot, PerplexityBot, CCBot, Bingbot
- ✅ Sitemap with 149 URLs, correct priorities and changefreq
- ✅ Full Open Graph + Twitter Card meta tags
- ✅ Canonical URLs on all pages
- ✅ Meta descriptions present and optimized
- ✅ robots meta: index, follow

**Gaps:**
- ❌ No llms.txt (-8 points)
- ❌ No hreflang (-3 points)
- ⚠️ CSR rendering — functional but SSR preferred for AI crawlers (-7 points)

---

### Schema & Structured Data — 88/100

**Present on all pages:**
- `LocalBusiness` with GeoCoordinates, OpeningHoursSpecification, AggregateRating, sameAs social profiles
- `FAQPage` (5 Q&A pairs per page)
- `BreadcrumbList` on inner pages
- `BlogPosting` on blog posts

**Missing:**
- `Service` schema with `areaServed`, `description`, `provider`
- `PriceSpecification` (prices are in FAQ text, not structured)
- `Organization` schema (separate from LocalBusiness)
- `Offer` schema on service pages
- `ImageObject` on blog posts

---

### Platform Optimization — 58/100

| Platform | Status |
|---|---|
| Google Business Profile | ✅ Strong (5.0★, 10 reviews) |
| Instagram / TikTok / YouTube | ✅ Present (@washdogexpress) |
| Páginas Amarillas Chile | ❌ Not listed |
| Infobel / Cyberdir | ❌ Not listed |
| Press / Media mentions | ❌ None detected |
| Reddit / Foros pet Chile | ❌ None detected |
| Wikipedia | ❌ No entity page |
| Veterinary partnerships | ❌ None |

---

## Quick Wins (This Week)

1. **Create llms.txt** — 30 minutes, high AI visibility impact
2. **Add 2-3 source citations to top blog posts** — edit existing markdown files, immediate EEAT boost
3. **Register on Páginas Amarillas + Infobel** — 1 hour, critical for local citation ecosystem
4. **Add Service schema to service pages** — dev task, 2 hours, schema score → 92+
5. **Ask the 200+ past customers for Google reviews** — even 10 more reviews doubles the current count

---

## 30-Day Action Plan

### Week 1: Content Authority
- [ ] Add veterinary citations to `/blog/frecuencia-bano-perros`, `/blog/shampoo-correcto-perros`
- [ ] Create `/equipo` page with 2-3 named groomers + bios
- [ ] Update BlogPosting schema with author `url` pointing to `/equipo`

### Week 2: Technical Schema
- [ ] Create `/public/llms.txt`
- [ ] Add `Service` schema to `/servicios/bano` and `/servicios/corte`
- [ ] Add `PriceSpecification` to pricing pages
- [ ] Add `Organization` schema to homepage

### Week 3: Platform Presence
- [ ] Register on Páginas Amarillas, Infobel, Cyberdir (consistent NAP)
- [ ] Submit to Foursquare via Business Connect portal
- [ ] Send Google review request to past customers via WhatsApp broadcast

### Week 4: Brand Authority
- [ ] Republish top 3 blog posts on Medium with canonical back-link
- [ ] Reach out to 2-3 Ñuñoa veterinary clinics for partnership/mention
- [ ] Draft 1 press release for local Santiago pet media

---

## Appendix: Pages Analyzed

| URL | Citability | Key Issues |
|---|---|---|
| / | 72/100 | No team page linked |
| /servicios/bano | 75/100 | Thin content (400 words) |
| /servicios/corte | 70/100 | No Service schema |
| /servicios/peluqueria-canina-nunoa | 72/100 | No author attribution |
| /servicios/precio-peluqueria-nunoa | 65/100 | No PriceSpecification schema |
| /blog/frecuencia-bano-perros | 78/100 | No citations |
| /blog/shampoo-correcto-perros | 74/100 | No citations |
| /blog/como-cortar-pelo-perro | 74/100 | No citations |
| /blog/peluqueria-canina-nunoa | 65/100 | Primarily promotional |
| /blog/precio-peluqueria-canina-nunoa | 70/100 | No citations |
| /servicios/[service] (sample) | 68/100 | Thin content |
