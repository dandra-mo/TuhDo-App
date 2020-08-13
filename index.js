let todoItems = [];
let doneItems = [];


function renderTodo(todo) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));

    const list = document.querySelector(".js-todo-list");
    const doneList = document.querySelector(".done-list");
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        if (todoItems.length === 0) list.innerHTML = "";
        return;
    } else if (todo.checked) {
        const node = document.createElement("li");
        // node.setAttribute("class", `todo-item ${isChecked}`);
        node.setAttribute("data-key", todo.id);
        node.innerHTML = `
    <input id="${todo.id}" type="checkbox" checked/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>`

        date.setAttribute("data-key", todo.id)
        date.innerHTML = `
        <input id="${todo.id} type="date"/>
        <label for="${todo.id}" class="date-list"></label>` 
  ;
        // console.log(doneList);
        item.remove();
        doneList.append(node);
        return;
    }

    const isChecked = todo.checked ? "done" : ""; // if checked, call the done function
    const node = document.createElement("li");
    node.setAttribute("class", `todo-item ${isChecked}`);
    node.setAttribute("data-key", todo.id);
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now()
    };

    todoItems.push(todo);
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

const form = document.querySelector(".js-form");
form.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector(".js-todo-input");

    const text = input.value.trim();
    if (text !== "") {
        addTodo(text);
        input.value = "";
        input.focus();
    }
});

// const renderDone = doneItems => {
//   const newList = document.querySelector(".done-form");
//   const node2 = document.createElement("li");
//   node.setAttribute("text", DOMMatrixReadOnly);
//   node2.innerHTML = `
//   <input type="text" />`;
// };

const list = document.querySelector(".js-todo-list");
list.addEventListener("click", event => {
    // on the click, add this list to new readonly list
    if (event.target.classList.contains("js-tick")) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains("js-delete-todo")) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const ref = localStorage.getItem("todoItems");
    if (ref) {
        todoItems = JSON.parse(ref);
        todoItems.forEach(t => {
            renderTodo(t);
        });
    }
});
