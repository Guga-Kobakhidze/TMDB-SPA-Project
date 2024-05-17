import { CategoryKeywords, MovieKeywords } from "../../../helpers/Links";
import { Fetching, Slider } from "../../../helpers/functions";
import { TrailerCard } from "./trailers";

export function fetchTrending() {
  let itemsArray = [];

  Fetching(CategoryKeywords.movie, MovieKeywords.now_playing, `page=${3}`)
    .then((data) => {
      const results = data.results;
      results.map((item) => {
        itemsArray.push({
          id: item.id,
          background: item.backdrop_path,
          image: item.poster_path,
          title: item.original_title,
        });
      });

      const trailerCard = itemsArray.map((item) => {
        return TrailerCard(item.id, item.image, item.title, item.background);
      });

      const randomNum = Math.floor(Math.random() * 21);
      document.querySelector(
        ".trailerSection"
      ).style.backgroundImage = `url("https://image.tmdb.org/t/p/original${itemsArray[randomNum].background}")`;

      const trailerSection = document.querySelector(".trailers");
      trailerSection.innerHTML = trailerCard.join("");

      const cardBoxes = document.querySelectorAll(".trailerCard");

      // easy variant --->

      //   cardBoxes.forEach((item) => {
      //     item.addEventListener("click", () => {
      //       const attr = item.getAttribute("data");
      //       document.querySelector(
      //         ".trailerSection"
      //       ).style.backgroundImage = `url("https://image.tmdb.org/t/p/original${attr}")`;
      //     });
      //   });

      //  hard variant -->

      itemsArray.filter((id) => {
        cardBoxes.forEach((card) => {
          card.addEventListener("mouseover", () => {
            const attr = card.getAttribute("id");

            console.log(attr);

            if (id.id === Number(attr)) {
              document.querySelector(
                ".trailerSection"
              ).style.backgroundImage = `url("https://image.tmdb.org/t/p/original${id.background}")`;
            }
          });
        });
      });

      return trailerSection;
    })
    .catch((err) => {
      console.error(err);
    });
}
