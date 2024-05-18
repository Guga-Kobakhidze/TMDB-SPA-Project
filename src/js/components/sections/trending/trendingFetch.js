import { CategoryKeywords } from "../../../helpers/Links";
import { Fetching, Slider } from "../../../helpers/functions";
import { ProductsCard } from "../../productCard";

export function fetchTrending(key) {
  Fetching(CategoryKeywords.trending, CategoryKeywords.all + `/${key}`)
    .then((data) => {
      const container = document.createElement("div");
      container.classList.add("trendingContent");
      const trendingContent = document.querySelector(".trending");
      const mainSection = document.querySelector(".trendingSection");

      const backgroundArray = data.results.map((bg) => bg.backdrop_path);

      let randomNum = Math.floor(Math.random() * 20);
      mainSection.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${backgroundArray[randomNum]}")`;

      function getRendomBg() {
        let random = Math.floor(Math.random() * 20);
        randomNum = random;
        mainSection.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${backgroundArray[randomNum]}")`;
      }

      setInterval(getRendomBg, 9000);

      const cards = data.results.map((item) => {
        let title;
        let type;
        let date;

        if (item.title) {
          title = item.title;
          date = item.release_date;
          type = "movies";
        } else if (item.name) {
          title = item.name;
          date = item.first_air_date;
          type = "tv";
        }

        return ProductsCard(
          type,
          item.id,
          title,
          item.poster_path,
          item.vote_average,
          date,
          item.backdrop_path
        );
      });

      const trending = cards.join("");
      container.innerHTML = trending;

      trendingContent.innerHTML = "";
      trendingContent.appendChild(container);

      const leftBtn = document.querySelector(".handle-left");
      const rightBtn = document.querySelector(".handle-right");
      const sliderDay = document.querySelector(".trending .trendingContent");

      const trendingCards = document.querySelectorAll(".card");
      trendingCards.forEach((card) => {
        card.addEventListener("mouseover", () => {
          trendingCards.forEach((otherCards) => {
            if (otherCards != card) {
              otherCards.style.filter = "blur(5px)";
            }
          });
        });

        card.addEventListener("mouseout", () => {
          trendingCards.forEach((otherCards) => {
            if (otherCards != card) {
              otherCards.style.filter = "blur(0)";
            }
          });
        });
      });

      Slider(rightBtn, leftBtn, sliderDay, 200);
      return trendingContent;
    })
    .catch((err) => console.log(err));
}
