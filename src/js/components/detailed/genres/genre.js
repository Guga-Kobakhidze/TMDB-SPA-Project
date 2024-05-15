import { CategoryKeywords } from "../../../helpers/Links";
import { Fetching } from "../../../helpers/functions";

export function GetGenres() {
  const genreBox = document.createElement("div");
  genreBox.classList.add("genreBox");

  fetchGenres(genreBox);

  return genreBox;
}

function fetchGenres(genreList) {
  Fetching(CategoryKeywords.genre, CategoryKeywords.movie + "/list")
    .then((data) => {
      const genres = data.genres.map((genre) => {
        const genreItem = document.createElement("h1");
        genreItem.textContent = genre.name;
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
