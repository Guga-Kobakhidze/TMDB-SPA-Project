import { pagination } from "../components/pagination/pagination.js";
import { ProductsCard } from "../components/productCard.js";
import { Fetching, scrollToTop } from "../helpers/functions.js";
import { CategoryKeywords } from "../helpers/Links.js";
import { Filter } from "../components/filter/filter.js";
import routes from "../route/route.js";

let currentPage = 1;

const allMovies = (key) => {
  const app = document.getElementById("app");

  const loadMovies = (page) => {
    Fetching(CategoryKeywords.movie, key, `page=${page}`)
      .then((data) => {
        const movieCards = data.results.map((card) => {
          return ProductsCard(
            "movies",
            card.id,
            card.title,
            card.poster_path,
            card.vote_average,
            card.release_date
          );
        });

        const allCards = movieCards.join("");
        const allCardsContainer = document.createElement("div");
        allCardsContainer.classList.add("AllCards");
        allCardsContainer.innerHTML = allCards;

        const filterSection = Filter();

        const container = document.createElement("div");
        container.classList.add("ProductsSection");

        const productsContent = document.createElement("div");
        productsContent.classList.add("productsContent");
        productsContent.classList.add("container");

        let view = routes[location.pathname];
        const mainTitle = document.createElement("h1");
        mainTitle.classList.add("mainTitle");
        mainTitle.innerHTML = view.title;

        productsContent.append(filterSection, allCardsContainer);
        container.append(mainTitle, productsContent);
        container.insertAdjacentHTML("beforeend", pagination);

        app.innerHTML = "";
        app.appendChild(container);

        const sortClick = document.querySelector(".sortBox .title");
        const sortContent = document.querySelector(".sortContent");

        const filterClick = document.querySelector(".filterBox .title");
        const filterContent = document.querySelector(".filterContent");

        function getSearch(item, content, className) {
          item.addEventListener("click", () => {
            content.classList.toggle(className);
          });
        }

        getSearch(sortClick, sortContent, "showSort");
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
      })
      .catch((err) => console.error(err));
  };

  loadMovies(currentPage);
};

export default allMovies;
