---
name: tars-orchestrator
description: Route incoming TARS project requests to the smallest responsible lead, workers, and reviewers, then integrate their results. Use for cross-domain changes, ambiguous ownership, tasks that may benefit from subagents, or any request where product, design, frontend, data, AI, finance, auth, QA, or operations rules must be selected without loading the entire harness.
---

# TARS Orchestrator

Read `docs/work-routing.md` before assigning work. Treat it as the routing and collaboration source of truth.

## Intake

Classify the request by action, domain, impact, uncertainty, and governing source of truth. Respect the latest user correction and preserve unrelated working-tree changes.

Choose one primary work profile and one lead. Add domain risk overlays only when applicable.

## Team Selection

Keep narrow work local. Use subagents only when independent packages can materially shorten or strengthen the work.

- Assign exactly one lead.
- Give each worker a bounded outcome and disjoint write scope.
- Add a reviewer for money, permissions, destructive operations, production releases, shared components, or other high-impact risks.
- Keep critical-path investigation and final integration with the orchestrator.
- Do not create permanent agents for roles that can be expressed in a task-local assignment.
- Treat risk overlays as checks, not automatic agents. Combine related responsibilities under one lead or worker.
- Use at most two parallel workers. Add one reviewer after integration only when a named risk justifies it.

When subagent tools are unavailable, execute the selected roles sequentially while preserving the same ownership boundaries.

## Collaboration

Send each worker the compact task brief from `docs/work-routing.md`. Require the standard result handoff. Pass only task-relevant context and raw evidence; do not copy the entire conversation into every worker.

Review worker outputs for contract mismatches, overlapping assumptions, and missing downstream effects. Resolve conflicts using the governing source of truth or ask the user when a product-visible or irreversible decision remains.

## Integration

For stateful or cross-layer work, trace the applicable impact path from input through persistence, reread, retries, downstream consumers, and auditability. Mark irrelevant nodes as not applicable rather than inventing work.

Run verification once at the narrowest layer that provides the required evidence. Avoid duplicate checks that add no signal.

Only the orchestrator reports completion. Include the integrated outcome, changed scope, checks run, skipped checks, and residual risk.
