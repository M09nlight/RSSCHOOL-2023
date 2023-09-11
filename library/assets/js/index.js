let profile = document.querySelector(".profile__img");
let profileAuth = document.querySelector(".profile-user");
let noAuthComponent = document.querySelector(".drop-menu-nav--no-auth");
let authComponent = document.querySelector(".drop-menu-nav--auth");

let logoutBtn = document.querySelector(".logout-btn");

let profileBtns = document.querySelectorAll(".profile-btn");
let profileMenu = document.querySelector("#profile");
let profileCloseBtn = document.querySelector(".modal__profile-close-btn");

let loginBtns = document.querySelectorAll(".login-btn");
let loginMenu = document.querySelector("#login");
let loginCloseBtn = document.querySelector(".modal__login-close-btn");

let registerBtns = document.querySelectorAll(".register-btn");
let registerMenu = document.querySelector("#register");
let registerCloseBtn = document.querySelector(".modal__register-close-btn");

let buyCardBtns = document.querySelectorAll(".buy-btn");
let buyCardMenu = document.querySelector("#buy-card");
let buyCardCloseBtn = document.querySelector(".modal__buy-card-close-btn");

let profileImg = document.querySelector(".profile__img");
let profileUser = document.querySelector(".profile-user");
let profileShortName = document.querySelector(".modal-profile__short-name");
let profileFullName = document.querySelector(".modal-profile__full-name");

let digitReaderName = document.querySelector("#reader-name");
let digitCardNumber = document.querySelector("#reader-card-number");

const regForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

let localStorageUsers = [];
let currentUser = {};
let userAuthorized = localStorage.getItem("userAuthorized");

if (userAuthorized) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  updateUserProfileIcon(currentUser);
  updateProfileDropMenu(currentUser);
  updateDigitalCards(currentUser);
}

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

document.body.addEventListener("pointerdown", (e) => {
  if (!e.target.closest(".drop-menu-nav--active-target")) {
    if (noAuthComponent.classList.contains("drop-menu-nav--active-target")) {
      noAuthComponent.classList.toggle("drop-menu-nav--active-target");
    } else if (
      authComponent.classList.contains("drop-menu-nav--active-target")
    ) {
      authComponent.classList.toggle("drop-menu-nav--active-target");
    }
  }
  if (!e.target.closest(".modal--register")) {
    if (registerMenu.classList.contains("modal--active-target")) {
      registerMenu.classList.toggle("modal--active-target");
    }
  }
  if (!e.target.closest(".modal--login")) {
    if (loginMenu.classList.contains("modal--active-target")) {
      loginMenu.classList.toggle("modal--active-target");
    }
  }
  if (!e.target.closest(".modal--profile")) {
    if (profileMenu.classList.contains("modal--active-target")) {
      profileMenu.classList.toggle("modal--active-target");
    }
  }
  if (!e.target.closest(".modal--buy-card")) {
    if (buyCardMenu.classList.contains("modal--active-target")) {
      buyCardMenu.classList.toggle("modal--active-target");
    }
  }
  //   e.stopPropagation();
});

loginBtns.forEach((logBtn) => {
  logBtn.addEventListener("click", (e) => {
    loginMenu.classList.toggle("modal--active-target");
    noAuthComponent.classList.remove("drop-menu-nav--active-target");
    if (registerMenu.classList.contains("modal--active-target")) {
      registerMenu.classList.toggle("modal--active-target");
    }
    e.stopPropagation();
  });
});

profileBtns.forEach((pBtn) => {
  pBtn.addEventListener("click", (e) => {
    if (userAuthorized) {
      profileShortName.innerHTML =
        currentUser.firstname[0].toUpperCase() +
        currentUser.lastname[0].toUpperCase();
      profileFullName.innerHTML =
        currentUser.firstname + " " + currentUser.lastname;
    }
    profileMenu.classList.toggle("modal--active-target");
    authComponent.classList.remove("drop-menu-nav--active-target");
    e.stopPropagation();
  });
});

registerBtns.forEach((regBtn) => {
  regBtn.addEventListener("click", (e) => {
    registerMenu.classList.toggle("modal--active-target");
    noAuthComponent.classList.remove("drop-menu-nav--active-target");
    if (loginMenu.classList.contains("modal--active-target")) {
      loginMenu.classList.toggle("modal--active-target");
    }
    e.stopPropagation();
  });
});

logoutBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  localStorage.removeItem("userAuthorized");
  localStorage.removeItem("currentUser");
  userAuthorized = localStorage.getItem("userAuthorized");
  updateUserProfileIcon(null);
  updateProfileDropMenu(null);
  updateDigitalCards(null);
});

registerCloseBtn.addEventListener("click", (event) => {
  registerMenu.classList.toggle("modal--active-target");
});

