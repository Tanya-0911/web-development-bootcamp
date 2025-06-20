const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filters = document.querySelectorAll('.filter');

let tasks = [];

addBtn.addEventListener('click', addTask);
filters.forEach(btn => btn.addEventListener('click', filterTasks));

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;
  const task = { text, completed: false };
  tasks.push(task);
  taskInput.value = '';
  renderTasks();
}

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete">Delete</button>
      </div>
    `;

    li.querySelector('.complete').addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks(getActiveFilter());
    });

    li.querySelector('.delete').addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks(getActiveFilter());
    });

    taskList.appendChild(li);
  });
}

function filterTasks(e) {
  filters.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  renderTasks(e.target.dataset.filter);
}

function getActiveFilter() {
  const active = document.querySelector('.filter.active');
  return active ? active.dataset.filter : 'all';
}

renderTasks();
