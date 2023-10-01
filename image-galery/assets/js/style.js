const url =
  "https://api.unsplash.com/search/photos?query=winter&client_id=5968czt58_7r9BYrqK4NbSeQd5NYYuIAdO_NKP0Wkwo";

let galery = document.querySelector(".img-galery__items");

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  for (let i = 0; i < data.results.length; i++) {
    let imgItem = document.createElement("img");
    imgItem.src = data.results[i].links.download;
    imgItem.classList.add("img-galery__item");
    galery.appendChild(imgItem);
  }
  console.log(data);
}
getData();
