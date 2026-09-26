# Data Model: Save Tasks

## Task

One task in the visible list and persisted collection.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `description` | string | Yes | Trim surrounding whitespace before saving; must contain at least one non-whitespace character. Render as text. |

Task order is represented by the record's position in the saved array. Duplicate descriptions are valid separate tasks. No identifier or timestamp is required by the current feature scope.

## Saved Task List

- **Storage key**: `todo-app.tasks.v1`
- **Serialized value**: JSON array of task records, for example:

```json
[
  { "description": "Buy milk" },
  { "description": "Call home" }
]
```

- **Ownership**: The value belongs to the current browser profile and page origin. It is not shared with another browser or device.
- **Empty state**: A missing key represents an empty list. A successfully saved empty list is `[]`.

## Validation and State Transitions

### Add

1. Read the form value and trim surrounding whitespace.
2. If the result is empty, reject it without reading or changing the saved list; show the existing description-required error.
3. Build a candidate array by appending one `{ description }` record to the current list.
4. Serialize and write the candidate array. If access or writing fails, preserve the current list and input, and show an accessible not-saved error.
5. Only after a successful write, adopt the candidate list, render it, clear the input, and announce success.

### Restore

1. Read the key during application initialization. A missing key means no saved tasks.
2. Parse the stored JSON and require an array of records, each with a string description whose trimmed value is non-empty.
3. If the entire payload is valid, normalize descriptions by trimming and render in array order.
4. If access, parsing, or any record's validation fails, do not render a partial list or overwrite the stored value. Start with an empty in-memory list, keep the application usable, and announce restoration failure.

Descriptions are inserted into the document as text. No HTML interpretation is permitted for task data.