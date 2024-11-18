// Select the form and tasks container
const taskForm = document.getElementById('new-task-form');
const tasksContainer = document.getElementById('tasks');
let editMode = false;
let taskToEdit = null;

// Function to add or update a task
function addTask(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get task details from form inputs
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;

    // Check if we're in edit mode
    if (editMode) {
        taskToEdit.querySelector('h3').innerText = title;
        taskToEdit.querySelector('.desc').innerText = description;
        taskToEdit.querySelector('.deadline').innerText = `Deadline: ${deadline}`;
        taskToEdit.querySelector('.priority').innerText = `Priority: ${priority}`;

        // Reset edit mode
        editMode = false;
        taskToEdit = null;
        taskForm.reset();
    } else {
        // Create a task element
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${title}</h3>
            <p class="desc">${description}</p>
            <p class="deadline"><strong>Deadline:</strong> ${deadline}</p>
            <p class="priority"><strong>Priority:</strong> ${priority}</p>
            <button class="button1"onclick="editTask(this)">Edit</button>
            <button class="button2" onclick="deleteTask(this)">Delete</button>
        `;

        // Add the new task to the tasks container
        tasksContainer.appendChild(taskElement);

        // Clear the form fields
        taskForm.reset();
    }
}

// Function to edit a task
function editTask(button) {
    taskToEdit = button.parentElement;
    document.getElementById('task-title').value = taskToEdit.querySelector('h3').innerText;
    document.getElementById('task-desc').value = taskToEdit.querySelector('.desc').innerText;
    document.getElementById('task-deadline').value = taskToEdit.querySelector('.deadline').innerText.replace('Deadline: ', '');
    document.getElementById('task-priority').value = taskToEdit.querySelector('.priority').innerText.replace('Priority: ', '');
    editMode = true;
}

// Function to delete a task
function deleteTask(button) {
    button.parentElement.remove();
}

// Add an event listener to the form to handle submission
taskForm.addEventListener('submit', addTask);