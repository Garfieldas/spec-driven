# Research: Save Tasks

## Decision: Use browser `localStorage` on a stable origin

**Decision**: Persist the task list with the browser's origin-scoped `localStorage`; run the app under a stable HTTP or HTTPS origin for reliable behavior.

**Rationale**: The feature requires tasks to survive reloads and browser restarts without accounts or a backend. The existing app is a static HTML/CSS/JavaScript application, and browser-native storage meets that scope without adding dependencies. The `file:` scheme is not a dependable origin for this behavior: browser handling is undefined and may vary.

**Alternatives considered**: In-memory state does not survive a reload. A server-side database or account-based sync is outside the feature's local-only scope. Direct file opening is convenient but does not provide a defined cross-browser storage guarantee.

## Decision: Store an ordered JSON array of description records

**Decision**: Store records shaped as `{ "description": "..." }` in a single JSON array under the namespaced key `todo-app.tasks.v1`.

**Rationale**: This matches the current task model, preserves insertion order, and naturally permits duplicate descriptions. No ID, timestamp, or completion field is needed while editing, deleting, completion, and reordering are out of scope.

**Alternatives considered**: Parallel arrays or a separate key per task would add synchronization and ordering concerns. An expanded record with IDs and timestamps would add fields without a current user-visible use.

## Decision: Validate the entire stored list and retain unreadable data

**Decision**: Treat a missing key as an empty list. For an existing key, parse the JSON and require an array whose every item has a string `description` that remains non-empty after trimming. If access, parsing, or validation fails, report restoration failure, keep the application usable with an empty in-memory list, and leave the stored value untouched.

**Rationale**: Partial recovery could silently hide tasks or change order. Leaving malformed data untouched avoids destructive automatic recovery and makes the failure explicit.

**Alternatives considered**: Silently filtering invalid items can conceal data loss. Replacing unreadable data with an empty list destroys the original content.

## Decision: Persist before updating the visible task list

**Decision**: Validate the submitted description, serialize a candidate list, and write it before mutating task state, clearing the field, rendering, or announcing success. Catch storage access and write failures.

**Rationale**: A failed write must not look like a successful add. Keeping the submitted description available lets the user retry while the list remains consistent with saved data.

**Alternatives considered**: Updating the UI first can leave an apparently accepted task that disappears on reload. A separate persistence service or transaction abstraction is unnecessary for one local key.

## References

- [MDN: `Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) documents origin scoping, persistence across browser sessions, access exceptions, and undefined behavior for `file:` URLs.
- Project constitution: `.specify/memory/constitution.md` requires HTML, CSS, and JavaScript and favors minimal dependencies.
- Existing task shape and submit behavior: `app.js`.