const taskInput = document.getElementById('taskInput');
const dueDate = document.getElementById('dueDate');
const priority = document.getElementById('priority');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filters = document.querySelectorAll('.filter');
const darkToggle = document.getElementById('darkToggle');

let tasks = [];

addBtn.addEventListener('click', addTask);
filters.forEach(btn => btn.addEventListener('click', filterTasks));
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

function addTask() {
  const text = taskInput.value.trim();
  const date = dueDate.value;
  const level = priority.value;

  if (text === '') return;

  const task = {
    text,
    due: date,
    priority: level,
    completed: false
  };

  tasks.push(task);
  taskInput.value = '';
  dueDate.value = '';
  priority.value = 'Medium';
  renderTasks(getActiveFilter());
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

    const taskText = document.createElement('div');
    taskText.innerHTML = `<span>${task.text}</span>`;

    const taskMeta = document.createElement('div');
    taskMeta.className = 'task-meta';
    taskMeta.innerHTML = `
      ${task.due ? `<span>📅 ${task.due}</span>` : ''}
      <span class="priority ${task.priority}">${task.priority}</span>
    `;

    const actions = document.createElement('div');
    actions.className = 'actions';
    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete';
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';

    completeBtn.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks(getActiveFilter());
    });

    deleteBtn.addEventListener('click', () => {
      li.classList.add('fade-out');
      setTimeout(() => {
        tasks.splice(index, 1);
        renderTasks(getActiveFilter());
      }, 500);
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(taskMeta);
    li.appendChild(actions);

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
