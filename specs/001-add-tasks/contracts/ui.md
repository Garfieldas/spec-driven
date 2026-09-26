# UI Contract: Add Tasks

## Task Entry

- Present a visible label associated with a single-line task description input.
- Provide an Add submit button in the same form.
- Submitting by button or Enter follows the same behavior and does not navigate or reload the page.

## Accepted Submission

- Normalize the entered value by trimming surrounding whitespace.
- Add exactly one list item containing the normalized description to the end of the task list.
- Update the list immediately, clear the input, and announce success through a polite status
  message.
- Render the description as text; user-provided content must not be interpreted as HTML.

## Rejected Submission

- Reject an empty or whitespace-only normalized value.
- Do not add a list item or change existing tasks.
- Present a text message explaining that a task description is required, associate it with the
  input, and make the error available to assistive technology.
- Keep the user on the page and allow immediate correction and resubmission.
