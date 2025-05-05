import { toHtmlElement } from "./toHtmlElement.mjs";

const siteTitle = "Issac Enrique Cervantes";
const header = toHtmlElement(
  `<header><h1>${siteTitle}</h1><label><input type="checkbox" autocomplete="off" />Dark Theme</label><button>Menu</button><nav><ul></ul></nav></header>`
);

function addSubpageToHeader(label, href) {
  const subpageElement = toHtmlElement(
    `<li><a href="${href}">${label}</a></li>`
  );

  header.firstChild.querySelector("nav ul").append(subpageElement);
}

addSubpageToHeader("Home", "index.html");
addSubpageToHeader("Education", "education.html");
addSubpageToHeader("Contact", "index.html#contact");

header.firstChild.querySelector("nav").classList.add("hidden-mobile-nav");
document.body.prepend(header);

const menuButton = document.querySelector("header button");
const nav = document.querySelector("header nav");
const themeToggler = document.querySelector("header input");

function menuButtonPressed() {
  nav.classList.toggle("hidden-mobile-nav");
}

function toggleTheme() {
  if (themeToggler.checked) {
    localStorage.setItem("theme", "dark");
    document.body.classList.add("dark-mode");
  } else {
    localStorage.setItem("theme", "light");
    document.body.classList.remove("dark-mode");
  }
}

function setTheme() {
  if (localStorage.getItem("theme") === "dark") {
    themeToggler.checked = true;
    toggleTheme();
  }
}

menuButton.addEventListener("click", menuButtonPressed);

document.body.addEventListener("click", (event) => {
  if (
    event.target !== document.querySelector("header") &&
    !document.querySelector("header").contains(event.target)
  ) {
    nav.classList.add("hidden-mobile-nav");
  }
});

themeToggler.addEventListener("change", toggleTheme);

setTheme();
