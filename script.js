// Define task list array
let taskList = [];

// Get form and table elements
const taskForm = document.getElementById("task-form");
const taskTable = document.getElementById("task-table");

// Add event listener to form submit button
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const priorityInput = document.getElementById("priority-input");
  const startTimeInput = document.getElementById("start-time-input");
  const endTimeInput = document.getElementById("end-time-input");
  addTaskToList(nameInput.value, dateInput.value, priorityInput.value, startTimeInput.value, endTimeInput.value);
  nameInput.value = "";
  dateInput.value = "";
  priorityInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
});

// Function to add a new task to the list and table
function addTaskToList(name, date, priority, startTime, endTime) {
  const task = { name, date, priority, startTime, endTime };
  taskList.push(task);
  addTaskToTable(task);
}

// Function to add a new task to the table
function addTaskToTable(task) {
  const newRow = taskTable.insertRow();

  const nameCell = newRow.insertCell(0);
  nameCell.innerText = task.name;

  const dateCell = newRow.insertCell(1);
  dateCell.innerText = task.date;

  const priorityCell = newRow.insertCell(2);
  priorityCell.innerText = task.priority;

  const startTimeCell = newRow.insertCell(3);
  startTimeCell.innerText = task.startTime;

  const endTimeCell = newRow.insertCell(4);
  endTimeCell.innerText = task.endTime;

  const remainingTimeCell = newRow.insertCell(5);
  remainingTimeCell.innerText = calculateRemainingTime(task);

  const deleteCell = newRow.insertCell(6);
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => deleteTaskFromTable(newRow));
  deleteCell.appendChild(deleteButton);
}

// Function to delete a task from the list and table
function deleteTaskFromTable(row) {
  const index = row.rowIndex - 1;
  taskList.splice(index, 1);
  taskTable.deleteRow(row.rowIndex);
}

// Function to calculate remaining time for a task
function calculateRemainingTime(task) {
  const startTime = new Date(`${task.date}T${task.startTime}:00`);
  const endTime = new Date(`${task.date}T${task.endTime}:00`);
  const currentTime = new Date();

  if (endTime < currentTime) {
    return "Overdue";
  }

  const remainingTime = endTime.getTime() - currentTime.getTime();
  const remainingHours = Math.floor(remainingTime / 1000 / 60 / 60);
  const remainingMinutes = Math.floor((remainingTime / 1000 / 60) % 60);

  return `${remainingHours}h ${remainingMinutes}m`;
}

// Populate table with existing tasks on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("taskList"));
  if (storedTasks) {
    taskList = storedTasks;
    taskList.forEach((task) => addTaskToTable(task));
  }
});

// Save task list to local storage on page unload
window.addEventListener("beforeunload", () => {
  localStorage.setItem("taskList", JSON.stringify(taskList));
});
