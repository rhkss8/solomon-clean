# Project Start Checklist

## Purpose

Every new project must begin with a readiness audit before planning, visual direction, architecture, or implementation.

The agent must not assume that an answer is missing just because it is absent from `docs/service-definition.md`. First inspect:

- The current user request and earlier conversation.
- User-provided URLs, files, references, and constraints.
- Existing project documents.
- Existing code, assets, environment files, and configuration.
- Decisions already recorded in `docs/decision-log.md`.

Use confirmed information from those sources to prefill this checklist. Do not ask the user to repeat an answer that is already clear.

## Required Behavior

At the start of a new project:

1. Extract every already-confirmed answer from conversation and project context.
2. Mark each checklist item as `confirmed`, `assumed`, `unknown`, or `not applicable`.
3. Show the user a compact readiness summary.
4. Ask only the unknown questions that block the next phase.
5. State which unknowns can safely use placeholders.
6. Record confirmed decisions in the appropriate project documents.
7. Do not start visual design until the brand and design-direction gate is ready.
8. Do not start production implementation until the implementation gate is ready.

Never present a generic questionnaire without first pre-filling it from known context.

## Status Definitions

- `confirmed`: Explicitly provided by the user or verified in project sources.
- `assumed`: Reasonably inferred but capable of changing the product or design.
- `unknown`: Not available and cannot be safely inferred.
- `not applicable`: Outside the agreed project scope.

Any `assumed` item that materially changes brand, product, cost, privacy, or architecture must be confirmed before crossing its gate.

## A. Product Definition

- Service/project name.
- One-line service definition.
- Primary persona.
- Core user pain.
- Before state.
- After state.
- Core mechanism.
- Primary conversion or core action.
- MVP success criteria.
- Explicit non-goals.
- Reference products or sites.
- What should be borrowed from each reference.
- What must not be copied.

## B. Scope And Information Architecture

- Required public pages.
- Required private pages.
- Required service categories.
- Required location or SEO pages.
- Required forms and user flows.
- Required calculators or interactive tools.
- Required content types.
- Features explicitly excluded.
- Login/auth requirement.
- Admin requirement.
- Search requirement.
- Languages and locales.
- Desktop/mobile/platform targets.

## C. Brand Identity And Visual Direction

- Final service/company name.
- Existing logo availability.
- Logo source file and permitted usage.
- Whether a new logo or temporary wordmark is required.
- Existing brand colors.
- Color constraints or prohibited colors.
- Desired brand traits.
- Undesired brand traits.
- Typography constraints.
- Image style and available photography.
- Icon style.
- Direct design reference.
- Anti-reference.
- Accessibility/contrast requirement.
- Required visual territories to compare.
- Person who approves the final visual direction.

Brand colors and logo are not polish items. They are blocking inputs for a final visual direction. If they are unavailable, explicitly agree on a temporary brand system before implementation.

## D. Content And Proof

- Final company copy or permission to draft it.
- Service descriptions.
- Actual prices and VAT policy.
- Operating area.
- Operating hours.
- Phone number.
- KakaoTalk/channel link.
- Blog/RSS URL.
- Contact email.
- Work before/after photos.
- Testimonials/reviews source.
- Verifiable career, project-count, satisfaction, insurance, license, certification, and A/S claims.
- Business registration information.
- FAQ source.
- Refund/cancellation policy.

Unverified claims, copied competitor claims, and placeholder proof must never be presented as real.

## E. Functional Requirements

- Primary CTA behavior.
- Estimate form fields.
- File upload requirements.
- Estimate calculator rules.
- Submission success behavior.
- Submission storage destination.
- Staff notification destination.
- Email/SMS/AlimTalk requirements.
- RSS refresh and fallback behavior.
- Portfolio filters and detail fields.
- Search/filter/sort requirements.
- Analytics events.
- Error, loading, empty, and success states.

## F. Technical And Delivery Requirements

- Existing starter/codebase availability.
- Required framework or permission to choose.
- Package manager.
- Hosting/deployment target.
- Domain ownership and DNS responsibility.
- Environment variables and secrets owner.
- Database/storage requirement.
- File storage requirement.
- Email delivery provider.
- Browser/device support.
- Performance target.
- SEO requirements.
- Accessibility target.
- Test and QA expectations.
- Deployment authorization.

## G. Legal, Privacy, And Operations

- Personal data collected.
- Sensitive data or images collected.
- Consent requirements.
- Data retention expectation.
- Privacy policy owner.
- Terms owner.
- Refund/cancellation policy owner.
- Image usage consent.
- Required licenses/insurance disclosures.
- Operational response process.
- Who receives and owns customer submissions.

## Readiness Gates

### Planning Gate

Ready when:

- Product definition, persona, pain, transformation, primary action, reference, and non-goals are confirmed.
- Unknowns that affect scope are identified.

### Visual Direction Gate

Ready when:

- Brand name is confirmed.
- Existing logo/colors are supplied, or temporary brand-system creation is explicitly approved.
- Desired and undesired traits are confirmed.
- Reference and anti-reference are known.
- Two or three visual territories can be compared.

### Implementation Gate

Ready when:

- Page/feature scope is confirmed.
- One visual territory is approved.
- Design tokens and responsive rules are recorded.
- Technical stack and delivery target are confirmed or delegated.
- Real integrations are provided or explicitly allowed to use placeholders.
- Privacy-sensitive form/storage assumptions are confirmed.

### Launch Gate

Ready when:

- Real brand assets, contact destinations, legal copy, pricing, proof, and production environment values are supplied.
- Placeholder content is removed.
- QA, accessibility, SEO, and submission delivery are verified.

## Required Kickoff Output

Use this compact format:

```txt
Already confirmed:
- ...

Safe placeholders:
- ...

Blocking questions for the next phase:
1. ...
2. ...

Current readiness:
- Planning: Ready / Blocked
- Visual direction: Ready / Blocked
- Implementation: Ready / Blocked
- Launch: Ready / Blocked

Next action after answers:
- ...
```

Ask the smallest useful batch of questions. Usually ask 3 to 7 related blocking questions, then update the checklist from the answers before asking the next batch.
