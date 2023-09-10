let profile = document.querySelector(".profile__img");
let profileAuth = document.querySelector(".profile-user");
let noAuthComponent = document.querySelector(".drop-menu-nav--no-auth");
let authComponent = document.querySelector(".drop-menu-nav--auth");
let loginBtn = document.querySelector("#login");
let registerBtns = document.querySelectorAll(".register-target");
let registerMenu = document.querySelector(".register");
let registerCloseBtn = document.querySelector(".register__close-btn");

let profileImg = document.querySelector(".profile__img");
let profileUser = document.querySelector(".profile-user");

let digitReaderName = document.querySelector("#reader-name");
let digitCardNumber = document.querySelector("#reader-card-number");

const regForm = document.getElementById("register-form");

let localStorageUsers = [];
let currentUser = {};
let isLogged = false;

profile.addEventListener("click", (e) => {
  noAuthComponent.classList.toggle("drop-menu-nav--active-target");
  if (burger.classList.contains("active")) {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
    document.body.classList.toggle("lock");
  }
  e.stopPropagation();
});
profileAuth.addEventListener("click", (e) => {
  authComponent.classList.toggle("drop-menu-nav--active-target");
  if (burger.classList.contains("active")) {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
    document.body.classList.toggle("lock");
  }
  e.stopPropagation();
});

document.body.addEventListener("click", (e) => {
  if (!e.target.closest(".drop-menu-nav--active-target")) {
    if (noAuthComponent.classList.contains("drop-menu-nav--active-target")) {
      noAuthComponent.classList.toggle("drop-menu-nav--active-target");
    } else if (
      authComponent.classList.contains("drop-menu-nav--active-target")
    ) {
      authComponent.classList.toggle("drop-menu-nav--active-target");
    }
  }
  if (!e.target.closest(".register__inner")) {
    if (registerMenu.classList.contains("register--active-target")) {
      registerMenu.classList.toggle("register--active-target");
    }
  }
  e.stopPropagation();
});

registerBtns.forEach((regBtn) => {
  regBtn.addEventListener("click", (e) => {
    registerMenu.classList.toggle("register--active-target");
    noAuthComponent.classList.toggle("drop-menu-nav--active-target");
    e.stopPropagation();
  });
});

registerCloseBtn.addEventListener("click", (event) => {
  registerMenu.classList.toggle("register--active-target");
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(regForm);
  let cardNumber = getRandomInt(10000000000, 99999999999)
    .toString(16)
    .toUpperCase();
  currentUser = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
    cardNumber,
    visits: 1,
    hasLibraryCard: false,
    books: [],
  };
  profileImg.classList.toggle("profile__img--logged");

  profileUser.classList.toggle("profile-user--not-logged");
  profileUser.innerHTML =
    currentUser.firstname[0].toUpperCase() +
    currentUser.lastname[0].toUpperCase();
  registerMenu.classList.toggle("register--active-target");

  updateProfileDropMenu(currentUser);
  updateDigitalCards(currentUser);
  getUsersData();
  updateUsersData(currentUser);
  isLogged = true;
});

function updateDigitalCards(currentUser) {
  digitReaderName.value = currentUser.firstname + " " + currentUser.lastname;
  digitReaderName.setAttribute("disabled", "");
  digitCardNumber.value = currentUser.cardNumber;
  digitCardNumber.setAttribute("disabled", "");

  document.querySelector(".libcard_table__name").textContent =
    "Your Library card";
  document.querySelector(".libcard_table_btm").style.display = "none";
  document.querySelector("#visits").textContent = currentUser.visits;
  document.querySelector("#bonuses").textContent = 1212;
  document.querySelector("#books").textContent = 0;
  document
    .querySelector(".libcard-items")
    .classList.toggle("libcard-items--not-logged");
  document
    .querySelector("#libcard-notlogin")
    .classList.toggle("librarycard_request--not-logged");
  document
    .querySelector("#libcard-login")
    .classList.toggle("librarycard_request--logged");
}

function getUsersData() {
  try {
    let currentStorage = localStorage.getItem("users");

    if (!!currentStorage) localStorageUsers = JSON.parse(currentStorage);
  } catch (err) {
    console.log(err);
  }
}

function updateUsersData(obj) {
  localStorageUsers.push(obj);
  localStorageUsers = [...new Set(localStorageUsers)];
  localStorage.setItem("users", JSON.stringify(localStorageUsers));
}
function updateProfileDropMenu(obj) {
  localStorageUsers.push(obj);
  localStorageUsers = [...new Set(localStorageUsers)];
  localStorage.setItem("users", JSON.stringify(localStorageUsers));
}
if (isLogged) {
}
