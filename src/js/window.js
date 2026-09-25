const onLoad = () => {
  document.body.classList.add("loaded");
};

const onScroll = () => {
  // let header = document.getElementById("header");
  let header = document.querySelector("[data-header]");
  let offset = window.pageYOffset;

  if (offset > 3) {
    header.classList.add("scrolled");
    header.classList.add("header--charcoal");
  } else {
    header.classList.remove("scrolled");
    header.classList.remove("header--charcoal");
  }
};

// window onload, resize, scroll
window.addEventListener("load", onLoad);
window.addEventListener("scroll", onScroll);

document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.classList.add("dom-loaded");
  document.querySelector("body").classList.add("dom-loaded");
});
