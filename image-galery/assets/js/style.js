let searchVal = "winter";
let limitVal = "9";
let url = `https://api.unsplash.com/search/photos?query=${searchVal}&&per_page=${limitVal}&client_id=5968czt58_7r9BYrqK4NbSeQd5NYYuIAdO_NKP0Wkwo`;

let galery = document.querySelector(".img-galery__items");

let inputs = document.querySelectorAll(".input");
let search = document.querySelector("#search");
let limit = document.querySelector("#limit");

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  let galeryChildren = galery.children;
  for (let j = galeryChildren.length - 1; j >= 0; j--) {
    galeryChildren[j].remove();
  }
  for (let i = 0; i < data.results.length; i++) {
    let imgItem = document.createElement("img");
    imgItem.src = data.results[i].urls.regular;
    imgItem.classList.add("img-galery__item");
    galery.appendChild(imgItem);
    console.log(data);
  }
}
getData(url);

search.focus();
inputs.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      if (search.value) {
        searchVal = search.value;
      }
      if (limit.value) {
        limitVal = limit.value;
      }
      url = `https://api.unsplash.com/search/photos?query=${searchVal}&per_page=${limitVal}&client_id=5968czt58_7r9BYrqK4NbSeQd5NYYuIAdO_NKP0Wkwo`;
      getData(url);
    }
  });
});
let clearBtns = document.querySelectorAll(".clear");

clearBtns.forEach((el) => {
  el.addEventListener("click", () => {
    let enterField = el.parentElement.querySelector(".input");
    enterField.value = "";
  });
});
