import {
  Fetching,
  scrollToTop,
  setupEventListeners,
} from "../helpers/functions.js";
import { CategoryKeywords } from "../helpers/Links.js";
import { ProductsCard } from "../components/productCard.js";
import { getItemPage } from "../helpers/cardList.js";
import { Loader } from "../components/loader/loader.js";

let currentPage = 1;

const allMovies = (key) => {
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

        // get Movie cards

        getItemPage(movieCards);

        // Checkbox Inputes for filter

        const movieSearchAllCheckBox = document.getElementById("searchAll");
        const movieReleaseCheckes = document.querySelector(".otherCheckboxes");
        const movieRadios = document.querySelectorAll(".filterShow input");
        const movieGenres = document.querySelector(".allGenres");
        const movieRelFrom = document.getElementById("releaseFrom");
        const movieRelTo = document.getElementById("releaseTo");
        const movieSelectEls = document.querySelector(".languages");
        const movieRange1 = document.querySelector(".range01");
        const movieRange2 = document.querySelector(".range02");
        const movieCheckboxes = document.querySelectorAll(
          ".filterRelease input"
        );

        // Get Filter Function

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
          movieReleaseCheckes,
          (data) => {
            const showMe = data.radio;
            const fromDate = data.releaseFrom;
            const toDate = data.releaseTo;
            const language = data.selectedLanguage;
            const fromRate = data.rangeFrom;
            const toRate = data.rangeTo;

            const genres = data.genreStates;
            const genreArray = Object.entries(genres).map(([key]) => ({ key }));

            const releaseDates = data.checkboxStates;
            const releaseDatesArray = Object.entries(releaseDates).map(
              ([key]) => ({
                key,
              })
            );

            const filterGenre = genreArray.map((val) => val.key).join(",");

            Fetching(
              "discover",
              "movie",
              `page=${page}${filterGenre ? `&with_genres=${filterGenre}` : ""}${
                language ? `&language=${language}` : ""
              }${
                fromRate
                  ? `&vote_count.gte=${fromRate}&vote_count.lte=${toRate}`
                  : ""
              }`
            )
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

                // get Movie cards

                getItemPage(movieCards);

                document.querySelector(".next").style.display = "none";
                document.querySelector(".prev").style.display = "none";
              })
              .catch((err) => console.error(err));
          }
        );

        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".prev");

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
