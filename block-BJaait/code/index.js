let todoItems = [];

function renderTodo(todo) {
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    // add this if block
    if (todo.deleted) {
      // remove the item from the DOM
      item.remove();
      return
    }
    const isChecked = todo.checked ? 'done': '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
      </button>`;
    if (item) {
      list.replaceChild(node, item);
    } else {
      list.append(node);
    }
  }


function addTodo(text){
    const todo = {
    text,
    isChecked: false,
    id: Date.now()
    }
    //pushed to array and console.logged
     todoItems.push(todo);
    renderTodo(todo)
}
//select a form element

const form = document.querySelector('.js-form')

form.addEventListener('submit', event => {
    //prevent default
    event.preventDefault();
    //select text inpur
    const input = document.querySelector('.js-todo-input')
    //remove white space
    const text = input.value.trim();
    //if text variablenot equal to empty string we pass text to add todo()
    if(text !== '') {
        addTodo(text);
        input.value = "";
        input.focus()
    }
})


//select the entire list
const list = document.querySelector('.js-todo-list');
//add click event listener to the lost and its children
list.addEventListener('click', event => {
    if(event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
      if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

function toggleDone(key) {
    //findindex array method that returns the position of an element
    const index = todoItems.findIndex(item => item.id === Number (key));
    //locate the rodo items in the todoItems array and set it as checked
    //property to opposite means true will become false and vice versa
    todoItems[index].checked = !todoItems[index.checked];
    renderTodo(todoItems[index]);

}

function deleteTodo(key) {
    // find the corresponding todo object in the todoItems array
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Create a new object with properties of the current todo item
    // and a `deleted` property which is set to true
    const todo = {
      deleted: true,
      ...todoItems[index]
    };
    // remove the todo item from the array by filtering it out
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
  }