const addTask = (title) => {
    const task = document.createElement('div');
    task.className = 'task';
    task.textContent = title;
    document.querySelector('.column .task-list').appendChild(task);
};

// Example usage
addTask('New Task 1');
addTask('New Task 2');