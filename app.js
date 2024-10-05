document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM se cargue completamente
    const taskList = document.getElementById('task-list'); // Obtiene la lista de tareas
    const addTaskBtn = document.getElementById('add-task-btn'); // Obtiene el botón de agregar tarea
    const newTaskInput = document.getElementById('new-task'); // Obtiene el campo de entrada para nueva tarea
    const errorMessage = document.getElementById('error-message'); // Obtiene el mensaje de error

    // Cargar tareas guardadas en localStorage al cargar la página
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Carga tareas o inicializa como vacío

    // Mostrar las tareas en la lista
    const renderTasks = () => {
        taskList.innerHTML = ''; // Limpia la lista actual
        tasks.forEach((taskObj, index) => {
            const li = document.createElement('li'); // Crea un nuevo elemento de lista

            const taskText = document.createElement('span'); // Crea el texto de la tarea
            taskText.textContent = taskObj.task; // Asigna el texto de la tarea
            taskText.classList.add('task-text'); // Añade clase para estilos
            if (taskObj.completed) { // Comprueba si la tarea está completada
                li.classList.add('completed'); // Añade clase para tareas completadas
            }

            // Botón de eliminar
            const deleteBtn = document.createElement('button'); // Crea botón de eliminar
            deleteBtn.textContent = 'Eliminar'; // Asigna texto al botón
            deleteBtn.addEventListener('click', (e) => { // Maneja el evento de clic
                e.stopPropagation(); // Previene la propagación del evento
                deleteTask(index); // Elimina la tarea
            });

            // Botón de completar
            const completeBtn = document.createElement('button'); // Crea botón de completar
            completeBtn.textContent = '✔'; // Asigna icono de completar
            completeBtn.classList.add('complete-btn'); // Añade clase para estilos
            completeBtn.addEventListener('click', (e) => { // Maneja el evento de clic
                e.stopPropagation(); // Previene la propagación del evento
                toggleTaskCompleted(index); // Cambia el estado de la tarea
            });

            // Agrega elementos a la lista
            li.appendChild(taskText); 
            li.appendChild(deleteBtn);
            li.appendChild(completeBtn);
            taskList.appendChild(li); // Agrega el elemento a la lista de tareas
        });
    };

    // Agregar tarea a la lista
    const addTask = () => {
        const task = newTaskInput.value.trim(); // Obtiene el valor del input
        if (task === '') { // Verifica si la tarea está vacía
            errorMessage.textContent = 'No puedes agregar una tarea vacía.'; // Muestra mensaje de error
            return;
        }
        errorMessage.textContent = ''; // Limpiar el mensaje de error si la entrada es válida

        tasks.push({ task: task, completed: false }); // Añade la nueva tarea
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Guarda en localStorage
        newTaskInput.value = ''; // Limpia el campo de entrada
        renderTasks(); // Renderiza la lista actualizada
    };

    // Eliminar tarea de la lista
    const deleteTask = (index) => {
        tasks.splice(index, 1); // Elimina la tarea por índice
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Guarda en localStorage
        renderTasks(); // Renderiza la lista actualizada
    };

    // Marcar tarea como completada o no completada
    const toggleTaskCompleted = (index) => {
        tasks[index].completed = !tasks[index].completed; // Cambia el estado de completado
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Guarda en localStorage
        renderTasks(); // Renderiza la lista actualizada
    };

    // Manejo del botón de agregar tarea
    addTaskBtn.addEventListener('click', addTask); // Añade el evento de clic al botón

    // Renderizar tareas al cargar la página
    renderTasks(); // Renderiza tareas guardadas
});
