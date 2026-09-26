---
description: "Task list for implementing and validating task persistence"
---

# Tasks: Save Tasks

**Input**: Design documents from `specs/002-save-tasks/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`, and `quickstart.md`

**Testing**: Manual browser tests are included as requested. The project has no automated browser test runner or test dependencies.

**Organization**: Tasks are grouped by user story. P1 implements save-and-restore behavior; P2 verifies later visits and documents the local-only scope.

## Phase 1: Setup

**Purpose**: No project initialization is needed. The existing static application runs from the root `index.html`, `styles.css`, and `app.js` files without dependencies or a build step.

## Phase 2: Foundational

**Purpose**: Add an accessible error surface shared by saved-task loading and saving before implementing either storage path.

- [x] T001 Add a hidden alert with ID `storage-error` using the existing `message message-error` styles in `index.html`

**Checkpoint**: The page has an accessible place to report storage failures; story implementation can begin.

---

## Phase 3: User Story 1 - Keep newly added tasks (Priority: P1) - MVP

**Goal**: Save valid tasks and restore them after a page reload while rejecting invalid descriptions and reporting storage failures.

**Independent Test**: On a stable HTTP origin with no saved task key, add a valid task, reload, and verify it remains. Confirm invalid input is not saved and storage failures are reported without losing the entered description.

### Tests for User Story 1

- [x] T002 [US1] Run the save/reload and failure scenarios in `specs/002-save-tasks/quickstart.md` against the current app and record the expected failing persistence cases in `specs/002-save-tasks/quickstart.md`

### Implementation for User Story 1

- [x] T003 [US1] Parse `todo-app.tasks.v1` as a whole JSON array and validate every record has a non-empty trimmed string description in `app.js`
- [x] T004 [US1] Load validated saved tasks before the initial render and report read or malformed-data failures through `#storage-error` in `app.js`
- [x] T005 [US1] Persist the candidate array before changing task state or clearing the input; on write failure, keep the list and input unchanged and report through `#storage-error` in `app.js`

### Validation for User Story 1

- [x] T006 [US1] Run the valid-add, reload, ordering, duplicate, whitespace, malformed-data, and write-failure scenarios in `specs/002-save-tasks/quickstart.md` and record outcomes there

**Checkpoint**: User Story 1 is complete when valid tasks survive reload, invalid descriptions remain unsaved, and storage failures are announced without a false success.

---

## Parallel Example: User Story 1

No User Story 1 tasks can safely run in parallel: T003, T004, and T005 all modify `app.js` and build on the preceding storage behavior. Complete them in order, then run T006.

---

## Phase 4: User Story 2 - Return to saved tasks (Priority: P2)

**Goal**: Confirm saved tasks remain available on later visits in the same browser profile and are not presented as synchronized elsewhere.

**Independent Test**: Add a task, close and reopen the app at the same origin in the same browser profile, then check that a different browser profile does not show that task.

### Documentation and Validation for User Story 2

- [x] T007 [P] [US2] Update the run instructions and browser-local persistence scope in `README.md`
- [x] T008 [US2] Run the close/reopen and different-profile scenarios in `specs/002-save-tasks/quickstart.md` and record outcomes there

**Checkpoint**: User Story 2 is complete when same-profile return visits restore tasks and the README makes the local-only boundary clear.

---

## Phase 5: Polish & Cross-Cutting Validation

**Purpose**: Verify the complete feature and leave the validation guide consistent with the delivered behavior.

- [x] T009 Run every scenario in `specs/002-save-tasks/quickstart.md` against the completed app and record the final verification results in `specs/002-save-tasks/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No setup tasks; the current static project is already initialized.
- **Foundational (Phase 2)**: T001 creates the alert required by both storage read and write failure handling.
- **User Story 1 (Phase 3)**: Depends on T001. Run T002 before changing persistence code; then complete T003, T004, and T005 in order before T006.
- **User Story 2 (Phase 4)**: Depends on User Story 1 because its return-visit scenario relies on tasks saved by the application. T007 and T008 can proceed in parallel after User Story 1.
- **Polish (Phase 5)**: T009 depends on both user stories and their validation work.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after T001; it does not depend on another user story.
- **User Story 2 (P2)**: Follows User Story 1 because it verifies tasks created and saved through the P1 flow.

### Parallel Opportunities

- No application-code tasks are marked parallel because the persistence and restore changes share `app.js` and must be integrated in sequence.
- After User Story 1 is complete, T007 (`README.md`) and T008 (`quickstart.md`) can run in parallel because they update different files.

## Parallel Example: User Story 2

```text
Task T007: Update browser-local run and persistence scope in README.md
Task T008: Verify same-profile return visits and profile isolation in specs/002-save-tasks/quickstart.md
```

## Implementation Strategy

### MVP First (User Story 1)

1. Complete T001 to provide accessible storage-failure feedback.
2. Run T002 to confirm the persistence behavior is missing before implementation.
3. Complete T003 through T005 to validate, restore, and save task records.
4. Complete T006 and stop to verify the P1 story independently.

### Incremental Delivery

1. Deliver User Story 1 as the MVP: task submission and reload persistence with validation and failure handling.
2. Complete User Story 2 by verifying return visits and documenting that tasks remain local to the browser profile.
3. Complete T009 as the final end-to-end browser validation pass.

## Notes

- Every task has a sequential ID, a checkbox, a story label when inside a user-story phase, and an exact file path.
- `[P]` is used only for the independent README and quickstart work in User Story 2.
- Browser tests use the stable local HTTP origin and failure-injection steps in `quickstart.md`; no test framework or dependency is introduced.