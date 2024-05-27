import { pagination } from "../components/pagination/pagination.js";
import { ProductsCard } from "../components/productCard.js";
import {
  Fetching,
  scrollToTop,
  setupEventListeners,
} from "../helpers/functions.js";
import { CategoryKeywords } from "../helpers/Links.js";
import { Filter } from "../components/filter/filter.js";
import { Loader } from "../components/loader/loader.js";
import routes from "../route/route.js";

let currentPage = 1;

const allMovies = (key) => {
  const app = document.getElementById("app");

  const loadMovies = (page) => {
    Loader("flex");

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

        // Checkboxes Release Date

        const movieSearchAllCheckBox = document.getElementById("searchAll");
        const movieReleaseCheckes = document.querySelector(".otherCheckboxes");
        // Checkboxes
        const movieCheckboxes = document.querySelectorAll(
          ".filterRelease input"
        );

        // radios
        const movieRadios = document.querySelectorAll(".filterShow input");

        // genres
        const movieGenres = document.querySelector(".allGenres");

        // dates

        const movieRelFrom = document.getElementById("releaseFrom");
        const movieRelTo = document.getElementById("releaseTo");

        // languages
        const movieSelectEls = document.querySelector(".languages");

        // range
        const movieRange1 = document.querySelector(".range01");
        const movieRange2 = document.querySelector(".range02");

        setupEventListeners(
          movieRelFrom,
          movieRelTo,
          movieRange1,
          movieRange2,
          movieGenres,
          movieSelectEls,
          movieCheckboxes,
          movieRadios,
          movieSearchAllCheckBox,
          movieReleaseCheckes
        );

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
