import { Fetching, setupEventListeners } from "../helpers/functions.js";
import { CategoryKeywords } from "../helpers/Links.js";
import { ProductsCard } from "../components/productCard.js";
import { getItemPage } from "../helpers/cardList.js";
import { Loader } from "../components/loader/loader.js";

let currentPage = 1;

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

        getItemPage(tvShowCards, loadTvShows, currentPage);

        // Checkbox Inputes for filter

        const tvShowSearchAllCheckBox = document.getElementById("searchAll");
        const tvShowReleaseCheckes = document.querySelector(".otherCheckboxes");
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
          tvShowReleaseCheckes,
          (data) => {
            console.log(data);
          }
        );
      })
      .catch((err) => console.error(err));
  };

  loadTvShows(currentPage);
};

export default allTvShows;
