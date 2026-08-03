# QA Checklist

## Core Flow

The release cannot ship unless the core loop passes:

1. Fresh user opens app.
2. User completes onboarding or first input.
3. App produces the first meaningful result.
4. User reviews or acts on the result.
5. User can return and continue.
6. Core data is stored.
7. Analytics events are emitted.

## Manual QA Cases

### Onboarding or First Input

- Empty required fields show clear errors.
- User can complete the step without confusion.
- The flow avoids unnecessary questions.

### Core Result

- Result is readable.
- User can approve, continue, or dismiss as designed.
- User is not forced into free-form chat unless chat is the product.

### Main Screen

- Primary action is visible.
- User state is understandable.
- Navigation is stable.

### Design QA

- Screen supports the design philosophy.
- Core interaction matches `docs/interaction-principles.md`.
- Visual decisions follow `docs/design-system-spec.md`.
- Service touchpoints match `docs/service-design-blueprint.md`.
- Copy follows `docs/design-tone-and-manner.md`.
- Detailed checks pass in `docs/design-qa-checklist.md`.

### Analytics

- Every required event fires once.
- Event payloads contain required IDs.
- Failed calls emit failure events.

## AI QA

If AI is used:

- Invalid JSON is handled.
- Missing fields are handled.
- User-facing copy follows tone rules.
- AI does not overclaim.

## Frontend QA

- No business rules embedded directly in JSX.
- No unnecessary derived state.
- Feature hooks are focused.
- Domain functions are named with product language.
- Components remain small enough to review.

## Public Website QA

- Header, navigation, CTA, forms, calculators, tables, galleries, and footer work on mobile and desktop.
- Every public route template has a unique title, description, canonical URL, and social metadata.
- `robots.txt` is valid.
- XML sitemap contains canonical public routes and excludes private/non-canonical routes.
- Sitemap route count matches the expected content source.
- Structured data is derived from verified visible content.
- `LocalBusiness`/`Organization`, `Service`, `BreadcrumbList`, `FAQPage`, and `Article` schemas are used only where applicable.
- Structured data has no placeholder claims, duplicate primary entities, or mismatched visible content.
- Semantic heading order and landmark structure are valid.
- Internal links connect service, price, portfolio, review, FAQ, and location content.
- Thin or duplicate location pages are not published.
- Core Web Vitals and image loading are checked on representative mobile and desktop pages.

## Release Gate

Before closed MVP distribution:

- Type check passes.
- Unit or fixture tests pass.
- Core flow manual QA passes.
- Design QA passes.
- One fresh install path passes.
- Environment variables are documented.
- Error logging is enabled.
- For a public website, responsive, SEO, sitemap, structured-data, and internal-link QA passes.
