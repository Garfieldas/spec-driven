# Task List

A small browser-based to-do list for keeping track of tasks in the current page session.

## Run

Open `index.html` in a current web browser. The app is static and does not require a server,
package installation, backend, or database.

## Add Tasks

Enter a description and choose **Add task**. Blank or whitespace-only descriptions are rejected;
accepted descriptions are trimmed and appear immediately in the list.

Tasks are saved in browser storage for the current origin and browser profile. They remain after
reloading or reopening the app in that profile, but are not synchronized to another browser or
device. Clearing the browser's stored site data may remove them.