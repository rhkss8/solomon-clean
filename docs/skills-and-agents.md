# Skills and Agents

## Purpose

This project needs persistent operating rules so Codex can keep building without losing product, design, and engineering intent.

Use project docs as local skills. Do not require global Codex skill installation.

`docs/work-routing.md` is the source of truth for request classification, team size, delegation, collaboration, and integration. The sections below are a capability catalog, not a list that must run for every task.

## Recommended Local Skill Areas

### 1. Product

Trigger when making product scope, MVP priority, user flow, or roadmap decisions.

Responsibilities:

- Keep the MVP focused on the core loop.
- Reject non-MVP features.
- Maintain superpowers.
- Define acceptance criteria.
- Keep success metrics visible.

Primary references:

- `docs/mvp-execution-harness.md`
- `docs/g-stack.md`
- `docs/superpowers.md`
- `docs/mvp-todo.md`
- `docs/wiki/index.md` only when product intent or source evidence is unclear

### 2. Design

Trigger when designing screens, copy, onboarding, notification prompts, or app tone.

Responsibilities:

- Own UX strategy, interaction design, visual system, service design, and design QA.
- Run the design production pipeline before major UI implementation.
- Produce reference scans, visual territories, direction decisions, wireframe plans, and high-fidelity screen plans.
- Define a composition model that makes current state, primary object, and primary action visible before styling.
- Maintain the product tone and design philosophy.
- Make the signature interaction easy to find and understand.
- Define review, confirmation, recovery, and empty states.
- Avoid patterns that conflict with the service concept.
- Turn reusable design lessons into system rules.

Primary references:

- `docs/design-production-pipeline.md`
- `docs/ui-quality-philosophy.md`
- `docs/visual-composition-rules.md`
- `docs/design-reference-brief.md`
- `docs/design-philosophy.md`
- `docs/interaction-principles.md`
- `docs/design-system-spec.md`
- `docs/service-design-blueprint.md`
- `docs/design-tone-and-manner.md`
- `docs/design-review-rubric.md`
- `docs/design-qa-checklist.md`
- `docs/wiki/index.md` only when research, UX, copy, positioning, or design evidence matters

Optional implementation aid:

- `.codex/skills/impeccable/SKILL.md`
- Use Impeccable for scoped critique, audit, responsive hardening, polish, and design-system drift detection.
- Product decisions and approved references always outrank Impeccable's general taste rules.
- `docs/design-production-pipeline.md`, the chosen direction in `docs/decision-log.md`, and `docs/design-system-spec.md` remain the visual source of truth.
- Do not enable Impeccable hooks, Live Mode, or CI blocking by default. Adopt them only after a project-specific detector pilot and explicit approval.
- Generate `PRODUCT.md` or `DESIGN.md` only inside a concrete service after its product direction and implemented visual system exist; never prefill them in this generic starter.

### 3. Frontend

Trigger when writing or reviewing frontend code.

Responsibilities:

- Enforce SRP, SoC, DRY, abstraction, encapsulation, domain modeling, derived-state discipline, predictable data flow, and composition.
- Keep business logic out of JSX.
- Keep future product changes cheap.

Primary reference:

- `docs/frontend-engineering-standards.md`

### 4. AI

Trigger when implementing or changing AI behavior, prompt contracts, or fixtures.

Responsibilities:

- Keep AI output structured.
- Require reviewable JSON responses.
- Prevent generic chatbot behavior unless chat is the product.
- Maintain fixture-based regression tests.

Primary references:

- `docs/ai-contracts.md`
- `tests/fixtures/`

### 5. QA and Analytics

Trigger when defining tests, release gates, event tracking, or MVP reports.

Responsibilities:

- Verify the full core loop.
- Track activation, core action, approval, and return behavior.
- Keep tests aligned to MVP validation.

Primary references:

- `docs/analytics-events.md`
- `docs/qa-checklist.md`

### 6. Maintenance

Trigger when fixing bugs, correcting existing behavior, handling regressions, or refactoring after the MVP already exists.

Responsibilities:

- Preserve intended behavior outside the requested change.
- Find root cause before editing.
- Keep the fix small.
- Add regression checks when practical.
- Run `tars verify` before completion.

Primary references:

- `.codex/skills/tars-maintenance/SKILL.md`
- `docs/maintenance-workflow.md`
- `docs/lessons-quick.md`

### 7. Deep Thinking

Trigger before product planning, system design, UX direction, large implementation, or ambiguous todo work.

Responsibilities:

- Expand the problem space before code changes.
- Follow a short question cascade instead of solving only the surface request.
- Map user state, product goal, current behavior, desired behavior, system surface, risk, and verification.
- Compare options before recommending one.
- Exclude tempting but wrong expansions.
- Convert the chosen direction into the smallest executable slice.

Primary references:

- `.codex/skills/tars-deep-thinking/SKILL.md`
- `docs/deep-thinking-workflow.md`
- `docs/decision-gates.md`

## Agent Operating Model

Use `.codex/skills/tars-orchestrator/SKILL.md` for mixed-domain, high-impact, or safely parallelizable work. Use one lead and the smallest useful team.

### Lead Agent

Owns the domain decision and bounded work packages. Exactly one lead is accountable for a task.

### Orchestrator

Owns routing, source-of-truth resolution, worker boundaries, integration, final verification, and user communication. It retains the critical path and never delegates final accountability.

### Product Agent

Use for MVP scope review, flow conflicts, and prioritization decisions.

### Design Agent

Use for:

- UX strategy.
- Reference scan.
- Visual territories.
- Direction decision.
- Wireframe plan.
- High-fidelity screen plan.
- Screen concepts.
- Interaction flows.
- Visual system decisions.
- Service journey critique.
- Copy tone.
- Design QA.

Must read:

- `docs/design-production-pipeline.md`
- `docs/design-reference-brief.md`
- `docs/design-philosophy.md`
- `docs/interaction-principles.md`
- `docs/design-system-spec.md`
- `docs/service-design-blueprint.md`
- `docs/design-tone-and-manner.md`
- `docs/design-review-rubric.md`
- `docs/design-qa-checklist.md`

### Frontend Agent

Use for app implementation, component architecture, and refactors.

### AI Agent

Use for prompt contracts, JSON schemas, and AI regression fixtures.

### QA Agent

Use as a read-only reviewer by default for core flows, regressions, analytics coverage, and release evidence.

## Collaboration Rules

- Keep clear, local work single-agent.
- Delegate only independent packages with disjoint file ownership.
- Give every worker the task brief defined in `docs/work-routing.md`.
- Require evidence, checks, assumptions, and unresolved risks in every handoff.
- Do not let workers coordinate a peer network or redefine the user request.
- Use reviewers to test a named risk, not to repeat implementation.
- Let the orchestrator resolve conflicts and verify the integrated result.
- Persist durable decisions and reusable lessons only; do not create per-task coordination documents.
