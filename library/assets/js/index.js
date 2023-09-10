let profile = document.querySelector(".profile__img");
let noAuthComponent = document.querySelector(".drop-menu-nav--no-auth");

profile.addEventListener("click", (e) => {
  noAuthComponent.classList.toggle("drop-menu-nav--active-target");
  if (burger.classList.contains("active")) {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
    document.body.classList.toggle("lock");
  }
  e.stopPropagation();
});

document.body.addEventListener("click", (event) => {
  if (!event.target.closest(".drop-menu-nav--active-target")) {
    if (noAuthComponent.classList.contains("drop-menu-nav--active-target")) {
      noAuthComponent.classList.toggle("drop-menu-nav--active-target");
    }
  }
});
