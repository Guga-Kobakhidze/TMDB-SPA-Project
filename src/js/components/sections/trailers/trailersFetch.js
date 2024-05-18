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
      const trailerCards = document.querySelector(".trailerCards");
      trailerCards.innerHTML = trailerCard.join("");
      trailerSection.appendChild(trailerCards);

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

      itemsArray.find((id) => {
        cardBoxes.forEach((card) => {
          card.addEventListener("mouseover", () => {
            const attr = card.getAttribute("id");
            if (id.id === Number(attr)) {
              document.querySelector(
                ".trailerSection"
              ).style.backgroundImage = `url("https://image.tmdb.org/t/p/original${id.background}")`;
            }
          });
        });
      });

      const TrailerCards = document.querySelector(".trailerCards");
      const rightBtn = document.querySelector(".handleRight");
      const leftBtn = document.querySelector(".handleLeft");

      Slider(rightBtn, leftBtn, TrailerCards, 365);

      TrailerCards.querySelectorAll(".trailerCard").forEach((card) => {
        card.addEventListener("click", () => {
          TrailerCards.style.opacity = "0";

          const Message = document.createElement("a");
          const attr = card.getAttribute("id");

          Message.setAttribute("href", `/movies/details?id=${attr}`);
          Message.setAttribute("data-link", "");
          Message.classList.add("Message");
          Message.innerHTML = "<i class='bx bxs-hand-right'></i> Watch Trailer";

          trailerSection.append(Message);

          setTimeout(() => {
            TrailerCards.style.scale = "0";
            Message.style.opacity = "1";

            const close = document.querySelector(".trailersHeading h2");
            close.innerHTML = "Close";
            close.style.cursor = "pointer";

            close.addEventListener(
              "click",
              () => {
                TrailerCards.style.scale = "1";
                Message.style.opacity = "0";
                Message.removeAttribute("href");
                Message.removeAttribute("data-link");

                setTimeout(() => {
                  TrailerCards.style.opacity = "1";
                  close.innerHTML = "Latest Trailers";
                  close.style.cursor = "default";
                }, 200);
              },
              { once: true }
            );
          }, 200);
        });
      });

      return trailerSection;
    })
    .catch((err) => {
      console.error(err);
    });
}
