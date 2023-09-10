const carousel = document.querySelector(".images__items");
let firstImg = carousel.querySelector(".images__item");
const arrowIcons = document.querySelectorAll(".arrow");
const paginationBtns = document.querySelectorAll(".pagination_btn");
let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  if (window.innerWidth <= 1024) {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].parentElement.style.visibility =
      Math.ceil(carousel.scrollLeft) == 0 ? "hidden" : "visible";
    arrowIcons[1].parentElement.style.visibility =
      Math.ceil(carousel.scrollLeft) >= scrollWidth ? "hidden" : "visible";
  }
};
const autoSlide = () => {
  //if there is no image left to scroll then returnfrom here;
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 45;
  let valDifference = firstImgWidth - positionDiff;
  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

arrowIcons.forEach((icon) => {
  let activeIdx = 0;
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 45;
    carousel.scrollLeft +=
      icon.id == "arrow--left" ? -firstImgWidth : firstImgWidth;
    paginationBtns.forEach((btn, idx) => {
      if (btn.classList.contains("active")) {
        if (
          (icon.id == "arrow--left" && idx != 0) ||
          (icon.id == "arrow--right" && idx != paginationBtns.length - 1)
        ) {
          btn.classList.remove("active");
          activeIdx = icon.id == "arrow--left" ? idx - 1 : idx + 1;
        }
      }
    });
    paginationBtns[activeIdx].classList.add("active");
    setTimeout(() => showHideIcons(), 600);
  });
});

paginationBtns.forEach((icon, newIdx) => {
  icon.addEventListener("click", () => {
    let oldIdx;
    paginationBtns.forEach((btn, idx) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        oldIdx = idx;
      }
    });
    icon.classList.add("active");

    if (oldIdx != newIdx) {
      let firstImgWidth = (firstImg.clientWidth + 45) * (newIdx - oldIdx);
      carousel.scrollLeft += firstImgWidth;
      setTimeout(() => showHideIcons(), 600);
    }
  });
});

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragStart) return;
  isDragging = true;
  e.preventDefault();
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};
const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
