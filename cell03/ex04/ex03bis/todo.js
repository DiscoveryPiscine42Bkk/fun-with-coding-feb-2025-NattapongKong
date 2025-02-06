$(document).ready(function() {
    const ftList = $('#ft_list');
    const newTaskButton = $('#newTaskButton');

    function loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            ftList.html(tasks);
            ftList.children().each(function() {
                $(this).on('click', function() {
                    if (confirm("Do you want to delete this task?")) {
                        $(this).remove();
                        saveTasks();
                    }
                });
            });
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', ftList.html());
    }

    newTaskButton.on('click', function() {
        const task = prompt("Enter a new task:");
        if (task) {
            const taskDiv = $('<div></div>').text(task);
            taskDiv.on('click', function() {
                if (confirm("Do you want to delete this task?")) {
                    $(this).remove();
                    saveTasks();
                }
            });
            ftList.prepend(taskDiv);
            saveTasks();
        }
    });

    loadTasks();
});
