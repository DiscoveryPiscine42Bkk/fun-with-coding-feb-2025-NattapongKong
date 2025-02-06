
$(document).ready(function() {
    const ftList = $('#ft_list');
    const newTaskButton = $('#newTaskButton');

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + ((expires==null) ? "" : ";expires=" + expires.toGMTString())
    }

    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return "";
    }

    function saveTasks() {
        setCookie('tasks', ftList.html(), 7);
    }

    function loadTasks() {
        const tasks = getCookie('tasks');
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

    loadTasks();

    newTaskButton.on('click', function() {
        const taskText = prompt("Enter a new task:");
        if (taskText) {
            const newTask = $('<div></div>').text(taskText);
            newTask.on('click', function() {
                if (confirm("Do you want to delete this task?")) {
                    $(this).remove();
                    saveTasks();
                }
            });
            ftList.prepend(newTask);
            saveTasks();
        }
    });
});