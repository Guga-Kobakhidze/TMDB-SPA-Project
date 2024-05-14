import { pagination } from "../../components/pagination/pagination";
import { SearchedItem, searchedValues } from "../../components/search/searched";
import { Fetching, SearchFunction, scrollToTop } from "../../helpers/functions";

const app = document.getElementById("app");
let currentPage = 1;
let fetchKey = "movie";

const SearchData = (query) => {
  const searchQuery =
    query || new URLSearchParams(window.location.search).get("query") || "";

  const searchItem = (page, key) => {
    Fetching("search", key, `query=${searchQuery}&page=${page}`)
      .then((items) => {
        const Items = items.results.map((item) =>
          SearchedItem(
            `${key}s`,
            item.backdrop_path,
            item.title,
            item.release_date,
            item.overview,
            item.id
          )
        );

        Fetching("search", "movie", `query=${query}`).then((movie) => {
          Fetching("search", "tv", `query=${query}`).then((tv) => {
            Fetching("search", "person", `query=${query}`).then((person) => {
              const values = document.createElement("div");
              values.classList.add("searchedValues");
              values.innerHTML = searchedValues(
                movie.total_results,
                tv.total_results,
                person.total_results
              );
              const allCards = Items.join("");
              const container = document.createElement("div");
              container.classList.add("searchedContent");
              container.classList.add("container");

              const searchedCards = document.createElement("div");
              searchedCards.classList.add("searchedCard");

              searchedCards.innerHTML = allCards;

              container.append(values, searchedCards);
              const mainContent = document.createElement("div");
              mainContent.classList.add("mainContent");

              mainContent.append(container);
              mainContent.insertAdjacentHTML("beforeend", pagination);

              app.innerHTML = "";
              app.append(mainContent);

              const filterResults = document.querySelectorAll(".filterResult");

              filterResults.forEach((result) => {
                result.addEventListener("click", () => {
                  const accessKey = result.getAttribute("accesskey");

                  switch (accessKey) {
                    case "movie":
                      fetchKey = "movie";
                      searchItem(currentPage, fetchKey);
                      break;
                    case "tv":
                      fetchKey = "tv";
                      searchItem(currentPage, fetchKey);
                      break;
                    case "people":
                      fetchKey = "person";
                      searchItem(currentPage, fetchKey);
                      break;
                  }
                });
              });

              const nextBtn = mainContent.querySelector(".next");
              const prevBtn = mainContent.querySelector(".prev");

              console.log(nextBtn, prevBtn);
              nextBtn.addEventListener("click", () => {
                currentPage++;
                searchItem(currentPage);
                console.log(currentPage);
                scrollToTop();
              });

              prevBtn.addEventListener("click", () => {
                if (currentPage > 1) {
                  currentPage--;
                  searchItem(currentPage);
                  scrollToTop();
                }
              });
            });
          });
        });
      })
      .catch((err) => console.error(err));
  };

  searchItem(currentPage, fetchKey);
  history.pushState({}, "", `/search/items?query=${searchQuery}`);
};

export default SearchData;

const SearchForm = document.querySelector(".SearchForm");
const SearchInput = document.querySelector(".SearchInput");

SearchFunction(SearchInput, SearchForm);
