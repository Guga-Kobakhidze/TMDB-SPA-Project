import { Filter } from "../components/filter/filter.js";
import { Loader } from "../components/loader/loader.js";
import { pagination } from "../components/pagination/pagination.js";
import { ProductsCard } from "../components/productCard.js";
import {
  Fetching,
  scrollToTop,
  setupEventListeners,
} from "../helpers/functions.js";
import { CategoryKeywords } from "../helpers/Links.js";
import routes from "../route/route.js";

let currentPage = 1;

const allTvShows = (key) => {
  const app = document.getElementById("app");

  const loadTvShows = (page) => {
    Loader("flex");

    Fetching(CategoryKeywords.tv, key, `page=${page}`)
      .then((data) => {
        const tvShowCards = data.results.map((card) => {
          return ProductsCard(
            "tvshows",
            card.id,
            card.name,
            card.poster_path,
            card.vote_average,
            card.first_air_date
          );
        });

        const allCards = tvShowCards.join("");
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

        const tvShowSearchAllCheckBox = document.getElementById("searchAll");
        const tvShowReleaseCheckes = document.querySelector(".otherCheckboxes");
        // Checkboxes
        const tvShowCheckboxes = document.querySelectorAll(
          ".filterRelease input"
        );

        // radios
        const tvShowRadios = document.querySelectorAll(".filterShow input");

        // genres
        const tvShowGenres = document.querySelector(".allGenres");

        // dates

        const tvShowRelFrom = document.getElementById("releaseFrom");
        const tvShowRelTo = document.getElementById("releaseTo");

        // languages
        const tvShowSelectEls = document.querySelector(".languages");

        // range
        const tvShowRange1 = document.querySelector(".range01");
        const tvShowRange2 = document.querySelector(".range02");

        setupEventListeners(
          tvShowRelFrom,
          tvShowRelTo,
          tvShowRange1,
          tvShowRange2,
          tvShowGenres,
          tvShowSelectEls,
          tvShowCheckboxes,
          tvShowRadios,
          tvShowSearchAllCheckBox,
          tvShowReleaseCheckes
        );

        const nextBtn = container.querySelector(".next");
        const prevBtn = container.querySelector(".prev");

        nextBtn.addEventListener("click", () => {
          currentPage++;
          loadTvShows(currentPage);
          scrollToTop();
        });

        prevBtn.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            loadTvShows(currentPage);
            scrollToTop();
          }
        });
      })
      .catch((err) => console.error(err));
  };

  loadTvShows(currentPage);
};

export default allTvShows;
