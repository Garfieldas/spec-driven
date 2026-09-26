# Data Model: Add Tasks

## Task

A task is one item submitted by the user and displayed in the current page's task list.

| Field | Type | Rules |
|---|---|---|
| `description` | String | Trim surrounding whitespace; must contain at least one non-whitespace character. |

## Collection and Relationships

- The page owns an in-memory ordered array of tasks, initially empty for this feature.
- Each accepted submission appends one task to the end of the array and one corresponding list
  item to the visible task list.
- Duplicate descriptions are distinct accepted tasks; uniqueness is not required.
- There are no relationships to users or other records.

## State and Validation

- Rejected input creates no task and leaves the array and list unchanged.
- Accepted input is normalized before storage and display.
- Task state exists only while the page is open. Reloading or closing the page clears it.
- IDs and edit/delete/completion states are omitted because no current behavior requires them.
