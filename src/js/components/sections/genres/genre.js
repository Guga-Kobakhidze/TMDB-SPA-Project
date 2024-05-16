import { CategoryKeywords } from "../../../helpers/Links";
import { Fetching } from "../../../helpers/functions";

export function GetGenres(key) {
  const genreBox = document.createElement("div");
  genreBox.classList.add("genreBox");

  fetchGenres(genreBox, key);

  return genreBox;
}

function fetchGenres(genreList, key) {
  Fetching(CategoryKeywords.genre, key + "/list")
    .then((data) => {
      const genres = data.genres.map((genre) => {
        const genreItem = document.createElement("a");

        genreItem.textContent = genre.name;
        genreItem.href = `/search/items?query=${genreItem.innerHTML}`;
        return genreItem;
      });

      genres.map((genre) => {
        genreList.appendChild(genre);
      });
    })
    .catch((error) => {
      console.error("Error fetching genres:", error);
    });
}
