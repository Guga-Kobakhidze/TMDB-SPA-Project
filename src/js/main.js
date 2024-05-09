import home from "./views/home.js";
import tvshows from "./views/tvshows.js";
import movies from "./views/movies.js";

const routes = {
  "/": { title: "Home", render: home },
  "/movies": { title: "Movies", render: movies },
  "/tvshows": { title: "Tv Shows", render: tvshows },
};

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

window.addEventListener("DOMContentLoaded", () => {
  router();

  window.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState("", "", e.target.href);
      router();
    }
  });

  window.addEventListener("popstate", router);

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