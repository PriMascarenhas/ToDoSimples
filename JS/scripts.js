// Seleção de elementos
const todoForm = document.querySelector("#todo-form"); //SHift ALT para baixo//
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções
//save todo2
const saveTodo = (text) => {
  //vair criar em hmtl tda a template da class todo

  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoList.innerText = text; //inserir texto no h3 criado - o q vem do inputValue inserido pelo husuário
  todo.appendChild(todoTitle); //coloca o todo texto no h3

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo); //coloca o todo na lista geral - <div id="todo-list"><!--#todo-list--></div>

  todoInput.value = "";
  todoInput.focus();
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo"); //arrays de todos e agora vai percorrer ele até identificar ele, e vai editar.

  todos.forEach((todo) => {
    //vai chamar cada todo de todo

    let todoTitle = todo.querySelector("h3"); // vai pegar título do todo atual, q estou mapeando fazendo o for each

    if (todoTitle.innerText === oldInputValue) {
      //está comparando o título da minha interação atual, se é igual aquele valor q salvou na memória - encontrou o todo certo
      todoTitle.innerText = text; //alterou o seu texto
    }
  });
};

const getSearchedTodos = (search) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    todo.style.display = "flex";

    console.log(todoTitle);

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));

      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    default:
      break;
  }
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault(); //faz com q o formulário não seja enviado para o backend ao apertar o botão, pois estamos trab somente com o frontend

  const inputValue = todoInput.value;

  if (inputValue) {
    // inputValue é o valor do input que o usuário digita, a validação do if é para que o usuário n cire tarefas sem título
    //save todo1
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innertext;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done"); //com add: acrescenta a classe done nas tarefas que clica
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle; //já fica podendo cancelar a possibilidade de editar
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;
  if (editInputValue) {
    // se estiver vazio, cancela a edição
    //ãtualizar
    updateTodo(editInputValue);
  }

  toggleForms();
});
