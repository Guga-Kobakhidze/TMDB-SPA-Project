import home from "./views/home.js";
import tvshows from "./views/tvshows.js";
import movies from "./views/movies.js";

const routes = {
  "/": { title: "Home", render: home },
  "/movies": { title: "Movies", render: myRender },
  "/tvshows": { title: "Tv Shows", render: tvshows },
};

// function myRender() {
//   movies("upcoming")

//   const Href = document.querySelector(".movieKey")
// console.log(Href.getAttribute(["data-movie-type"]))

// }

function router() {
  let view = routes[location.pathname];

  if (view) {
    document.title = view.title;
    view.render();
  } else {
    history.replaceState("", "", "/");
    router();
  }
}

function handleLinkClick(event) {
  const target = event.target.closest("a");

  if (target && target.matches("[data-link]")) {
    event.preventDefault();
    const href = target.getAttribute("href");
    history.pushState(null, "", href);
    router();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  router();

  document.addEventListener("click", handleLinkClick);

  // Header Function
  const Header = document.getElementById("main-header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop && currentScroll > 200) {
      Header.style.transform = "translateY(-100%)";
    } else {
      Header.style.transform = "translateY(0)";
    }

    lastScrollTop = currentScroll;
  });
});

window.addEventListener("popstate", router);
