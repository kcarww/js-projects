const containerElement = document.querySelector('.container');
const inputField = document.querySelector('.input');
const addButton = document.querySelector('.add');

function createTodoItem(name) {
    const itemBox = document.createElement('div');
    itemBox.classList.add('item');

    const input = document.createElement('input');
    input.type = "text";
    input.disabled = true;
    input.value = name;
    input.classList.add('item_input');

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.innerHTML = "EDIT";
    editButton.addEventListener('click', () => editItem(input, name));

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.innerHTML = "REMOVE";
    removeButton.addEventListener('click', () => removeItem(itemBox, name));

    containerElement.appendChild(itemBox);
    itemBox.appendChild(input);
    itemBox.appendChild(editButton);
    itemBox.appendChild(removeButton);
}

function editItem(input, name) {
    input.disabled = !input.disabled;
    if (!input.disabled) {
        const index = todos.indexOf(name);
        todos[index] = input.value;
        saveTodos();
    }
}

function removeItem(itemBox, name) {
    itemBox.parentNode.removeChild(itemBox);
    const index = todos.indexOf(name);
    todos.splice(index, 1);
    saveTodos();
}

function saveTodos() {
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

function check() {
    const inputValue = inputField.value.trim();
    if (inputValue !== "") {
        createTodoItem(inputValue);
        todos.push(inputValue);
        saveTodos();
        inputField.value = "";
    }
}

addButton.addEventListener('click', check);
window.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        check();
    }
});

// Carregar itens do armazenamento local ao iniciar
const todos = JSON.parse(window.localStorage.getItem("todos")) || [];
todos.forEach(todo => createTodoItem(todo));
