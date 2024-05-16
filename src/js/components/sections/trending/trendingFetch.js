import { CategoryKeywords } from "../../../helpers/Links";
import { Fetching, Slider } from "../../../helpers/functions";
import { ProductsCard } from "../../productCard";

export function fetchTrending(key) {
  Fetching(CategoryKeywords.trending, CategoryKeywords.movie + `/${key}`)
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

      const trendBtns = document.querySelectorAll(".trendBtn");
      const contentCard = document.querySelector(".trending");
      trendBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          contentCard.style.filter = "blur(5px)";
          contentCard.style.opacity = "0";
          setTimeout(() => {
            contentCard.style.filter = "blur(0)";
            contentCard.style.opacity = "1";
          }, 500);
        });
      });

      Slider(rightBtn, leftBtn, sliderDay);
      return trendingContent;
    })
    .catch((err) => console.log(err));
}
