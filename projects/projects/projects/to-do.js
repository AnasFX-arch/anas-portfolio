const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTask);

function addTask() {
  if (taskInput.value.trim() === "") return;

  const li = createTaskElement(taskInput.value);
  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${taskText}</span>
    <button class="deleteBtn">Delete</button>
  `;

  return li;
}

function handleTask(e) {
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.classList.toggle("completed");
    saveTasks();
  }

  if (e.target.classList.contains("deleteBtn")) {
    e.target.parentElement.remove();
    saveTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    const li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}
