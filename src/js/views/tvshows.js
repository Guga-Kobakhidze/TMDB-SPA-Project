import { pagination } from "../components/pagination/pagination.js";
import { ProductsCard } from "../components/productCard.js";
import { Fetching, scrollToTop } from "../helpers/functions.js";
import { CategoryKeywords } from "../helpers/Links.js";

let currentPage = 1;

const allTvShows = (key) => {
  const app = document.getElementById("app");

  const loadTvShows = (page) => {
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

        const container = document.createElement("div");
        container.classList.add("ProductsSection");
        container.appendChild(allCardsContainer);
        container.insertAdjacentHTML("beforeend", pagination);

        app.innerHTML = "";
        app.appendChild(container);

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
