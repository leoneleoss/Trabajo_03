document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const errorMessage = document.getElementById('error-message');

    // Cargar tareas guardadas en localStorage al cargar la página
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Mostrar las tareas en la lista
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((taskObj, index) => {
            const li = document.createElement('li');

            const taskText = document.createElement('span');
            taskText.textContent = taskObj.task;
            taskText.classList.add('task-text');
            if (taskObj.completed) {
                li.classList.add('completed');
            }

            // Botón de eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(index);
            });

            // Botón de completar
            const completeBtn = document.createElement('button');
            completeBtn.textContent = '✔';
            completeBtn.classList.add('complete-btn');
            completeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleTaskCompleted(index);
            });

            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            li.appendChild(completeBtn);
            taskList.appendChild(li);
        });
    };

    // Agregar tarea a la lista
    const addTask = () => {
        const task = newTaskInput.value.trim();
        if (task === '') {
            errorMessage.textContent = 'No puedes agregar una tarea vacía.';
            return;
        }
        errorMessage.textContent = ''; // Limpiar el mensaje de error si la entrada es válida

        tasks.push({ task: task, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        newTaskInput.value = '';
        renderTasks();
    };

    // Eliminar tarea de la lista
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Marcar tarea como completada o no completada
    const toggleTaskCompleted = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Manejo del botón de agregar tarea
    addTaskBtn.addEventListener('click', addTask);

    // Renderizar tareas al cargar la página
    renderTasks();
});
