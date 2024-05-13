import { HeroSection } from "../components/heroSection.js";
import { Fetching } from "../helpers/functions.js";
import { CategoryKeywords, MovieKeywords } from "../helpers/Links.js";
import SearchData from "./search/search.js";

const renderDetailedPage = () => {
  const app = document.getElementById("app");

  Fetching(CategoryKeywords.movie, MovieKeywords.upcoming)
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * 20);
      const rand = data.results[randomNumber];
      const trendingCards = HeroSection(rand.backdrop_path, rand.id);
      app.innerHTML = trendingCards;

      const heroSearch = document.querySelector(".heroSearch");
      const heroInput = document.querySelector(".searchInput");

      heroSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchQuery = heroInput.value.trim();
        localStorage.setItem("searchQuery", searchQuery);

        SearchData(searchQuery);
        setTimeout(() => {
          heroInput.value = "";
        }, 0);
      });
    })
    .catch((err) => console.error(err));
};

export default renderDetailedPage;
