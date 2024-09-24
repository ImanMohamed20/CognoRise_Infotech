// Select DOM elements
const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from local storage or initialize empty array

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', renderTasks);

// Add new task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value);
  taskInput.value = ''; // Clear input field after adding
});

// Function to add a new task
function addTask(task) {
  const newTask = {
    id: Date.now(),
    task: task,
    completed: false
  };
  
  tasks.push(newTask);  // Add task to the array
  saveTasksToLocalStorage();  // Save tasks to local storage
  renderTasks();  // Update the task list
}

// Render tasks on the page
function renderTasks() {
  todoList.innerHTML = ''; // Clear current list
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id; // Store task ID in data attribute
    
    li.innerHTML = `
      ${task.task}
      <div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    
    // Add event listeners for editing and deleting
    li.querySelector('.delete-btn').addEventListener('click', deleteTask);
    li.querySelector('.edit-btn').addEventListener('click', editTask);
    
    todoList.appendChild(li);
  });
}

// Save tasks to Local Storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task
function deleteTask(e) {
  const taskId = e.target.closest('li').dataset.id;
  tasks = tasks.filter(task => task.id != taskId);
  saveTasksToLocalStorage();
  renderTasks();
}

// Edit task
function editTask(e) {
  const taskId = e.target.closest('li').dataset.id;
  const task = tasks.find(task => task.id == taskId);
  
  const newTask = prompt('Edit Task:', task.task);
  if (newTask) {
    task.task = newTask;
    saveTasksToLocalStorage();
    renderTasks();
  }
}
function fetchTasks() {
  fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(data => {
      tasks = data;
      renderTasks();
    })
    .catch(error => console.error('Error:', error));
}
