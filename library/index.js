let menu = document.querySelector(".header__nav");
let burger = document.querySelector(".header__burger");

burger.onclick = function (e) {
  if (noAuthComponent.classList.contains("drop-menu-nav--active-target")) {
    noAuthComponent.classList.toggle("drop-menu-nav--active-target");
  } else if (authComponent.classList.contains("drop-menu-nav--active-target")) {
    authComponent.classList.toggle("drop-menu-nav--active-target");
  }
  menu.classList.toggle("active");
  burger.classList.toggle("active");
  document.body.classList.toggle("lock");
  e.stopPropagation();
};

document.body.addEventListener("click", (event) => {
  if (burger.classList.contains("active")) {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
    document.body.classList.toggle("lock");
  }
});

console.log(`
1. Этап 1: Пользователь не зарегистрирован +50
\t
2. Этап 2: Пользователь на этапе регистрации +49
\t
3. Этап 3: Пользователь на этапе входа в учётную запись после регистрации + 29
\t
Этап 4: Пользователь после входа в учётную запись + 72
\t
Итого: 200 баллов
`);
