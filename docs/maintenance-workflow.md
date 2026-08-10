# Maintenance Workflow

## Purpose

Use this workflow for bug fixes, regressions, refactors, and user-requested corrections after the MVP already exists.

Maintenance work is different from starter work:

- Starter work creates or expands the MVP.
- Maintenance work preserves existing behavior, changes only the requested surface, and proves the fix.

## Required Flow

1. Restate the requested outcome.
2. Read the relevant code, tests, docs, and current git diff.
3. Reproduce or explain the current behavior from evidence.
4. Identify the root cause before editing.
5. Trace the applicable impact path before choosing the fix.
6. Route cross-domain work through `docs/work-routing.md`; keep local work single-agent.
7. Choose the smallest safe fix.
8. Add or update a regression check when practical.
9. Run the relevant checks selected by `tars verify`.
10. Report exactly what changed, what passed, what was not checked, and what risk remains.

## Root Cause Rule

Do not modify code until you can state:

- What is wrong.
- Where it starts.
- Why the requested change fixes that cause.
- What existing behavior must not change.

## Scope Rule

Allowed:

- Local bug fixes.
- Small refactors needed to make the fix clear.
- Regression tests or targeted checks.
- Documentation updates when a reusable lesson emerges.

Not allowed unless the user asks:

- New product direction.
- UI redesign.
- Large architecture rewrite.
- Unrelated cleanup.
- Broad dependency churn.

## Completion Rule

Completion requires evidence:

- `tars verify` passed, or failed checks are reported with cause and next action.
- The final response names changed files and verification.
- Any skipped checks are explicitly listed.

## Impact Rule

For presentation-only changes, check the edited surface and direct consumers.

For stateful or cross-layer changes, trace only the applicable nodes:

`input -> transform -> state -> UI -> correction -> save -> policy -> reread -> retry/duplicate/cache -> downstream consumer -> audit`

Record each applicable node as changed, verified unchanged, or not checked. This is an impact map, not a requirement to create work for every node.
