import { ProductsCard } from "../components/productCard";
import SearchData from "../views/search/search";
import { CategoryKeywords } from "./Links";

// Fetching Data functions

export const modules = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGIyODM4YjUyMmQwNGQ3ZTZkZjFlYzJhZDMyMjlhNCIsInN1YiI6IjY2M2IzMTI0YzMwYzM1MjUxYjY3YWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kGk_nDxUp27QPdgZokkfYCy5VQzeqInGhJlfTT4ZG-0",
  },
};

export const Fetching = async (category, title, page) =>
  fetch(
    `https://api.themoviedb.org/3/${category}/${title}?${page}`,
    modules
  ).then((response) => response.json());

// Scroll to Top

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const generalDataFetcher = async (keyword1, keyword2) =>
  fetch(`https://api.themoviedb.org/3/${keyword1}/${keyword2}`, modules).then(
    (response) => response.json()
  );

export function SearchFunction(input, form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchQuery = input.value.trim();

    if (searchQuery === "") return;

    SearchData(searchQuery);
    scrollToTop();

    setTimeout(() => {
      input.value = "";
      form.classList.remove("showSearch");
    }, 0);
  });
}

// Trending fetching Functions

export function fetchTrending(key, clasName) {
  Fetching(CategoryKeywords.trending, CategoryKeywords.movie + `/${key}`)
    .then((data) => {
      const container = document.createElement("div");
      container.classList.add("trendingContent");
      const trendingContent = document.querySelector(`.${clasName}`);
      const mainSection = document.querySelector(".trendingSection");

      const AllCards = document.querySelectorAll(".card");
      mainSection.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${data.results[1].backdrop_path}")`;

      AllCards.forEach((card) => {
        card.addEventListener("mouseover", () => {
          let randomNum = Math.floor(Math.random() * 20);
          const imageUrl = `https://image.tmdb.org/t/p/original${data.results[randomNum].backdrop_path}`;
          mainSection.style.backgroundImage = `url("${imageUrl}")`;
        });
      });

      const cards = data.results.map((item) => {
        mainSection.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${item.backdrop_path}")`;
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
    })
    .catch((err) => console.log(err));
}

export function getTrendingCards(button, day, week) {
  button.forEach((btn) => {
    const attribute = btn.getAttribute("name");

    btn.addEventListener("click", () => {
      switch (attribute) {
        case "day":
          day.style.display = "flex";
          week.style.display = "none";
          break;
        case "week":
          day.style.display = "none";
          week.style.display = "flex";
          break;
      }

      button.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.classList.remove("chosen");
        }
      });
      btn.classList.add("chosen");
    });
  });
}
