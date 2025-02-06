document.addEventListener('DOMContentLoaded', function() {
    const ftList = document.getElementById('ft_list');
    const newTaskButton = document.getElementById('newTaskButton');

    function loadTasks() {
        const tasks = getCookie('tasks');
        if (tasks) {
            ftList.innerHTML = tasks;
        }
    }

    function saveTasks() {
        const tasks = ftList.innerHTML;
        setCookie('tasks', tasks, 7);
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
        console.log(document.cookie = name + "=" + value + ";" + expires + ";path=/")
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
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