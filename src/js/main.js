import { scrollToTop } from "./helpers/functions";
import routes from "./route/route";

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

  scrollToTop();

  if (target && target.matches("[data-link]")) {
    event.preventDefault();
    const href = target.getAttribute("href");

    const linkType = target.getAttribute("data-show-type");
    if (linkType === "movie") {
      history.pushState(null, "", `/movies/${linkType}`);
    } else if (linkType === "tvShows") {
      history.pushState(null, "", `/tvshows/${linkType}`);
    } else {
      history.pushState(null, "", href);
    }
    router();
  }
}

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
window.addEventListener("popstate", router);
