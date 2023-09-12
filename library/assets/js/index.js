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
const librarycardForm = document.getElementById("librarycard-form");
const buyCardForm = document.getElementById("buy-card-form");

let localStorageUsers = [];
let currentUser = {};
let userAuthorized = localStorage.getItem("userAuthorized");
let readerAccess = false;

if (userAuthorized) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  updateUserProfileIcon(currentUser);
  updateProfileDropMenu(currentUser);
  updateDigitalCards(currentUser);
  updateRendedBooks();
}
function updateRendedBooks() {
  if (userAuthorized) {
    if (currentUser.books.length) {
      currentUser.books.forEach((book) => {
        buyCardBtns[book.id].classList.add("own");
        buyCardBtns[book.id].textContent = "Own";
      });
    }
    if (currentUser.books.length) {
      let ul = document.querySelector(".modal-profile-rended-books");
      currentUser.books.forEach((book) => {
        let li = document.createElement("li");
        const authorFormatted = book.bookAuthor.replace(/^By\s+/i, "");
        let bookFullName = book.bookName + ", " + authorFormatted;
        li.textContent = bookFullName;
        li.classList.add("modal-profile-rended-books__item");
        ul.appendChild(li);
      });
    }
  } else {
    buyCardBtns.forEach((card) => {
      card.classList.remove("own");
      card.textContent = "Buy";
    });
  }
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
  updateRendedBooks();
  let ul = document.querySelector(".modal-profile-rended-books");
  [].slice.call(ul.children).forEach((li) => {
    ul.removeChild(li);
  });
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
  let cardNumber = getRandomInt(10000000000, 59999999999)
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

  getUsersData();
  updateUsersData(currentUser);
  registerMenu.classList.toggle("modal--active-target");
  regForm.reset();
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
    userAuthorized = localStorage.getItem("userAuthorized");
    currentUser = findedUser;

    updateRendedBooks();
    updateUserProfileIcon(findedUser);
    updateProfileDropMenu(findedUser);
    updateDigitalCards(findedUser);
    loginMenu.classList.toggle("modal--active-target");
    loginForm.reset();
  }
});

buyCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const buyCardData = new FormData(buyCardForm);
  getUsersData();
  updateCardCredentials(currentUser);
  currentUser.hasLibraryCard = true;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  buyCardMenu.classList.toggle("modal--active-target");
});

librarycardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const librarycardData = new FormData(librarycardForm);
  let reader = {
    name: librarycardData.get("reader-name"),
    cardNumber: librarycardData.get("reader-card-number"),
  };
  getUsersData();

  let findedUser = checkReader(reader);
  if (findedUser) {
    readerAccess = true;
    updateDigitalCards(findedUser);
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

function checkReader(reader) {
  let registeredUser = null;
  localStorageUsers.forEach((user) => {
    if (
      reader.name == user.firstname + " " + user.lastname &&
      reader.cardNumber == user.cardNumber
    ) {
      registeredUser = user;
    }
  });
  return registeredUser;
}

function updateDigitalCards(currentUser) {
  if (userAuthorized) {
    setDigitalCardFormData(currentUser);
  } else if (readerAccess) {
    setDigitalCardFormData(currentUser);
    setTimeout(() => {
      removeDigitalCardFormData();
      document
        .querySelector(".libcard-items")
        .classList.toggle("libcard-items--not-logged");
      readerAccess = false;
    }, 10000);
  } else {
    removeDigitalCardFormData();
  }
  document
    .querySelector(".libcard-items")
    .classList.toggle("libcard-items--not-logged");
  if (!readerAccess) {
    document
      .querySelector("#libcard-notlogin")
      .classList.toggle("librarycard_request--not-logged");
    document
      .querySelector("#libcard-login")
      .classList.toggle("librarycard_request--logged");
  }
}

function setDigitalCardFormData(currentUser) {
  digitReaderName.value = currentUser.firstname + " " + currentUser.lastname;
  digitReaderName.setAttribute("disabled", "");
  digitCardNumber.value = currentUser.cardNumber;
  digitCardNumber.setAttribute("disabled", "");

  document.querySelector(".libcard_table__name").textContent =
    "Your Library card";
  document.querySelector(".libcard_table_btm").style.display = "none";
  document.querySelectorAll(".visits").forEach((elem) => {
    elem.textContent = currentUser.visits;
  });
  document.querySelectorAll(".bonuses").forEach((elem) => {
    elem.textContent = 1240;
  });
  document.querySelectorAll(".books").forEach((elem) => {
    elem.textContent = currentUser.books.length;
  });
}

function removeDigitalCardFormData() {
  digitReaderName.value = "";
  digitReaderName.removeAttribute("disabled");
  digitCardNumber.value = "";
  digitCardNumber.removeAttribute("disabled");
  document.querySelector(".libcard_table_btm").removeAttribute("style");
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
  localStorage.setItem("currentUser", JSON.stringify(obj));
}

function updateBooks(obj, btnId) {
  localStorageUsers.forEach((user) => {
    let isEqual = JSON.stringify(user) === JSON.stringify(obj);
    if (isEqual) {
      let bookName = document.querySelectorAll(".book_name")[btnId];
      let bookAuthor = document.querySelectorAll(".book_author")[btnId];
      let bookObj = {
        id: btnId,
        bookName: bookName.textContent,
        bookAuthor: bookAuthor.textContent,
      };
      user.books.push(bookObj);
      obj.books.push(bookObj);

      let ul = document.querySelector(".modal-profile-rended-books");
      let li = document.createElement("li");
      const authorFormatted = bookAuthor.textContent.replace(/^By\s+/i, "");
      let bookFullName = bookName.textContent + ", " + authorFormatted;
      li.textContent = bookFullName;
      li.classList.add("modal-profile-rended-books__item");
      ul.appendChild(li);
    }
  });
  localStorageUsers = [...new Set(localStorageUsers)];
  localStorage.setItem("users", JSON.stringify(localStorageUsers));
  localStorage.setItem("currentUser", JSON.stringify(obj));
}

function updateCardCredentials(obj) {
  localStorageUsers.forEach((user) => {
    let isEqual = JSON.stringify(user) === JSON.stringify(obj);
    if (isEqual) {
      user.hasLibraryCard = true;
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
    profileTitle.textContent = obj.cardNumber;
  } else {
    authComponent.classList.remove("drop-menu-nav--active-target");
    noAuthComponent.classList.remove("drop-menu-nav--active-target");
  }
}

buyCardBtns.forEach((btn, btnId) => {
  btn.addEventListener("click", (e) => {
    if (!userAuthorized) {
      loginMenu.classList.toggle("modal--active-target");
      e.stopPropagation();
    } else if (!currentUser.hasLibraryCard) {
      buyCardMenu.classList.toggle("modal--active-target");
    } else {
      getUsersData();
      updateBooks(currentUser, btnId);
      updateProfileDropMenu(currentUser);
      setDigitalCardFormData(currentUser);
      btn.classList.add("own");
      btn.textContent = "Own";
    }
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
