// Select elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks(tasks);

// Add task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText === '') return;
    const task = { id: Date.now(), text: taskText, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks(tasks);
    taskInput.value = '';
});

// Toggle complete or delete task
taskList.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {
        const id = parseInt(e.target.parentElement.dataset.id);
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks(tasks);
    } else if(e.target.classList.contains('task-text')) {
        const id = parseInt(e.target.parentElement.dataset.id);
        tasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
        saveTasks();
        renderTasks(tasks);
    }
});

// Filter tasks
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        renderTasks(tasks, filter);
    });
});

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks(tasksArray, filter='all') {
    taskList.innerHTML = '';
    let filteredTasks = tasksArray;
    if(filter === 'active') filteredTasks = tasksArray.filter(t => !t.completed);
    if(filter === 'completed') filteredTasks = tasksArray.filter(t => t.completed);

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.dataset.id = task.id;
        li.innerHTML = `<span class="task-text">${task.text}</span><button>Delete</button>`;
        taskList.appendChild(li);
    });
}
