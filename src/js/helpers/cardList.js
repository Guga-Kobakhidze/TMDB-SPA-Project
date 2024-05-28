import { Filter } from "../components/filter/filter";
import { pagination } from "../components/pagination/pagination";
import routes from "../route/route";
import { scrollToTop } from "./functions";

export function getItemPage(movieCards, loadMovies, currentPage) {
  const app = document.getElementById("app");
  const allCards = movieCards.join("");
  const allCardsContainer = document.createElement("div");
  allCardsContainer.classList.add("AllCards");
  allCardsContainer.innerHTML = allCards;

  const filterSection = Filter();

  const container = document.createElement("div");
  container.classList.add("ProductsSection");
  container.classList.add("container");

  const productsContent = document.createElement("div");
  productsContent.classList.add("productsContent");

  let view = routes[location.pathname];
  const mainTitle = document.createElement("h1");
  mainTitle.classList.add("mainTitle");
  mainTitle.innerHTML = view.title;

  productsContent.append(filterSection, allCardsContainer);
  container.append(mainTitle, productsContent);
  container.insertAdjacentHTML("beforeend", pagination);
  app.innerHTML = "";
  app.appendChild(container);

  const filterClick = document.querySelector(".filterBox .title");
  const filterContent = document.querySelector(".filterContent");

  function getSearch(item, content, className) {
    item.addEventListener("click", () => {
      content.classList.toggle(className);
    });
  }

  getSearch(filterClick, filterContent, "show");

  const nextBtn = container.querySelector(".next");
  const prevBtn = container.querySelector(".prev");

  nextBtn.addEventListener("click", () => {
    currentPage++;
    loadMovies(currentPage);
    scrollToTop();
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadMovies(currentPage);
      scrollToTop();
    }
  });

  return container;
}
