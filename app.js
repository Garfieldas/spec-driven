const tasks = [];

const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyState = document.getElementById("empty-state");
const taskForm = document.getElementById("task-form");
const taskDescription = document.getElementById("task-description");
const taskError = document.getElementById("task-error");
const taskStatus = document.getElementById("task-status");

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

  tasks.push({ description });
  renderTasks();

  taskError.textContent = "";
  taskError.hidden = true;
  taskDescription.removeAttribute("aria-invalid");
  taskDescription.value = "";
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

renderTasks();
