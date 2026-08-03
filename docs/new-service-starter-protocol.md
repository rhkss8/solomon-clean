# New Service Starter Protocol

## Purpose

For every new service, start from the same operating structure.

Before generating anything, run `docs/project-start-checklist.md`.

The starter must distinguish between:

- Information already confirmed in conversation or project sources.
- Safe placeholders.
- Unknowns that block planning, visual direction, implementation, or launch.

Do not ask users to repeat confirmed information. Do not treat brand identity, operations, privacy, integrations, or delivery requirements as late-stage polish.

## Required Inputs

### 1. Service Definition

Answer in one sentence:

This service helps `[persona]` achieve `[outcome]` by `[core mechanism]`.

### 2. Persona

Define:

- Who they are.
- What situation they are in.
- What they already tried.
- Why existing solutions failed.
- What moment makes them search for a new product.

### 3. Core Pain

Use plain language.

Bad:

- "Need better AI personalization."

Good:

- "When [specific situation] happens, the user feels [specific pain]."

### 4. Desired Transformation

Define the before and after.

Before:

- What the user feels or does today.

After:

- What the user can do after the product works.

## G-Stack

G-Stack is the default project operating stack for new services.

### G1. Goal Stack

Defines what the product must prove.

Required outputs:

- One-line MVP goal.
- Core loop.
- Primary success metric.
- Secondary metrics.
- Non-goals.

### G2. Growth Stack

Defines how the first users are acquired and learned from.

Required outputs:

- First 10 users.
- First 50 users.
- Acquisition channel.
- Feedback channel.
- Retention hypothesis.

### G3. Governance Stack

Defines rules that keep development from drifting.

Required outputs:

- Scope guardrails.
- Decision log.
- Definition of done.
- Stop conditions.
- Release gates.

### G4. Ground Truth Stack

Defines what data tells the team whether the product works.

Required outputs:

- Analytics events.
- User state model.
- Experiment dashboard questions.
- QA checklist.
- Manual observation plan.

### G5. Generation Stack

Defines how AI participates in the product.

Required outputs:

- AI functions.
- JSON contracts.
- Prompt fixtures.
- Regression checks.
- Fallback behavior.

### G6. Gestalt Stack

Defines the product's design philosophy and experience system.

Required outputs:

- Design production pipeline.
- Reference brief.
- Design philosophy.
- UX strategy.
- Interaction principles.
- Visual system rules.
- Service design blueprint.
- Design review rubric.
- Design QA checklist.

## Superpowers

Superpowers are the few abilities the service gives the user that existing products do not.

Rules:

- 1 to 3 superpowers only.
- Each superpower must map to a core product flow.
- Each superpower must be testable in the MVP.
- Avoid generic claims like "AI personalized experience."

Template:

```txt
As a [persona], I can [new ability], so that [meaningful outcome].
```

## New Project Kickoff Flow

1. Read the current conversation, supplied references, project files, and existing decisions.
2. Run `docs/project-start-checklist.md`.
3. Show already-confirmed answers, safe placeholders, blocking questions, and readiness gates.
4. Ask only the smallest batch of unanswered blocking questions.
5. Update project documents with the answers.
6. Define service, persona, pain, transformation, primary action, and non-goals.
7. Write 1 to 3 superpowers.
8. Generate G-Stack.
9. Generate MVP todo.
10. Run the design production pipeline only after the Visual Direction Gate is ready.
11. Generate reference scan and 2 to 3 visual territories.
12. Choose a visual direction and record the decision.
13. Generate wireframe and high-fidelity screen plans.
14. Generate design philosophy, interaction principles, design system, tone, review, and QA rules.
15. Confirm the Implementation Gate.
16. Generate frontend standards and technical contracts.
17. Generate AI contracts if AI is part of the product.
18. Generate analytics and QA gates.
19. Start Phase 0 foundation.

## Lesson-And-Run Memory

Every new service should maintain:

- `docs/decision-log.md`
- `docs/lessons-and-rules.md`
- `docs/deep-thinking-workflow.md`
- `docs/inbox/`
- `docs/wiki/`
- `docs/reentry-protocol.md`
- `docs/starter-acceptance.md`

Promotion path:

1. Chat insight.
2. Project decision or lesson.
3. Harness rule.
4. Checklist item.
5. Reusable starter update.

## Knowledge Wiki

Use `docs/inbox/` for original material and `docs/wiki/` for Codex-generated synthesis.

This wiki is optional and should not be loaded for every task. Use it when product intent, research, UX, copy, positioning, or design evidence matters.

Rules:

- Original material goes in `docs/inbox/`.
- Wiki pages follow `docs/wiki/schema.md`.
- Wiki pages use `[[Wiki Links]]`.
- Humans edit inbox sources, not wiki synthesis.
- Current code, tests, and direct user requests take priority during narrow maintenance.

## Deep Thinking

Use `tars think` before product planning, system design, UX direction, large implementation, or ambiguous todo work.

This is the planning counterpart to `tars maintain`:

- `tars maintain` keeps existing behavior stable while making a small correction.
- `tars think` expands the problem space before execution, compares options, excludes off-scope work, and then shrinks the plan into one small vertical slice.

Do not use `tars think` as a report generator. It should improve the next implementation step, not create extra artifacts.

## Starter Acceptance And Re-Entry

Use `docs/starter-acceptance.md` when changing TARS or copying the starter into a new project.

Use `docs/reentry-protocol.md` when resuming after a context reset, machine switch, or long break.

These files keep the harness deterministic without introducing a heavy report chain.
