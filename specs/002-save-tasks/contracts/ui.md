# UI Contract: Save Tasks

## Initialization and Restore

- Read saved tasks before the first task-list render.
- If no saved list exists, show the existing empty state.
- If saved records are valid, show them in the order saved, including duplicate descriptions.
- If storage is inaccessible or saved data is malformed, keep the page usable, show no partially restored list, and expose a clear restoration error through an accessible alert.
- Do not automatically replace unreadable stored data with an empty list.

## Accepted Submission

- Trim the entered description and reject it if it is empty after trimming.
- Save the candidate task list before changing the visible list or announcing success.
- After a successful save, append exactly one task, update the task count, clear the input, and announce success through the existing polite status region.
- Render the description as text, not interpreted markup.

## Rejected Submission

- An empty or whitespace-only description adds and saves no task.
- Keep the existing task list unchanged and show the description-required error using the existing input-associated alert.

## Save Failure

- Keep the current list unchanged and retain the entered description for retry.
- Do not announce success or display the task as saved.
- Show an accessible message that explains the task could not be saved.