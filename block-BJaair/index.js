// let form = document.querySelector('form');
// let ul = document.querySelector('ul');


// let cardsData = JSON.parse(localStorage.getItem('cards'))



// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     let title = event.target.elements.title.value;
//     let category = event.target.elements.category.value;
//     cardsData.push({title, category});
//     localStorage.setItem('cards', JSON.stringify(cardsData));
//     createUI(cardsData, ul)
// })

// function handleEdit(event, info, id){
//     let elm = event.target;
//     let input = document. createElement('input');
//     let parent = event.target.parentElement;
//     parent.replaceChild(input, elm);

// input.value = info;
// input.addEventListener('keyup', (e) => {
//     if (e.keyCode === 13){
//         let updatedValue = e.target.value;
//         cardsData[id].category = updatedValue
//     }
// });
// let parent = event.target,parentElement;
// parent.replaceChild(input, elm);
// }
// function createUI(data, root) {
//     root.innerHTML = '';
//     let fragment = new DocumentFragment();
//     data.forEach((cardInfo) => {
//         let li = documents.createElement('li');
//         let p = document.createElement('p');
//         p.addEventListener('dblclick', (event) => 
//         handleEdit(event, cardInfo.category, index));
//         p.innerText = cardInfo.category;
//         let h2 = document.createElement('h2');
//         h2.innerText = cardInfo.title;
//         li.append(p, h2);
//         fragment.appendChild(li);
//     });
//     root.append(fragment);
// }

// createUI(cardsData, ul);


let root = document.querySelector(".cards");
let form = document.querySelector("form");
let arr = JSON.parse(localStorage.getItem("items")) || [];

function handleClick(e) {
  let area = document.createElement("input");
  area.value = this.innerText;
  this.replaceWith(area);
  area.focus();

  function handleBlur() {
    this.innerText = area.value;
    let elemId = parseInt(this.dataset.id);
    let newArr = arr.map((task) => {
      if (task.id === elemId) {
        if (this.nodeName === "H3") {
          task.title = area.value;
        } else {
          task.category = area.value;
        }
      }
      return task;
    });
    localStorage.setItem("items", JSON.stringify(newArr));
    area.replaceWith(this);
  }
  function handleKeyDown(e) {
    if (e.keyCode !== 13) return;
    area.blur();
  }

  area.addEventListener("blur", handleBlur.bind(this));
  area.addEventListener("keydown", handleKeyDown.bind(this));
}

function createUI() {
  root.innerHTML = "";
  arr.forEach((task) => {
    let li = document.createElement("li");
    li.classList.add("card");
    let h3 = document.createElement("h3");
    h3.addEventListener("dblclick", handleClick);
    h3.setAttribute("data-id", task.id);
    h3.innerText = task.title;
    let p = document.createElement("p");
    p.addEventListener("dblclick", handleClick);
    p.setAttribute("data-id", task.id);
    p.innerText = task.category;
    li.append(p, h3);
    root.append(li);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  let obj = {
    title: form.title.value,
    category: form.category.value,
    id: new Date().getTime(),
  };
  arr.push(obj);
  localStorage.setItem("items", JSON.stringify(arr));
  createUI();
  form.reset();
}

form.addEventListener("submit", handleSubmit);
createUI();