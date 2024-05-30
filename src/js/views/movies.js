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
const filters = { checkboxStates: [], genreStates: [] };
console.log("MyFilter", filters);

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

        // Checkbox Inputs for filter
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

        // Set up event listeners
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
          filters
        );

        // Form submit event
        const filterForm = document.querySelector(".filter-form");
        let accumulatedMovies = [];

        filterForm.addEventListener("submit", (e) => {
          e.preventDefault();
          scrollToTop();
          accumulatedMovies = [];
          document.querySelector(".AllCards").innerHTML = "";

          const showMe = filters.radio;
          const fromDate = filters.releaseFrom;
          const toDate = filters.releaseTo;
          const language = filters.selectedLanguage;
          const fromRate = filters.rangeFrom;
          const toRate = filters.rangeTo;

          const genres = filters.genreStates;
          const genreArray = Object.entries(genres).map(([key]) => ({ key }));

          const releaseDates = filters.checkboxStates;
          const releaseDatesArray = Object.entries(releaseDates).map(
            ([key]) => ({
              key,
            })
          );
          const release_dates = releaseDatesArray
            .map((val) => Number(val.key.slice(0, 1)))
            .join("|");

          const filterGenre = genreArray.map((val) => val.key).join(",");

          let perPage = 1;

          const fetchingFilter = (perPage) =>
            Fetching(
              "discover",
              "movie",
              `page=${perPage}${
                filterGenre ? `&with_genres=${filterGenre}` : ""
              }${language ? `&with_original_language=${language}` : ""}${
                fromRate
                  ? `&vote_count.gte=${fromRate}&vote_count.lte=${toRate}`
                  : ""
              }${showMe ? `&show_me=${showMe}` : ""}${
                release_dates && release_dates !== "searchAll"
                  ? `&with_release_type=${release_dates}`
                  : ""
              }${
                fromDate
                  ? `&release_date.gte=${fromDate}&release_date.lte=${toDate}`
                  : ""
              }`
            ).then((data) => {
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

              accumulatedMovies = [...accumulatedMovies, ...movieCards];

              prevBtn.style.display = "none";
              nextBtn.style.display = "none";

              document.querySelector(".AllCards").innerHTML =
                accumulatedMovies.join(" ");

              window.addEventListener("scroll", handleScroll);
            });

          const handleScroll = () => {
            if (
              window.innerHeight + window.scrollY >=
              document.body.scrollHeight - 1
            ) {
              document.getElementById("Loader").style.display = "flex";
              window.removeEventListener("scroll", handleScroll);
              setTimeout(() => {
                perPage++;
                fetchingFilter(perPage).then(() => {
                  document.getElementById("Loader").style.display = "none";
                  window.addEventListener("scroll", handleScroll);
                });
              }, 500);
            }
          };

          fetchingFilter(perPage);
        });

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
