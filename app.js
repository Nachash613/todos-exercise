// Get references to HTML elements
const taskList = document.getElementById('taskList');
const newTaskForm = document.getElementById('newTaskForm');

// Load tasks from localStorage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks on the screen
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <button class="remove-btn" data-index="${index}">${task.text}</button>
        `;
        taskList.appendChild(li);
    });

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask(text) {
    tasks.push({ text, completed: false });
    renderTasks();
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Event listener for form submission
newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        taskInput.focus();
    }
});

// Event delegation for task completion and removal
taskList.addEventListener('click', (event) => {
    let clickedListItem = event.target;
    if (!clickedListItem.isCompleted) {
        clickedListItem.style.textDecoration = "line-through";
        clickedListItem.isCompleted = true;
    } else if (event.target.matches('.remove-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        removeTask(index);
    }
});

// Initial rendering of tasks
renderTasks();
