/* ============================================================
   TO-DO LIST APP - script.js
   This file controls all the actions: add, delete,
   complete, clear all, and saving tasks in localStorage.
   ============================================================ */

/* ====== 1. GRAB THE HTML ELEMENTS WE NEED ====== */
// We "select" elements by their id so JavaScript can use them
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

/* ====== 2. OUR TASK DATA ====== */
// This array holds all tasks. Each task is an object: { text, completed }
// We try to load saved tasks from localStorage; if none, start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ====== 3. SAVE TASKS TO localStorage ====== */
// localStorage only stores text, so we convert our array to text with JSON.stringify
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ====== 4. SHOW (DRAW) THE TASKS ON THE PAGE ====== */
function renderTasks() {
  // First, empty the list so we don't show tasks twice
  taskList.innerHTML = "";

  // Loop through every task in our array
  tasks.forEach(function (task, index) {

    // Create a new <li> row for this task
    const li = document.createElement("li");

    // Create the text part of the task
    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";

    // If the task is completed, add the "completed" class (crosses it out)
    if (task.completed) {
      span.classList.add("completed");
    }

    // When the text is clicked, toggle completed true/false
    span.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks(); // redraw so the change shows
    };

    // Create the delete button (the × symbol)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete-btn";

    // When delete is clicked, remove this task from the array
    deleteBtn.onclick = function () {
      tasks.splice(index, 1); // removes 1 item at this position
      saveTasks();
      renderTasks();
    };

    // Put the text and delete button inside the row
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Put the row inside the list on the page
    taskList.appendChild(li);
  });
}

/* ====== 5. ADD A NEW TASK ====== */
function addTask() {
  const text = taskInput.value.trim(); // .trim() removes extra spaces

  // Don't add empty tasks
  if (text === "") {
    alert("Please type a task first!");
    return;
  }

  // Add the new task to our array
  tasks.push({ text: text, completed: false });

  saveTasks();
  renderTasks();

  taskInput.value = ""; // clear the input box
  taskInput.focus();    // put the cursor back in the box
}

/* ====== 6. CLEAR ALL TASKS ====== */
function clearAll() {
  // Only ask if there are tasks to clear
  if (tasks.length === 0) return;

  // Ask the user to confirm before deleting everything
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];      // empty the array
    saveTasks();
    renderTasks();
  }
}

/* ====== 7. CONNECT BUTTONS AND KEYS TO ACTIONS ====== */
// Run addTask when the Add button is clicked
addBtn.onclick = addTask;

// Also allow pressing "Enter" to add a task
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Run clearAll when the Clear All button is clicked
clearBtn.onclick = clearAll;

/* ====== 8. SHOW SAVED TASKS WHEN PAGE FIRST LOADS ====== */
renderTasks();