loginCloseBtn.addEventListener("click", (event) => {
  loginMenu.classList.toggle("modal--active-target");
});

profileCloseBtn.addEventListener("click", (event) => {
  profileMenu.classList.toggle("modal--active-target");
});

buyCardCloseBtn.addEventListener("click", (event) => {
  buyCardMenu.classList.toggle("modal--active-target");
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

  localStorage.setItem("userAuthorized", true);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  userAuthorized = localStorage.getItem("userAuthorized");
  updateUserProfileIcon(currentUser);
  updateProfileDropMenu(currentUser);
  updateDigitalCards(currentUser);
  getUsersData();
  updateUsersData(currentUser);
  registerMenu.classList.toggle("modal--active-target");
  userAuthorized = localStorage.getItem("userAuthorized");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  let userForLogin = {
    loginName: formData.get("login-name"),
    loginPassword: formData.get("login-password"),
  };
  getUsersData();

  let findedUser = checkRegistration(userForLogin);
  if (findedUser) {
    updateVisitsCount(findedUser);
    localStorage.setItem("userAuthorized", true);
    localStorage.setItem("currentUser", JSON.stringify(findedUser));
    userAuthorized = localStorage.getItem("userAuthorized");
    currentUser = findedUser;

    updateUserProfileIcon(findedUser);
    updateProfileDropMenu(findedUser);
    updateDigitalCards(findedUser);
    loginMenu.classList.toggle("modal--active-target");
  }
});

function checkRegistration(userForLogin) {
  let registeredUser = null;
  localStorageUsers.forEach((user) => {
    if (
      (userForLogin.loginName == user.email ||
        userForLogin.loginName == user.cardNumber) &&
      userForLogin.loginPassword == user.password
    ) {
      registeredUser = user;
    }
  });
  return registeredUser;
}

function updateDigitalCards(currentUser) {
  if (userAuthorized) {
    digitReaderName.value = currentUser.firstname + " " + currentUser.lastname;
    digitReaderName.setAttribute("disabled", "");
    digitCardNumber.value = currentUser.cardNumber;
    digitCardNumber.setAttribute("disabled", "");

    document.querySelector(".libcard_table__name").textContent =
      "Your Library card";
    document.querySelector(".libcard_table_btm").style.display = "none";
    document.querySelectorAll("#visits").forEach((elem) => {
      elem.textContent = currentUser.visits;
    });
    document.querySelectorAll("#bonuses").forEach((elem) => {
      elem.textContent = 1240;
    });
    document.querySelectorAll("#books").forEach((elem) => {
      elem.textContent = currentUser.books.length;
    });
  } else {
    digitReaderName.value = "";
    digitReaderName.removeAttribute("disabled");
    digitCardNumber.value = "";
    digitCardNumber.removeAttribute("disabled");
    document.querySelector(".libcard_table_btm").removeAttribute("style");
  }
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

function updateVisitsCount(obj) {
  localStorageUsers.forEach((user) => {
    let isEqual = JSON.stringify(user) === JSON.stringify(obj);
    if (isEqual) {
      user.visits++;
    }
  });
  localStorageUsers = [...new Set(localStorageUsers)];
  localStorage.setItem("users", JSON.stringify(localStorageUsers));
}

function updateUserProfileIcon(currentUser) {
  profileImg.classList.toggle("profile__img--logged");

  profileUser.classList.toggle("profile-user--not-logged");
  if (userAuthorized) {
    profileUser.innerHTML =
      currentUser.firstname[0].toUpperCase() +
      currentUser.lastname[0].toUpperCase();
  }
}
function updateProfileDropMenu(obj) {
  if (userAuthorized) {
    let profileTitle = document.querySelector(
      ".drop-menu-nav--auth .drop-menu-nav__header"
    );
    profileAuth.setAttribute("title", obj.firstname + " " + obj.lastname);
    profileTitle.classList.toggle("drop-menu-nav__header--logged");
    profileTitle.textContent = obj.cardNumber;
  } else {
    authComponent.classList.remove("drop-menu-nav--active-target");
    noAuthComponent.classList.remove("drop-menu-nav--active-target");
  }
}

buyCardBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!userAuthorized) {
      loginMenu.classList.toggle("modal--active-target");
      e.stopPropagation();
    } else buyCardMenu.classList.toggle("modal--active-target");
  });
});

let profileCardNumber = document.querySelector(".modal-profile__card-info");
profileCardNumber.addEventListener("click", () => {
  let cardNumber = document.querySelector(".modal-profile__card-number");
  navigator.clipboard.writeText(cardNumber.textContent);
  let alert = document.querySelector(".alert");
  alert.classList.add("alert--show");
  setTimeout(() => {
    alert.classList.remove("alert--show");
  }, 500);
});
