let stickySeasonTitle = document.querySelector(".seasons");
let nextSection = document.querySelector("#coffeeshop");
let coordsSticky = getCoords(stickySeasonTitle);
let coordNextSection = getCoords(nextSection);
document.addEventListener("scroll", () => {
  if (
    window.scrollY > coordsSticky.top - coordsSticky.height * 2 &&
    window.scrollY < coordNextSection.top - coordsSticky.height * 3
  ) {
    stickySeasonTitle.classList.add("sticky");
  } else stickySeasonTitle.classList.remove("sticky");
});

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.scrollY,
    right: box.right + window.scrollX,
    bottom: box.bottom + window.scrollY,
    left: box.left + window.scrollX,
    height: box.height,
  };
}
