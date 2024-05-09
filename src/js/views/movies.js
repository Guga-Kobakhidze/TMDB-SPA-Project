import { Fetching, scrollToTop } from "../helpers/functions.js";
import { CategoryKeywords, MovieKeywords } from "../helpers/Links.js";

let currentPage = 1;

const DetailedPage = (id, title, img, vote, date) => {
  let colorChange = "";

  if (vote >= 4 && vote < 7) {
    colorChange = "rgb(169, 169, 25)";
  } else if (vote >= 7) {
    colorChange = "rgb(14, 90, 14)";
  } else {
    colorChange = "rgb(155, 155, 155)";
  }

  const detailedPage = `
    <a href="/" data-link>
        <div class="card" key="${id}"> 
            <img src="https://image.tmdb.org/t/p/w500${img}" alt="${title}"/>
            <div class="card-content">
                <div class="precent"> 
                    <div class="precentColor" style="border: 2px solid ${colorChange}"></div>
                    <h3>${vote
                      .toString()
                      .replace(".", "")
                      .slice(0, 2)} <span>%</span></h3>
                </div>
                <h1>${title}</h1>
                <p>${date}</p>
            </div>
        </div>
    </a>
  `;

  return detailedPage;
};

const allMovies = (key) => {
  const app = document.getElementById("app");

  const loadMovies = (page) => {
    Fetching(CategoryKeywords.movie, key, `page=${page}`)
      .then((data) => {
        const trendingCards = data.results.map((card) => {
          return DetailedPage(
            card.id,
            card.title,
            card.poster_path,
            card.vote_average,
            card.release_date
          );
        });

        const allCards = trendingCards.join("");
        const allCardsContainer = document.createElement("div");
        allCardsContainer.classList.add("AllCards");
        allCardsContainer.innerHTML = allCards;

        const pagination = `
            <div class="pagination">
                <button class="prev scrollTop">prev</button>
                <button class="next scrollTop">next</button>
            </div>
          `;

        const container = document.createElement("div");
        container.classList.add("ProductsSection");
        container.appendChild(allCardsContainer);
        container.insertAdjacentHTML("beforeend", pagination);

        app.innerHTML = "";
        app.appendChild(container);

        const nextBtn = container.querySelector(".next");
        const prevBtn = container.querySelector(".prev");

        nextBtn.addEventListener("click", () => {
          currentPage++;
          loadMovies(currentPage);
          scrollToTop();
        });

        prevBtn.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            loadMovies(currentPage);
            scrollToTop();
          }
        });
      })
      .catch((err) => console.error(err));
  };

  loadMovies(currentPage);
};

export default allMovies;
