const addTask = (title, priority = 'low', dueDate = 'N/A') => {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `<span contenteditable='true'>${title}</span> <span class="priority" data-priority="${priority}"><span class="dot ${priority}"></span></span> <span class="due-date" contenteditable='true'>Due: ${dueDate}</span> <button class="delete-btn">X</button>`;
    if (dueDate !== 'N/A' && new Date(dueDate) < new Date()) {
        task.style.border = '2px solid red';
    }
    task.draggable = true;
    task.addEventListener('dragstart', handleDragStart);
    document.querySelector('.task-list').appendChild(task);
    updateTaskCount();
};

const openNewTaskModal = () => {
    document.getElementById('new-task-modal').style.display = 'block';
};

const closeNewTaskModal = () => {
    document.getElementById('new-task-modal').style.display = 'none';
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'n') {
        openNewTaskModal();
    }
});

document.querySelector('.close-btn').addEventListener('click', closeNewTaskModal);

document.getElementById('add-task-btn').addEventListener('click', () => {
    const title = document.getElementById('task-title').value;
    const dueDate = document.getElementById('due-date').value;
    if (title) {
        addTask(title, 'low', dueDate);
        closeNewTaskModal();
        document.getElementById('task-title').value = '';
        document.getElementById('due-date').value = '';
    }
});