const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

let tasks = [];

app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter(task => task.id != id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


function addTask(task) {
    const newTask = {
      id: Date.now(),
      task: task,
      completed: false
    };
    
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then(data => {
      tasks.push(data);
      renderTasks();
    });
  }

  
  function deleteTask(e) {
    const taskId = e.target.closest('li').dataset.id;
    
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(() => {
      tasks = tasks.filter(task => task.id != taskId);
      renderTasks();
    });
  }
  