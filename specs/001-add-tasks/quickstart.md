# Quickstart: Validate Add Tasks

## Prerequisites

- The feature implementation is present in the root `index.html`, `styles.css`, and `app.js` files.
- A current desktop or mobile browser is available. No package installation, backend, or database
  is required.

## Run

From the repository root on macOS, open the page in the default browser:

```sh
open index.html
```

Alternatively, open `index.html` directly in a browser. The page should load without a server.

## Browser Checks

1. Enter `Buy milk` and choose Add. Expected: exactly one `Buy milk` item appears within one
   second; the page does not reload and the input clears.
2. Repeat the valid submission 10 times using distinct descriptions. Expected: each appears once,
   in submission order, with no refresh.
3. Submit an empty field. Expected: no item is added and a description-required error is
   announced.
4. Submit spaces and tabs as separate values. In a browser test, also set a line-break-only value
   on the input and submit it. Expected: each is rejected, the existing list stays unchanged, and
   an error is announced.
5. After a rejected submission, enter `Call home` and submit. Expected: the task is added normally.
6. Enter `  Read a book  ` and submit. Expected: the list shows `Read a book` without surrounding
   whitespace.
7. Enter `<b>literal text</b>` and submit. Expected: the characters appear as task text and are
   not interpreted as formatting or markup.
8. Use the keyboard to focus the input and press Enter. Expected: submission matches clicking Add.
9. Use a screen reader or browser accessibility inspection. Expected: the input has an associated
   label, and validation and success feedback are exposed as status messages.
10. Reload the page. Expected: tasks are gone; persistence is not part of this feature.
