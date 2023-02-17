const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");
const modalTodo = document.querySelector(".modal-todo");

let editItemId;
// localStorege

let todo = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todo.length) showtodos();

function setTodos() {
  localStorage.setItem("list", JSON.stringify(todo));
}

// time

function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const sekund =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month_title = now.getMonth();

  fullDay.textContent = `${date} ${months[month_title]} ${year}`;
  hourEl.textContent = `${hour}`;
  minuteEl.textContent = `${minute}`;
  secondEl.textContent = `${sekund}`;
  return `${hour}:${minute},${date}.${month}.${year}`;
}
setInterval(getTime, 1000);
// Show todo
function showtodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li ondblclick="setCompleted(${i})"  class="list-group-item d-flex justify-content-between ${
      item.completed == true ? "completed" : ""
    }">
    ${item.text}
    <div class="todo-icons">
      <span class="opacity-50 me-2">${item.time}  </span>
      <img onclick= (editTodo(${i}))
       src="./img/edit.svg" alt="edit icon" width="25" height="25" />
      <img onclick= (deleteTodo(${i}))
        src="./img/delete.svg"
        alt="delete icon"
        width="25"
        height="25"
      />
    </div>
    </li>
    `;
  });
}
// FUNCTION SHOW ERROR
function showMassage(qayerga, habar) {
  document.getElementById(`${qayerga}`).textContent = habar;
  setTimeout(() => {
    document.getElementById(`${qayerga}`).textContent = "  ";
  }, 2500);
}

/**/

// Form todo
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();

  let todoText = formCreate.inputCreate.value.trim();

  if (todoText.length) {
    todo.push({ text: todoText, time: getTime(), completed: false });
    setTodos();
    showtodos();
    console.log(todo);
  } else {
    showMassage("message-create", "Iltimos ma'lumot kiriting...");
  }
  formCreate.reset();
});

// delete todo

function deleteTodo(id) {
  const deletedTodos = todo.filter((item, i) => {
    return i !== id;
  });
  todo = deletedTodos;
  setTodos();
  showtodos();
}

// set Comleted

function setCompleted(id) {
  const completedTodos = todo.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todo = completedTodos;
  setTodos();
  showtodos();
}

// form edit
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  let todoText = formEdit.inputEdit.value.trim();

  if (todoText.length) {
    todo.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showtodos();
    close();
    console.log(todo);
  } else {
    showMassage("message-edit", "Iltimos ma'lumot kiriting...");
  }
  formCreate.reset();
});

// editTodo
function editTodo(id) {
  editItemId = id;
  Open();
}

// Open
function Open() {
  modalTodo.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

// close
function close() {
  modalTodo.classList.add("hidden");
  overlay.classList.add("hidden");
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) {
    close();
  }
});

closeEl.addEventListener("click", () => {
  close();
});

overlay.addEventListener("click", () => {
  close();
});
