# Re-Entry Protocol

## Purpose

Use this when resuming after a context reset, moving between machines, returning after a break, or continuing a long-running TARS loop.

Do not restart from scratch. Reconstruct state from files.

## Steps

1. Run `git status --short` and inspect the current diff.
2. Reconstruct the latest explicit or in-progress user request.
3. Run `tars doctor` and read `docs/work-routing.md`.
4. Classify the request, then read only the task-relevant workflow:
   - New MVP or feature expansion: `docs/mvp-execution-harness.md`
   - Maintenance or correction: `.codex/skills/tars-maintenance/SKILL.md` and `docs/maintenance-workflow.md`
   - Planning, design, architecture, large implementation, or ambiguous todo: `.codex/skills/tars-deep-thinking/SKILL.md` and `docs/deep-thinking-workflow.md`
   - Research or product intent: `docs/wiki/schema.md` and `docs/wiki/index.md`
5. Run `tars next` only when there is no explicit or in-progress work and an autonomous build loop is intended.
6. Continue the explicit or in-progress work. Ask the user only when a decision gate remains.

## Re-Entry Report

When resuming, briefly report:

- Current branch.
- Dirty or clean worktree.
- Explicit or in-progress request; next todo only for an autonomous loop.
- Which workflow applies.
- Any blocker or decision gate.
