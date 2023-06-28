// hamburger
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector("header").classList.toggle("open");
  });
});

//  accordion

document.querySelectorAll(".accordion").forEach((el) => {
  el.addEventListener("click", () => {
    let content = el.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      document
        .querySelectorAll(".content")
        .forEach((el) => (el.style.maxHeight = null));
    } else {
      document
        .querySelectorAll(".content")
        .forEach((el) => (el.style.maxHeight = null));
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

//  accordion filter
document.querySelectorAll(".accordions").forEach((el) => {
  el.addEventListener("click", () => {
    let contents = el.nextElementSibling;
    console.log(contents);

    if (contents.style.maxHeight) {
      document
        .querySelectorAll(".contents")
        .forEach((el) => (el.style.maxHeight = null));
    } else {
      document
        .querySelectorAll(".contents")
        .forEach((el) => (el.style.maxHeight = null));
      contents.style.maxHeight = contents.scrollHeight + "px";
    }
  });
});

//  accordion filter 2
// const boxes = Array.from(document.querySelectorAll(".box"));

// boxes.forEach((box) => {
//   box.addEventListener("click", boxHandler);
// });

// function boxHandler(e) {
//   e.preventDefault();
//   let currentBox = e.target.closest(".box");
//   let currentContent = e.target.nextElementSibling;
//   currentBox.classList.toggle("active");

//   if (currentBox.classList.contains("active")) {
//     currentContent.style.maxHeight = currentContent.scrollHeight + "17px";
//   } else {
//     currentContent.style.maxHeight = 0;
//   }
// }
let intervalId;

document.querySelectorAll(".dropdown-toggle").forEach((e) => {
  e.addEventListener("click", (e) => {
    const menu = e.currentTarget.dataset.path;
    document.querySelectorAll(".dropdown-menu").forEach((e) => {
      if (
        !document
          .querySelector(`[data-target=${menu}]`)
          .classList.contains("open")
      ) {
        e.classList.remove("menu-active");
        e.classList.remove("open");
        document
          .querySelector(`[data-target=${menu}]`)
          .classList.add("menu-active");
        intervalId = setTimeout(() => {
          document.querySelector(`[data-target=${menu}]`).classList.add("open");
        }, 0);
      }

      if (
        document
          .querySelector(`[data-target=${menu}]`)
          .classList.contains("open")
      ) {
        clearTimeout(intervalId);
        document
          .querySelector(`[data-target=${menu}]`)
          .classList.remove("menu-active");
        intervalId = setTimeout(() => {
          document
            .querySelector(`[data-target=${menu}]`)
            .classList.remove("open");
        }, 0);
      }

      window.onclick = (e) => {
        if (
          e.target == document.querySelector(`[data-target=${menu}]`) ||
          e.target == document.querySelector(`[data-path=${menu}]`)
        ) {
          return;
        } else {
          document
            .querySelector(`[data-target=${menu}]`)
            .classList.remove("menu-active");
          document
            .querySelector(`[data-target=${menu}]`)
            .classList.remove("open");
        }
      };
    });
  });
});

// slider

const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".block_categories .fa-solid");
firstImg = carousel.querySelectorAll(".carousel_img")[0];

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcon = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcon(), 60);
  });
});

const autoSlid = () => {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0]).pageX - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcon();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlid();
};
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
