document.addEventListener('DOMContentLoaded', function() {
    const ftList = document.getElementById('ft_list');
    const newTaskButton = document.getElementById('newTaskButton');

    function loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            ftList.innerHTML = tasks;
            Array.from(ftList.children).forEach(taskDiv => {
                taskDiv.addEventListener('click', function() {
                    if (confirm("Do you want to delete this task?")) {
                        ftList.removeChild(taskDiv);
                        saveTasks();
                    }
                });
            });
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', ftList.innerHTML);
    }

    newTaskButton.addEventListener('click', function() {
        const task = prompt("Enter a new task:");
        if (task) {
            const taskDiv = document.createElement('div');
            taskDiv.textContent = task;
            taskDiv.addEventListener('click', function() {
                if (confirm("Do you want to delete this task?")) {
                    ftList.removeChild(taskDiv);
                    saveTasks();
                }
            });
            ftList.prepend(taskDiv);
            saveTasks();
        }
    });

    loadTasks();
});