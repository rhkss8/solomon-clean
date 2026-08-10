# Agent Runbook

## Mission

Build the MVP until the core loop is complete:

`[Core loop from docs/g-stack.md]`

Use `docs/new-service-starter-protocol.md` as the reusable kickoff protocol.

## Route Every Work Cycle

1. An explicit user request and the latest correction outrank autonomous todo selection.
2. Read `docs/work-routing.md` and classify the action, domain, impact, uncertainty, and source of truth.
3. Choose one primary work profile and exactly one lead.
4. Load only the references selected by the routing table. Do not preload the full harness.
5. Keep narrow work single-agent. Use workers or reviewers only when the work splits safely or the risk justifies an independent check.
6. If there is no direct user request, use `docs/mvp-todo.md` to select the next core-loop slice.

Route optional capabilities only when selected:

- Maintenance: `.codex/skills/tars-maintenance/SKILL.md` and `docs/maintenance-workflow.md`.
- Cross-domain orchestration: `.codex/skills/tars-orchestrator/SKILL.md`.
- Ambiguous product, UX, or architecture work: `.codex/skills/tars-deep-thinking/SKILL.md` and `docs/deep-thinking-workflow.md`.
- Re-entry: `docs/reentry-protocol.md` and `docs/workstation-handoff.md`.
- Product definition: `docs/service-definition.md`, `docs/g-stack.md`, and `docs/superpowers.md`.
- UI/UX: the approved design source plus only the relevant design reference and QA checklist.
- Frontend, AI, metrics, or release: the corresponding engineering, AI, analytics, or QA contract.

## Work Selection

Handle the explicit user request first. Pick the first incomplete todo that unlocks the core loop only when operating an autonomous build session without a direct request.

Priority order:

1. Foundation.
2. Product contracts.
3. First core action.
4. Main repeated use flow.
5. Persistence and analytics.
6. Real AI integration if applicable.
7. Release readiness.

Do not spend cycles on non-MVP features.

## Implementation Rule

Prefer vertical slices over horizontal infrastructure.

Good:

- Input -> mock result -> review -> persisted result.

Bad:

- Build a large design library before any user flow works.
- Build AI infrastructure before a mock flow exists.
- Build auth before local core loop is proven.

## Maintenance Rule

For existing behavior, use `.codex/skills/tars-maintenance/SKILL.md`.

Maintenance work must:

- Restate the requested outcome.
- Establish current behavior and root cause before editing.
- Keep the fix scoped to the request.
- Preserve unrelated behavior.
- Add a regression check when practical.
- Run `tars verify` before completion.

## Deep Thinking Rule

For planning, design, architecture, large implementation, or ambiguous todo work, use `.codex/skills/tars-deep-thinking/SKILL.md`.

Use `tars think` when the task needs exploration before execution. This mode must:

- Restate the problem and success criteria.
- Follow a short question cascade.
- Map user state, product goal, current behavior, desired behavior, system surface, risk, and verification.
- Compare at least two options.
- Name excluded work so the agent does not drift.
- Stop for user approval when a decision gate is crossed.
- End with the smallest implementation slice.

Do not use deep thinking as a report generator. Use it to choose better work before editing.

## Knowledge Wiki Rule

Use `docs/inbox/` and `docs/wiki/` as an optional Karpathy-style plain Markdown knowledge graph.

- Humans put original source material in `docs/inbox/`.
- Codex updates `docs/wiki/` with `[[Wiki Links]]` using `docs/wiki/schema.md`.
- Do not read wiki for every task.
- Read wiki only when product intent, research, UX, copy, positioning, or design evidence matters.
- For narrow maintenance, current code, tests, and user request come first.
- If wiki conflicts with source material, current code, tests, or user request, ask which source wins.

## Re-Entry Rule

When resuming after a context reset, machine switch, or long break:

- Do not restart from scratch.
- Follow `docs/reentry-protocol.md`.
- Reconstruct state from git status, TARS status, open todo, and current diff.
- Report branch, worktree state, next todo, applicable workflow, and blockers before editing.

Design rule:

- Do not jump from abstract design philosophy directly into code.
- Before major UI work, produce a reference scan, 2 to 3 visual territories, a direction decision, a composition model, a wireframe plan, and a high-fidelity screen plan.
- Define design philosophy, interaction principles, and the MVP design system before building repeated UI.
- Keep the design system small enough to serve the first vertical slice.
- Run design review and design QA before marking a UI slice complete.

## Quality Rule

Frontend code must follow `docs/frontend-engineering-standards.md`.

Refactor mixed responsibilities only when they obstruct the requested change, create a concrete regression risk, or are part of the accepted scope. Do not turn a local task into a standards cleanup.

Document non-obvious product rules and cross-layer contracts. Do not require comments or TSDoc for self-explanatory exports.

## Stop Conditions

Only stop when:

- A todo requires user credentials or external account setup.
- A product decision is impossible to infer safely.
- A command needs user approval and cannot proceed.
- The next step crosses an approval gate in `docs/decision-gates.md`.
- The MVP definition of done is satisfied.

Use `docs/decision-gates.md` to decide whether to ask the user or continue.

## Status Update Format

At the end of each cycle, report:

- Completed todo.
- Files changed.
- Checks run.
- Next todo.
- Blockers, if any.

## End Every Work Cycle

Before moving to another autonomous-build todo:

1. Run `tars done`; it performs the routed verification once.
2. Commit the completed slice when the active build loop requires it.
3. Then run `tars next`.

For a user-directed maintenance request, stop after the requested outcome, relevant verification, and integrated report. Do not automatically start another todo.

If the project uses a pre-commit hook, keep it fast and complementary. Do not run the same slow suite in edit hooks, `tars done`, and pre-commit without additional signal.

## Lesson-And-Run Loop

When a durable product decision or reusable lesson emerges:

1. If a decision was made, update `docs/decision-log.md`.
2. If a reusable lesson emerged, update `docs/lessons-and-rules.md`.
3. If the lesson affects execution, update the relevant harness doc.
4. If the same rule appears in multiple projects or survives one vertical slice, mark it as a reusable starter candidate.

Do not write routine task coordination, transient debugging notes, or already-captured rules into durable project memory.
