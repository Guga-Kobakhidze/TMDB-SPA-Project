import { Fetching, scrollToTop } from "../../helpers/functions";

export function SearchedItem(img, title) {
  const searchedItems = `
        <img src="${img}"/>
        <h1>${title}</h1>
    `;

  console.log(searchedItems);

  return searchedItems;
}

const Search = document.querySelector(".SearchForm");
const SearchInput = document.querySelector(".SearchInput");

Search.addEventListener("submit", (e) => {
  e.preventDefault();

  Fetching("search", "movie", `query=${SearchInput.value}&page=${1}`).then(
    (data) => {
      const items = data.results;
      items.map((item) => {
        SearchedItem(item.backdrop_path, item.title);
      });
    }
  );
});
