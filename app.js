const addTask = (title, priority = 'low', dueDate = 'N/A') => {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `<span contenteditable='true'>${title}</span> <span class="priority" data-priority="${priority}"><span class="dot ${priority}"></span></span> <span class="due-date" contenteditable='true'>Due: ${dueDate}</span> <button class="delete-btn">X</button>`;
    if (dueDate !== 'N/A' && new Date(dueDate) < new Date()) {
        task.style.border = '2px solid red';
    }
    task.draggable = true;
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragend', handleDragEnd);
    task.querySelector('.delete-btn').addEventListener('click', () => task.remove());
    document.querySelector('.task-list').appendChild(task);
    saveTasks();
};

const exportTasksToCSV = () => {
    const tasks = Array.from(document.querySelectorAll('.task'));
    const csvRows = ['Title,Priority,Due Date'];
    tasks.forEach(task => {
        const title = task.querySelector('span[contenteditable=true]').innerText;
        const priority = task.querySelector('.priority').dataset.priority;
        const dueDate = task.querySelector('.due-date').innerText.replace('Due: ', '');
        csvRows.push(`${title},${priority},${dueDate}`);
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
};

document.getElementById('export-btn').addEventListener('click', exportTasksToCSV);