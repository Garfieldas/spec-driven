# Quickstart: Validate Save Tasks

## Prerequisites

- The implementation is present in root `index.html`, `styles.css`, and `app.js`.
- A current desktop or mobile browser is available.
- Open the app under a stable HTTP or HTTPS origin. Do not rely on direct `file://` behavior for persistence; browser behavior for that scheme is undefined.

## Run

From the repository root, start a simple static server:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. No package installation, backend, or database is required.

## Browser Checks

1. Start with a clean task list by opening the browser developer console and running `localStorage.removeItem("todo-app.tasks.v1")`, then reload. Expected: the empty state is shown.
2. Add `Buy milk`. Expected: one task appears immediately, the input clears, and a success message is announced.
3. Reload the page. Expected: `Buy milk` is restored in the list.
4. Add `Call home`, then reload. Expected: both tasks are restored in their original order.
5. Add a second `Buy milk`. Expected: both identical descriptions remain as separate tasks, in submission order, after reload.
6. Submit an empty or whitespace-only description. Expected: an accessible description-required message appears; the list and saved tasks remain unchanged.
7. Add `  Read a book  `. Expected: the task is shown and restored as `Read a book`, without surrounding whitespace.
8. To check malformed saved data, run `localStorage.setItem("todo-app.tasks.v1", "{invalid"); location.reload()` in the developer console. Expected: the page remains usable, reports that saved tasks could not be restored, and does not silently replace the unreadable value.
9. To check a write failure, in the console run `Storage.prototype.setItem = function () { throw new DOMException("Blocked", "QuotaExceededError"); };`, then try to add a task. Expected: the list is unchanged, the input retains the description, and an accessible not-saved error appears. Reload the page to restore the browser's normal method behavior.
10. Close and reopen the app at the same URL and browser profile. Expected: successfully saved tasks remain present. A different origin or browser profile does not share this list.

## References

- Storage shape and validation rules: [data-model.md](data-model.md)
- User-visible behavior: [contracts/ui.md](contracts/ui.md)