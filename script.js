// Select the form element and input fields
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const dateInput = document.querySelector('#date-input');
const priorityInput = document.querySelector('#priority-input');

// Select the table element
const taskTable = document.querySelector('#task-table');

// Add event listener to form submission
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent form submission

  // Get input values
  const taskName = taskInput.value;
  const taskDate = dateInput.value;
  const taskPriority = priorityInput.value;

  // Create new task row
  const newRow = document.createElement('tr');

  // Add task name column
  const nameColumn = document.createElement('td');
  nameColumn.textContent = taskName;
  newRow.appendChild(nameColumn);

  // Add task date column
  const dateColumn = document.createElement('td');
  dateColumn.textContent = taskDate;
  newRow.appendChild(dateColumn);

  // Add task priority column
  const priorityColumn = document.createElement('td');
  priorityColumn.textContent = taskPriority;
  newRow.appendChild(priorityColumn);

  // Add delete button column
  const deleteColumn = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteColumn.appendChild(deleteButton);
  newRow.appendChild(deleteColumn);

  // Add new row to the table
  taskTable.appendChild(newRow);

  // Clear form inputs
  taskInput.value = '';
  dateInput.value = '';
  priorityInput.value = '';
});

// Add event listener to delete buttons
taskTable.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.parentElement.remove();
  }
});
