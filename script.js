// DOM Elements
const addTaskDiv = document.querySelector(".add-task"),   // Get the element with the class "add-task"
  plusIcon = document.querySelector(".fa-plus"),          // Get the element with the class "fa-plus"
  closeIcon = document.querySelector(".fa-times"),        // Get the element with the class "fa-times"
  taskFormDiv = document.querySelector(".task-form"),     // Get the element with the class "task-form"
  taskForm = document.querySelector("form"),              // Get the first <form> element
  tasksEl = document.querySelector(".tasks"),             // Get the element with the class "tasks"
  totalTask = document.querySelector(".total-task"),      // Get the element with the class "total-task"
  taskDate = document.getElementById("task-date"),        // Get the element with the ID "task-date"
  taskText = document.getElementById("task-text"),        // Get the element with the ID "task-text"
  addTaskBtn = document.getElementById("task-btn"),       // Get the element with the ID "task-btn"
  clearBtn = document.getElementById("clear-btn");        // Get the element with the ID "clear-btn"

// Event Listener for Add Task Button Click
addTaskDiv.addEventListener("click", formDisplay);        // Add a click event listener to "addTaskDiv" calling "formDisplay" function

// Handle form Display
function formDisplay(e) {
  if (e.target.classList.contains("fa-plus")) {           // If the clicked element has the class "fa-plus"
    showForm();                                           // Call the "showForm" function
  }
  if (e.target.classList.contains("fa-times")) {          // If the clicked element has the class "fa-times"
    hideForm();                                           // Call the "hideForm" function
  }
}

// Show Form
function showForm() {
  taskFormDiv.style.top = "0";                            // Set the top style property of "taskFormDiv" to 0
  plusIcon.style.display = "none";                        // Hide the element with the class "fa-plus"
  closeIcon.style.display = "block";                      // Display the element with the class "fa-times"
}

// Hide Form
function hideForm() {
  taskFormDiv.style.top = "-100%";                         // Set the top style property of "taskFormDiv" to -100%
  closeIcon.style.display = "none";                        // Hide the element with the class "fa-times"
  plusIcon.style.display = "block";                        // Display the element with the class "fa-plus"
  taskForm.reset();                                       // Reset the form
}

// Local Storage Functions
function getTasks() {
  let tasks = localStorage.getItem("tasks");              // Get the value of "tasks" from local storage
  if (tasks == null) {                                     // If "tasks" is null
    tasksObj = [];                                         // Set "tasksObj" to an empty array
  } else {
    tasksObj = JSON.parse(tasks);                         // Parse the JSON string in "tasks" and set "tasksObj"
  }
}

// Event Listener for Add Task Button Click
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();                                     // Prevent the default form submission behavior

  // Validate input
  if (taskDate.value == "" || taskText.value == "") {     // If taskDate or taskText is empty
    return alert("Please add task date and text!!!");     // Show an alert and exit the function
  }

  // Get tasks from Local Storage
  getTasks();

  let myObj = {                                            // Create an object with task details
    date: taskDate.value,
    text: taskText.value,
    completed: false,
  };

  tasksObj.push(myObj);                                     // Add the new task to "tasksObj"

  // Save to the local storage
  localStorage.setItem("tasks", JSON.stringify(tasksObj)); // Convert "tasksObj" to JSON and store in local storage

  // Show Task on the page
  showTasks();
  hideForm();
});

// Show Task Function
function showTasks() {
  tasksEl.innerHTML = "";                                  // Clear the content of the element with the class "tasks"
  getTasks();

  if (tasksObj.length == 0) {
    tasksEl.innerHTML = "<p>No Task added. Please add a task. </p>";  // If tasksObj is empty, display a message
  }

  tasksObj.forEach(function (task, index) {
    let taskItem = document.createElement("div");         // Create a new div element
    let taskContent = document.createElement("div");      // Create a new div element
    let taskIcons = document.createElement("div");        // Create a new div element
    taskItem.classList.add("task");                         // Add the class "task" to taskItem
    taskContent.classList.add("task-content");              // Add the class "task-content" to taskContent
    taskIcons.classList.add("task-icons");                 // Add the class "task-icons" to taskIcons

    taskContent.innerHTML = `
      <p class="task-date">${task.date}</p>
      <span class="task-index">${index + 1}</span>
      <p class="task-text">${task.text}</p>
      <p class="hidden">${task.completed}</p>
      `;                                                    // Set the HTML content of taskContent

    taskIcons.innerHTML = `
      <i class="fas fa-check" id="${index}" onclick="completeTask(this.id)"></i>
      <i class="fas fa-edit" id="${index}" onclick="editTask(this.id)"></i>
      <i class="fas fa-trash-alt" id="${index}" onclick="deleteTask(this.id)"></i>
      `;                                                    // Set the HTML content of taskIcons

    taskItem.appendChild(taskContent);                    // Append taskContent to taskItem
    taskItem.appendChild(taskIcons);                      // Append taskIcons to taskItem

    if (tasksObj.length != 0) {
      tasksEl.appendChild(taskItem);                      // Append taskItem to tasksEl
      const taskStatus = taskItem.firstChild.children[3].innerText;

      if (taskStatus == "true") {
        taskItem.classList.add("completed");
      }
    }
  });

  // Show total number of tasks
  tasksObj.length > 1
    ? (totalTask.innerHTML = `${tasksObj.length} Tasks`)
    : (totalTask.innerHTML = `${tasksObj.length} Task`);
}

// Event Listener for Clear Button Click
clearBtn.addEventListener("click", () => {
  deleteAllTasks.trigger(deleteAll);

  function deleteAll() {
    localStorage.clear();
    showTasks();
  }
});

// Edit a task
function editTask(index) {
  taskForm.reset();
  showForm();

  getTasks();

  taskDate.value = tasksObj[index].date;
  taskText.value = tasksObj[index].text;
  taskText.focus();
  tasksObj.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksObj));
  showTasks();
}

// Delete a Task
function deleteTask(index) {
  deleteThisTask.trigger(confirmDelete);

  function confirmDelete() {
    getTasks();
    tasksObj.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksObj));
    showTasks();
  }
}

// Set Task to completed
function completeTask(index) {
  tasksEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check")) {
      getTasks();
      console.log(tasksObj[index].text);
      console.log(tasksObj[index].completed);

      tasksObj[index].completed = true;
      localStorage.setItem("tasks", JSON.stringify(tasksObj));
      showTasks();
    }
  });
}

showTasks();







