let root = document.querySelector(".quotes");
let count = 3;
function createUI(quote, author) {
  let li = document.createElement("li");
  li.classList.add("quote");
  let h1 = document.createElement("h1");
  h1.innerText = quote;
  let p = document.createElement("p");
  p.innerText = author;
  li.append(h1, p);
  return li;
}

document.addEventListener("DOMContentLoaded", () => {
  alert(`The content of the DOM is loaded`);
  for (let i = 0; i < 3; i++) {
    root.append(createUI(quotes[i].quoteText, quotes[i].quoteAuthor));
  }
});

document.addEventListener("scroll", () => {
  let windowRelativeBottom =
    document.documentElement.getBoundingClientRect().bottom;
  if (windowRelativeBottom < window.innerHeight + 100) {
    root.append(createUI(quotes[count].quoteText, quotes[count].quoteAuthor));
    count++;
  }
});