# Browser QA Report

## 2026-08-05

- Runtime: Node 22.18.0, pnpm 10.15.1, Chromium via Playwright CLI, local port 3002.
- Viewports: desktop 1440×1000, mobile 390×844.
- Mobile routes checked: homepage, service hub/detail, prices, portfolio, region hub/detail, company, estimate, three policy pages, robots and sitemap.
- Desktop templates checked: homepage, service detail, prices, company, estimate and privacy.
- Result: all HTML routes returned 200, had one H1, unique titles, and no horizontal overflow.
- Estimate form: empty submission returned the expected 422 and displayed field-level errors plus a summary message.
- Expected console noise: the browser reports the deliberately triggered 422 as a failed resource; no unexpected page error remained.
- Defect fixed: the local fallback URL previously sent the favicon request to an example domain; it now uses `http://localhost:3002`.
- Defect fixed: the client-only estimate page lacked unique metadata; the form is now composed under a server page with dedicated title, description and canonical path.

Production Core Web Vitals and real submission delivery remain part of deployment verification because they require the final domain and Vercel storage connections.
