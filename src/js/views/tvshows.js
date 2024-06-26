import { Fetching, scrollToTop } from "../helpers/functions.js";
import { CategoryKeywords } from "../helpers/Links.js";
import { ProductsCard } from "../components/productCard.js";
import { getItemPage, setupEventListeners } from "../helpers/cardList.js";
import { Loader } from "../components/loader/loader.js";

let currentPage = 1;
const filters = { checkboxStates: [], genreStates: [] };

const allTvShows = (key) => {
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

        // get TV Show cards

        getItemPage(tvShowCards, "tv");

        // Checkbox Inputes for filter

        const tvShowSearchAllCheckBox = document.getElementById("searchAll");
        const tvShowRadios = document.querySelectorAll(".filterShow input");
        const tvShowGenres = document.querySelector(".allGenres");
        const tvShowRelFrom = document.getElementById("releaseFrom");
        const tvShowRelTo = document.getElementById("releaseTo");
        const tvShowSelectEls = document.querySelector(".languages");
        const tvShowRange1 = document.querySelector(".range01");
        const tvShowRange2 = document.querySelector(".range02");
        const tvShowCheckboxes = document.querySelectorAll(
          ".filterRelease input"
        );

        // Get Filter Function

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
          filters
        );

        // Form submit event
        const filterForm = document.querySelector(".filter-form");
        let accumulatedTVShows = [];

        filterForm.addEventListener("submit", (e) => {
          e.preventDefault();
          scrollToTop();
          accumulatedTVShows = [];
          document.querySelector(".AllCards").innerHTML = "";

          const showMe = filters.radio;
          const fromDate = filters.releaseFrom;
          const toDate = filters.releaseTo;
          const language = filters.selectedLanguage;
          const fromRate = filters.rangeFrom;
          const toRate = filters.rangeTo;

          const genres = filters.genreStates;
          const genreArray = Object.entries(genres).map(([key]) => ({ key }));

          const filterGenre = genreArray.map((val) => val.key).join(",");

          let perPage = 1;
          document.getElementById("Loader").style.display = "none";

          const fetchingFilter = (perPage) =>
            Fetching(
              "discover",
              "tv",
              `page=${perPage}${
                filterGenre ? `&with_genres=${filterGenre}` : ""
              }${language ? `&with_original_language=${language}` : ""}${
                fromRate
                  ? `&vote_count.gte=${fromRate}&vote_count.lte=${toRate}`
                  : ""
              }${showMe ? `&show_me=${showMe}` : ""}${
                fromDate
                  ? `&release_date.gte=${fromDate}&release_date.lte=${toDate}`
                  : ""
              }`
            ).then((data) => {
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

              accumulatedTVShows = [...accumulatedTVShows, ...tvShowCards];

              prevBtn.style.display = "none";
              nextBtn.style.display = "none";

              document.querySelector(".AllCards").innerHTML =
                accumulatedTVShows.join(" ");

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
            } else {
              document.getElementById("Loader").style.display = "none";
            }
          };

          fetchingFilter(perPage);
        });

        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".prev");

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
