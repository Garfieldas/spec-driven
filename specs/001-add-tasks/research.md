# Research: Add Tasks

## Decision: Use browser-native HTML, CSS, and JavaScript

**Rationale**: The constitution requires this stack, and a single form and list do not need a UI
framework or third-party library. A static page is sufficient because the feature has no backend
or persistence requirement.

**Alternatives considered**: A component framework or external form library would add setup and
abstractions without solving a demonstrated need.

## Decision: Submit through a semantic HTML form

**Rationale**: A labeled input and submit button provide familiar browser behavior. Handling the
form's `submit` event supports both clicking Add and pressing Enter; preventing the default
submission keeps the user on the page.

**Alternatives considered**: A click-only handler would not naturally support Enter and would
recreate behavior provided by a native form.

## Decision: Validate and normalize in the submit handler

**Rationale**: Trim the input before checking it because native `required` alone accepts
whitespace-only values. Reject an empty trimmed value without changing task state, give the user
an explicit message, and store/display the trimmed description.

**Alternatives considered**: Native `required` validation alone does not satisfy the whitespace
edge case. A custom validation library is unnecessary for one field.

## Decision: Keep tasks in page memory and render descriptions as text

**Rationale**: An in-memory array meets the current-session scope and avoids an unrequested storage
layer. Render descriptions as text (such as with `textContent`) so HTML-looking user input is not
interpreted as markup.

**Alternatives considered**: Local or remote persistence is outside the spec. Rendering through
`innerHTML` is unsafe for untrusted task descriptions and is not needed.

## Decision: Provide accessible update feedback

**Rationale**: Associate a visible label with the input, identify invalid input in text, and make
validation and success messages available to assistive technology. Do not communicate status with
color alone.

**Alternatives considered**: Silent list updates are insufficient for users who do not perceive
visual changes. No additional accessibility dependency is needed.

## Clarifications

No unresolved questions remain. The feature scope, stack, persistence behavior, and empty-input
handling are specified or bounded by the project constitution.
