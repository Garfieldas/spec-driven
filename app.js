const STORAGE_KEY = "todo-app.tasks.v1";
const tasks = [];

function isValidStoredTask(task) {
  return (
    task !== null &&
    typeof task === "object" &&
    !Array.isArray(task) &&
    typeof task.description === "string" &&
    task.description.trim().length > 0
  );
}

function readSavedTasks() {
  const serializedTasks = localStorage.getItem(STORAGE_KEY);
  if (serializedTasks === null) {
    return [];
  }

  const savedTasks = JSON.parse(serializedTasks);
  if (!Array.isArray(savedTasks) || !savedTasks.every(isValidStoredTask)) {
    throw new Error("Saved task data is invalid.");
  }

  return savedTasks.map((task) => ({
    description: task.description.trim(),
  }));
}

const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyState = document.getElementById("empty-state");
const taskForm = document.getElementById("task-form");
const taskDescription = document.getElementById("task-description");
const taskError = document.getElementById("task-error");
const taskStatus = document.getElementById("task-status");
const storageError = document.getElementById("storage-error");

function renderTasks() {
  const items = document.createDocumentFragment();

  for (const task of tasks) {
    const item = document.createElement("li");
    item.className = "task-item";
    item.textContent = task.description;
    items.append(item);
  }

  taskList.replaceChildren(items);
  taskCount.textContent = String(tasks.length);
  taskCount.setAttribute(
    "aria-label",
    `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`
  );
  emptyState.hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const description = taskDescription.value.trim();
  if (!description) {
    taskError.textContent = "Please enter a task description.";
    taskError.hidden = false;
    taskDescription.setAttribute("aria-invalid", "true");
    taskStatus.textContent = "";
    taskDescription.focus();
    return;
  }

  const candidateTasks = [...tasks, { description }];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidateTasks));
  } catch {
    storageError.textContent = "This task could not be saved. Please try again.";
    storageError.hidden = false;
    taskStatus.textContent = "";
    return;
  }

  tasks.push({ description });
  renderTasks();

  taskError.textContent = "";
  taskError.hidden = true;
  taskDescription.removeAttribute("aria-invalid");
  taskDescription.value = "";
  storageError.textContent = "";
  storageError.hidden = true;
  taskStatus.textContent = `Task added: ${description}. ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} total.`;
});

taskDescription.addEventListener("input", () => {
  if (!taskDescription.value.trim()) {
    return;
  }

  taskError.textContent = "";
  taskError.hidden = true;
  taskDescription.removeAttribute("aria-invalid");
});

try {
  tasks.push(...readSavedTasks());
} catch {
  storageError.textContent = "Saved tasks could not be restored. The saved data was left unchanged.";
  storageError.hidden = false;
}

renderTasks();
