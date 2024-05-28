import { Fetching, setupEventListeners } from "../helpers/functions.js";
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

        getItemPage(movieCards, loadMovies, currentPage);

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
            console.log(data);
          }
        );
      })
      .catch((err) => console.error(err));
  };

  loadMovies(currentPage);
};

export default allMovies;
