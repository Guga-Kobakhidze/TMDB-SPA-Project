import { CategoryKeywords } from "../../../helpers/Links";
import { Fetching, Slider } from "../../../helpers/functions";
import { ProductsCard } from "../../productCard";

export function fetchTrending(key, clasName) {
  Fetching(CategoryKeywords.trending, CategoryKeywords.movie + `/${key}`)
    .then((data) => {
      const container = document.createElement("div");
      container.classList.add("trendingContent");
      const trendingContent = document.querySelector(`.${clasName}`);
      const mainSection = document.querySelector(".trendingSection");

      const backgroundArray = data.results.map((bg) => bg.backdrop_path);

      let randomNum = Math.floor(Math.random() * 20);
      mainSection.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${backgroundArray[randomNum]}")`;

      function getRendomBg() {
        let random = Math.floor(Math.random() * 20);
        randomNum = random;
        mainSection.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${backgroundArray[randomNum]}")`;
      }

      setInterval(getRendomBg, 10000);

      const cards = data.results.map((item) => {
        return ProductsCard(
          "movies",
          item.id,
          item.title,
          item.poster_path,
          item.vote_average,
          item.release_date,
          item.backdrop_path
        );
      });

      const trending = cards.join("");
      container.innerHTML = trending;
      trendingContent.appendChild(container);

      const leftBtn = document.querySelector(".handle-left");
      const rightBtn = document.querySelector(".handle-right");
      const sliderDay = document.querySelector(
        ".trendingToday .trendingContent"
      );
      const sliderWeek = document.querySelector(
        ".trendingWeek .trendingContent"
      );

      Slider(rightBtn, leftBtn, sliderDay);
      Slider(rightBtn, leftBtn, sliderWeek);
    })
    .catch((err) => console.log(err));
}
