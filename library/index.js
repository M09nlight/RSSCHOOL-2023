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
Итого: 99 баллов

P.S: После дедлайна буду дорабатывать, если сможете перепроверить, отпишите пожалуйста.
`);
