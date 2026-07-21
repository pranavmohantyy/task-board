const boards = {
    board1: [],
    board2: []
};

let currentBoard = 'board1';

const addTask = (title, priority = 'low', dueDate = 'N/A') => {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `<span contenteditable='true'>${title}</span> <span class="priority" data-priority="${priority}"><span class="dot ${priority}"></span></span> <span class="due-date" contenteditable='true'>Due: ${dueDate}</span> <button class="delete-btn">X</button>`;
    if (dueDate !== 'N/A' && new Date(dueDate) < new Date()) {
        task.style.border = '2px solid red';
    }
    task.draggable = true;
    task.addEventListener('dragstart', handleDragStart);
    document.querySelector(`.${currentBoard} .task-list`).appendChild(task);
    boards[currentBoard].push({ title, priority, dueDate });
};

const switchBoard = () => {
    const selectedBoard = document.getElementById('board-select').value;
    currentBoard = selectedBoard;
    renderBoard();
};

document.getElementById('board-select').addEventListener('change', switchBoard);

const renderBoard = () => {
    const taskList = document.querySelector(`.${currentBoard} .task-list`);
    taskList.innerHTML = '';
    boards[currentBoard].forEach(taskData => addTask(taskData.title, taskData.priority, taskData.dueDate));
};
