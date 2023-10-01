let query = "winter";
let url = `https://api.unsplash.com/search/photos?query=${query}&&per_page=9&client_id=5968czt58_7r9BYrqK4NbSeQd5NYYuIAdO_NKP0Wkwo`;

let galery = document.querySelector(".img-galery__items");

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  let galeryChildren = galery.children;
  for (let j = galeryChildren.length - 1; j >= 0; j--) {
    galeryChildren[j].remove();
  }
  for (let i = 0; i < data.results.length; i++) {
    let imgItem = document.createElement("img");
    imgItem.src = data.results[i].links.download;
    imgItem.classList.add("img-galery__item");
    galery.appendChild(imgItem);
  }
  console.log(data);
}
getData(url);

let inputs = document.querySelectorAll(".input");
let search = document.querySelector("#search");
search.focus();
let limit = document.querySelector("#limit");
inputs.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      console.log(input);
      url = `https://api.unsplash.com/search/photos?query=${search.value}&per_page=${limit.value}&client_id=5968czt58_7r9BYrqK4NbSeQd5NYYuIAdO_NKP0Wkwo`;
      getData(url);
    }
  });
});
