# Work Routing And Collaboration

## Purpose

Route each request to the smallest responsible team. Do not load every project rule or summon every specialist for every task.

The orchestrator owns the user outcome from intake through integration. Specialists own bounded parts of the work; they do not independently redefine the request or declare the whole task complete.

## Routing Order

Classify the request before selecting files, skills, or agents.

1. **Action**: answer, explore, diagnose, change, review, operate, or release.
2. **Domain**: product, design, frontend, data, AI, finance, auth, QA, or operations.
3. **Impact**: local, single-flow, cross-layer, or production-critical.
4. **Uncertainty**: clear, inferable, or decision-required.
5. **Source of truth**: identify which user instruction, design, specification, code, test, or data contract governs the work.

The latest user correction outranks older task assumptions. Safety, privacy, destructive-action, and external-cost gates remain mandatory.

## Work Profiles

Choose one primary profile. Add a risk overlay only when the affected domain requires it.

| Profile | Use for | Default lead | Default verification |
| --- | --- | --- | --- |
| Answer | Explanation or status without edits | Relevant domain lead | Evidence and cited code paths |
| Explore | Ambiguous product, UX, or architecture decisions | Product or design lead | Options, tradeoffs, decision gate |
| Maintain | Existing behavior with a clear desired result | Maintenance lead | Targeted regression and affected flow |
| Build | New vertical product capability | Product/engineering lead | End-to-end slice |
| Review | Bugs, regressions, risks, or release readiness | Independent reviewer | Findings ordered by severity |
| Operate | Migration, deployment, external service, or production action | Operations lead | Preflight, execution evidence, rollback path |

Risk overlays add domain checks without replacing the primary profile:

- **Data**: schema, authorization, idempotency, save and reread.
- **Finance**: amount conservation, partial/over payments, splits, reversals, auditability.
- **AI**: batching, token cost, cache scope, invalidation, fallback, reproducibility, audit trail.
- **Auth**: ownership, role resolution, RLS, privilege transitions.
- **Shared UI**: all consumers, responsive states, accessibility, close/reopen behavior.

## Team Shape

Assign roles, not personas for show.

- **Orchestrator**: owns intake, routing, source-of-truth resolution, integration, final verification, and user communication.
- **Lead**: makes the domain decision and defines the bounded work packages. Exactly one lead owns a task.
- **Worker**: implements or investigates one independent package with an explicit write scope.
- **Reviewer**: checks a named risk independently. A reviewer does not redo implementation.

Use no subagent for a narrow task that one agent can complete safely. Add workers only when packages are independent and can proceed in parallel. Add reviewers when the blast radius, irreversibility, money, permissions, shared components, or production exposure justifies an independent check.

Choose the smallest collaboration tier:

| Tier | When | Maximum team beyond the orchestrator |
| --- | --- | --- |
| Direct | Clear, bounded, one dominant domain | Lead only |
| Specialist | One domain investigation materially helps | Lead plus 1 specialist |
| Builder-reviewer | Implementation has a named regression or safety risk | Lead/builder plus 1 reviewer |
| Parallel | At least two independent packages with disjoint files | Lead plus at most 2 workers; add 1 reviewer only after integration when justified |

Risk overlays are checklists, not automatic headcount. One lead or worker may own multiple related overlays. Do not exceed three active subagents; use fewer by default. If more roles appear necessary, sequence them or split the user task into explicit stages instead of creating a large concurrent team.

## Role Routing

| Trigger | Lead | Optional workers | Reviewer gate | Read only when selected |
| --- | --- | --- | --- | --- |
| Scope, flow, priority, product conflict | Product | Design, analytics | Decision reviewer | `mvp-execution-harness.md`, `g-stack.md`, `decision-gates.md` |
| UX, layout, copy, interaction, responsive behavior | Design | Frontend | Visual QA | Approved design source, `design-system-spec.md`, relevant design reference |
| Component, state, form, performance | Frontend | Data/API | Frontend reviewer for shared surfaces | `frontend-engineering-standards.md` |
| Schema, query, RLS, migration, persistence | Data | Frontend | Data safety reviewer | Schema/migrations, relevant data contract |
| Prompt, classification, extraction, model call | AI | Data, domain specialist | AI cost/quality reviewer | `ai-contracts.md`, fixtures, provider contract |
| Money, dues, allocation, settlement | Finance/domain | Data | Accounting invariant reviewer | Product rules, schema, audit requirements |
| Login, ownership, roles, permissions | Auth/data | Frontend | Security reviewer | Auth contract, RLS policies |
| Test failure, regression, release | QA/release | Relevant domain worker | Release gate | `qa-checklist.md`, affected contracts |

Do not create a permanent role skill for every row in this table. The orchestrator injects the selected role, scope, references, and acceptance criteria into a temporary worker assignment.

## Collaboration Contract

Before delegating, the orchestrator creates a compact task brief:

```text
Outcome:
Source of truth:
Current evidence:
Assigned role:
Scope and allowed files:
Must preserve:
Acceptance checks:
Known dependencies:
```

Every worker returns:

```text
Result:
Evidence or files changed:
Checks run:
Assumptions:
Unresolved risks or dependencies:
```

Collaboration rules:

1. Give workers disjoint write scopes. Never let two workers edit the same file concurrently.
2. Keep the critical-path task with the orchestrator when the next decision depends on it.
3. Parallelize independent evidence gathering, isolated implementation packages, and bounded review.
4. Share conclusions through the task brief and handoff, not by loading every agent's full conversation.
5. Resolve conflicts by source-of-truth precedence, then product intent, then evidence. Ask the user when a visible or irreversible decision remains.
6. The orchestrator reviews all worker output against the original request and the complete affected flow.
7. A worker saying its package is complete never means the user task is complete.
8. Run review after the implementation packages converge unless a read-only investigation can safely proceed in parallel.

## Impact And Integration

For local presentation-only changes, inspect the edited surface and its direct consumers.

For stateful or cross-layer work, trace only the applicable path:

```text
input -> parse/transform -> state -> UI summary/detail -> user correction
      -> API/save -> database/policy -> reread -> retry/duplicate/cache
      -> downstream consumers -> audit/observability
```

Mark each applicable node as changed, verified unchanged, or not checked. Do not manufacture checks for nodes that do not exist in the feature.

Integration is complete only when:

- Worker outputs agree with the governing source of truth.
- Cross-package contracts match.
- Relevant impact-path checks pass.
- Conflicts, skipped checks, and residual risk are reported.
- The user receives one integrated result from the orchestrator.

## Anti-Patterns

- Loading all project documents before classifying the request.
- Summoning product, design, engineering, and QA for a local text or style change.
- Using multiple agents as a substitute for understanding the current code.
- Delegating overlapping file edits.
- Letting a specialist change product direction outside its assignment.
- Running the same verification in edit hooks, workers, reviewers, and finalization without added signal.
- Automatically advancing to another todo after completing a user-directed maintenance request.
