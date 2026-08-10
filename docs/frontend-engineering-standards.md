# Frontend Engineering Standards

## Goal

Write code that is strong against change, not merely code that works today.

## Senior Standard

Junior code makes the feature work.
Mid-level code makes the feature reusable.
Senior code makes future changes cheap.

## Core Rules

### 1. Single Responsibility Principle

One function, component, or hook should own one reason to change.

Bad:

```ts
const save = async () => {
  validate();
  openConfirmModal();
  await api.save();
  showToast();
  navigate();
};
```

Good:

```ts
validateBeforeSave();
confirmSave();
doSave();
navigateAfterSave();
```

Review questions:

- Does this function do more than one job?
- Does the name contain "and" or imply a chain of unrelated work?
- Are validation, API calls, navigation, and UI feedback mixed together?

### 2. Separation of Concerns

Do not hide business rules inside JSX.

Bad:

```tsx
<Button disabled={plan.status === "approved" && revision.reason === "meal"} />
```

Good:

```tsx
const canRequestPlanAdjustment = checkPlanAdjustmentAvailable(plan, revision);
<Button disabled={!canRequestPlanAdjustment} />;
```

Review questions:

- Is JSX carrying business policy?
- Would a policy change require editing a visual component?

### 3. DRY

Repeated policy means missing domain modeling.

Bad:

```ts
goal.targetWeight < profile.currentWeight;
```

Good:

```ts
isWeightLossGoal(goal, profile);
```

Review questions:

- Is the same condition repeated?
- Would a change require multiple edits?

### 4. Abstraction

Call sites should explain intent, not implementation.

Bad:

```ts
if (reason === "meal" && remainingMeals.length > 0)
```

Good:

```ts
if (shouldAdjustRemainingMeals(adjustmentRequest, todayPlan))
```

Review questions:

- Can a product person understand the condition name?
- Are implementation details leaking into screens?

### 5. Encapsulation

Business rules belong in domain functions.

Bad:

```ts
if (planItem.status !== "completed")
```

Good:

```ts
isPlanItemAdjustable(planItem);
```

Review questions:

- Is a policy scattered across files?
- Is there one place to change it?

### 6. Domain Modeling

Use product language in code.

Preferred terms:

- `Plan`
- `PlanItem`
- `PlanRevision`
- `AdjustmentRequest`
- `AdjustmentReason`
- `DailyCheckIn`
- `TodayPlan`

Avoid vague names:

- `data`
- `item`
- `thing`
- `statusData`
- `handleAction`
- `doStuff`

### 7. Derived State

Do not store values that can be calculated from existing state.

Bad:

```ts
const [isAdjustmentAvailable, setIsAdjustmentAvailable] = useState(false);
```

Good:

```ts
const isAdjustmentAvailable = canAdjustTodayPlan(todayPlan);
```

State is allowed for:

- User input.
- Draft data.
- Server snapshots.
- Expensive computed values with memoization.

### 8. Declarative Programming

Prefer declaring outcomes over pushing state around.

Bad:

```ts
if (completedCount === totalCount) {
  setDone(true);
} else {
  setDone(false);
}
```

Good:

```ts
const isTodayPlanDone = completedCount === totalCount;
```

### 9. Predictable Data Flow

Use one-directional flow:

User action -> validation -> domain logic -> API/AI -> state update -> UI render

Review questions:

- Where can this state change?
- Can more than one component mutate the same concept?
- Is a hook hiding navigation, API, and UI side effects together?

### 10. Maintainability

Every implementation should answer:

If product changes this rule tomorrow, where do we edit?

The target is one obvious edit location.

### 11. Composition

Build large behavior by composing small pieces.

Bad:

```tsx
<TodayScreen />
```

where one file owns loading, plan display, food logging, adjustment, revision approval, analytics, and navigation.

Good:

```tsx
<TodayScreen>
  <TodayPlanSection />
  <AdjustmentEntryPoint />
  <ProgressSummary />
</TodayScreen>
```

Hook composition:

```ts
const todayPlan = useTodayPlan();
const adjustment = usePlanAdjustment();
const analytics = useAnalytics();
```

### 12. Existing Code Reuse And Impact

Before creating a component, hook, utility, modal, drawer, toast, data helper, or interaction primitive, search the common layer and the same feature area for an equivalent.

- Reuse the common primitive when the interaction class matches.
- Preserve its behavioral contract: focus, scroll lock, z-index, swipe/close behavior, safe area, loading, and accessibility.
- Create a local implementation only when the shared primitive cannot support the requirement without becoming less coherent.
- When changing a shared primitive, policy helper, schema, or store, search all direct consumers and verify the affected states. A local fix is incomplete if another consumer now behaves differently.

Review questions:

- Did I search before creating this?
- Which consumers can observe this change?
- Did I verify close/reopen, loading/error, responsive, and persisted/reread behavior where applicable?

### 13. TSDoc and Flow Comments

Code should explain the product flow well enough that a future developer can understand why the function exists before reading every line.

Use TSDoc where ownership, product policy, boundary assumptions, or fallback behavior is not obvious from the name and type.

Required:

- Every domain or policy function should explain the product rule it protects.
- Every AI or API boundary should document input assumptions, output guarantees, and fallback behavior.
- Non-obvious hooks and persistence helpers should document ownership and side effects.

Avoid:

- Comments that repeat implementation.
- Comments that explain obvious syntax.
- Stale comments that describe an old flow.
- Long essays inside functions.

Bad:

```ts
// Sets the status.
export function updateStatus(status: PlanItemStatus) {
  return status;
}
```

Good:

```ts
/**
 * Applies a user's visible Today-plan status change to the current item list.
 *
 * This helper keeps status transitions local to the Today flow; persistence and
 * analytics stay with the caller so the UI can decide when the change becomes durable.
 */
export function updateTodayPlanItemStatus(
  planItems: AiPlanItem[],
  planItemId: string,
  status: PlanItemStatus,
) {
  // ...
}
```

For complex functions, use one short flow comment before the branch that would otherwise be hard to scan:

```ts
// Keep AI-generated revisions reviewable: they are persisted only after user approval.
if (response.type === "plan_revision_suggestion") {
  await persistPlanRevision(response.revision);
}
```

Review questions:

- Can a new contributor find the policy or boundary without reading unrelated files?
- Does the comment explain intent, ownership, or product rule?
- Would the comment still be true after a likely product change?
- Is a complex branch missing a short flow comment?

## Project File Rules

Use this default structure:

```txt
apps/mobile/src/
  app/
  features/
    onboarding/
    plan/
    today/
    adjustment/
    progress/
  shared/
    ui/
    hooks/
    lib/
packages/
  core/
    domain/
    analytics/
  ai/
  db/
```

## Review Checklist

Before a change is accepted:

- Is business logic outside JSX?
- Are domain rules named?
- Are repeated conditions centralized?
- Is derived state avoided?
- Are hooks focused?
- Are components small enough to change safely?
- Do non-obvious domain and boundary APIs have useful TSDoc?
- Were existing primitives searched and affected consumers checked?
- Do complex branches include short flow comments where they clarify intent?
- Are analytics events emitted near user actions, not scattered randomly?
- Can a future product change be made in one obvious place?
