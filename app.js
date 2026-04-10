let tasks = [];

function addTask() {
    const id = document.getElementById('taskId').value.trim();
    const name = document.getElementById('taskName').value.trim();
    const description = document.getElementById('taskDesc').value.trim();
    const assignedTo = document.getElementById('assignedTo').value.trim();

    if (!id || !name || !description || !assignedTo) {
        alert('All fields are required');
        return;
    }

    if (tasks.some(task => task.id === id)) {
        alert('Task ID must be unique');
        return;
    }

    const task = { id, name, description, assignedTo, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks();
    
    document.getElementById('taskId').value = '';
    document.getElementById('taskName').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('assignedTo').value = '';
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.className = task.completed ? 'completed' : 'incomplete';
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.assignedTo}</td>
            <td>${task.completed ? 'Completed ✅' : 'Incomplete ❌'}</td>
            <td>
                <button class="btn-toggle" onclick="toggleTask('${task.id}')">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="btn-delete" onclick="deleteTask('${task.id}')">Delete</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) tasks = JSON.parse(savedTasks);
    renderTasks();
}

window.onload = loadTasks;
