# Starter Acceptance

## Purpose

Use this checklist when changing TARS itself or copying the starter kit into a new service.

It is a lightweight validation layer, not a report template.

## Acceptance Layers

### 1. Structure

- `tars` exists and is executable.
- Required `docs/` files exist.
- `.codex/skills/tars-orchestrator/SKILL.md` exists.
- `.codex/skills/tars-maintenance/SKILL.md` exists.
- `.codex/skills/tars-deep-thinking/SKILL.md` exists.
- `docs/work-routing.md` exists.
- `docs/deep-thinking-workflow.md` exists.
- `docs/inbox/` and `docs/wiki/` exist.
- `docs/wiki/schema.md` and `docs/wiki/index.md` exist.
- Impeccable and other domain aids remain optional and are not core acceptance dependencies.
- `scripts/test-tars.py` exists and exercises routing and dynamic verification behavior.

### 2. Smoke

- `tars --help` prints successfully.
- `tars doctor` passes.
- `tars next` handles both open and empty todo states.
- `tars wiki` handles an empty inbox without failing.
- Python compilation of `tars` succeeds.
- TARS behavior tests pass without optional design aids installed.

### 3. Function

- `tars start` produces a new-service prompt.
- `tars maintain` points to the maintenance skill and workflow.
- `tars maintain --hard` points to the operating/release-grade maintenance workflow.
- `tars think` points to the deep thinking skill and workflow.
- `tars loop` briefs open todos and asks for confirmation.
- `tars verify` validates TARS and runs only checks exposed by the current project's `package.json`.
- `typecheck` and `type-check` script names are both supported.
- A project may narrow final checks with `package.json` `tars.verify`; unselected scripts remain available for targeted manual verification.
- The orchestrator selects one lead and the smallest useful team before loading domain references.

### 4. Safety

- `docs/decision-gates.md` requires user approval for account, cost, deployment, sensitive data, external distribution, destructive, or broad-scope decisions.
- Narrow maintenance prioritizes current code, tests, and user request over wiki synthesis.
- Hard maintenance requires broader evidence for production-facing, release, visual parity, or core-flow changes.
- Deep thinking compares options and excludes off-scope work before large or ambiguous implementation.
- Wiki is optional and not read for every task.
- Explicit user work outranks autonomous todo selection.
- Parallel workers have disjoint write scopes and return structured handoffs to one orchestrator.
- Reviewers check named risks and do not duplicate implementation.
- Failed verification blocks completion claims.

## Rule

If a TARS change fails this checklist, fix the harness before using it to drive product work.
