//Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#erase-button');
const filter = document.querySelector('#filter-object');

let oldInputValue;

//Funções
const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}

const searchTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');

        if (todoTitle.innerText !== text) {
            todo.classList.add('hide');
            todo.classList.remove('todo');
        }
    })
}

const filterTodo = (value) => {
    const todos = document.querySelectorAll('#todo-list div');

    todos.forEach(todo => {
        if (value === 'done') {
            if (!todo.classList.contains('done')) {
                todo.classList.add('hide');
                todo.classList.remove('todo');
            }
            else {
                todo.classList.add('todo');
                todo.classList.remove('hide');
            }
        }
        else if (todo.classList.contains('done') && value === 'todo') {
            todo.classList.add('hide')
            todo.classList.remove('todo');
        } else {
            todo.classList.add('todo')
            todo.classList.remove('hide');
        }
    })
}

//Eventos 
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()//faz com que o formulario nao seja enviado

    const inputValue = todoInput.value;

    if (inputValue) {
        //save todo
        saveTodo(inputValue);
    }
});

//aqui é um atalho, onde adicionará click em todos os elementos da pagina, e vai executar ações apenas quando for o elemento especifico
document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.parentNode;//pegando o pai do elemento target
    let todoTitle;

    if (parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
    }

    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove()
    }

    if (targetEl.classList.contains('edit-todo')) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }
    toggleForms()
});

searchBtn.addEventListener('click', () => {
    if (searchInput.value) {
        searchTodo(searchInput.value);
    }
    else {
        const todos = document.querySelectorAll('#todo-list .hide');
        todos.forEach(todo => {
            todo.classList.add('todo');
            todo.classList.remove('hide');
        })
    }
})

filter.addEventListener('change', () => {
    var opcaoTexto = filter.options[filter.selectedIndex].text;
    var opcaoValor = filter.options[filter.selectedIndex].value;
    console.log(opcaoTexto);
    console.log(opcaoValor);

    filterTodo(opcaoValor);
})
