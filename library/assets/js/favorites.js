const seasonsNav = document.querySelectorAll(".custom_label");
const favoriteItems = document.querySelectorAll(".favorite__items");
console.log(seasonsNav);
seasonsNav.forEach((season, index) => {
  season.addEventListener("click", () => {
    favoriteItems.forEach((s, index) => {
      s.classList.remove("favorite__items--active-target");
    });
    favoriteItems[index].classList.add("favorite__items--active-target");
  });
});
