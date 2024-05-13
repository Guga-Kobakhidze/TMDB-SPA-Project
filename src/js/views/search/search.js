import { Fetching, scrollToTop } from "../../helpers/functions";

export function SearchedItem(key, img, title, id) {
  const searchedItems = `
        <a href="/${key}/details?id=${id}" data-link>
          <img width="300px" src="https://image.tmdb.org/t/p/original${img}"/>
          <h1>${title}</h1>
        </a>
    `;

  return searchedItems;
}

export function searchedValues(movie, tv, person) {
  const searchedValues = `
      <div>
          <h1>${movie}</h1>
          <h1>${tv}</h1>
          <h1>${person}</h1>
      </div>
    `;

  return searchedValues;
}

const app = document.getElementById("app");

const SearchData = (query) => {
  const searchMovies = () => {
    Fetching("search", "movie", `query=${query}&page=${1}`)
      .then((items) => {
        const Items = items.results.map((item) =>
          SearchedItem("movies", item.backdrop_path, item.title, item.id)
        );

        Fetching("search", "movie", `query=${query}`).then((movie) => {
          Fetching("search", "tv", `query=${query}`).then((tv) => {
            Fetching("search", "person", `query=${query}`).then((person) => {
              const allCards = Items.join("");
              const container = document.createElement("div");
              container.classList.add("searchedContent");
              container.classList.add("container");

              const searchedCards = document.createElement("div");
              searchedCards.classList.add("searchedCard");

              searchedCards.innerHTML = allCards;

              const values = document.createElement("div");
              values.classList.add("searchedValues");
              values.innerHTML = searchedValues(
                movie.total_results,
                tv.total_results,
                person.total_results
              );

              container.append(searchedCards, values);

              app.innerHTML = "";
              app.append(container);
            });
          });
        });
      })
      .catch((err) => console.error(err));
  };

  searchMovies();
  history.pushState({}, "", `/search/query=${query}`);
};

export default SearchData;

const SearchForm = document.querySelector(".SearchForm");
const SearchInput = document.querySelector(".SearchInput");

SearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchQuery = SearchInput.value.trim();
  localStorage.setItem("searchQuery", searchQuery);

  scrollToTop();
  SearchData(searchQuery);

  setTimeout(() => {
    SearchInput.value = "";
    SearchForm.classList.remove("showSearch");
  }, 0);
});

SearchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchQuery = SearchInput.value.trim();
  localStorage.setItem("searchQuery", searchQuery);

  SearchData(searchQuery);
  setTimeout(() => {
    SearchInput.value = "";
    SearchForm.classList.remove("showSearch");
  }, 0);
});

// window.addEventListener("load", () => {
//   const savedQuery = localStorage.getItem("searchQuery");
//   const currentLocation = window.location.pathname;

//   if (currentLocation.includes("/search/query") && savedQuery) {
//     SearchData(savedQuery);
//   } else {
//     if (savedQuery) {
//       localStorage.removeItem("searchQuery");
//       history.pushState({}, "", `/search/query=${savedQuery}`);
//       SearchData(savedQuery);
//     }
//   }
// });
