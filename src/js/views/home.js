import { HeroSection } from "../components/heroSection.js";
import { Fetching, SearchFunction } from "../helpers/functions.js";
import { CategoryKeywords, MovieKeywords } from "../helpers/Links.js";

const renderDetailedPage = () => {
  const app = document.getElementById("app");

  Fetching(CategoryKeywords.movie, MovieKeywords.upcoming)
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * 20);
      const rand = data.results[randomNumber];
      const trendingCards = HeroSection(rand.backdrop_path, rand.id);
      app.innerHTML = trendingCards;

      const HeroSearch = document.querySelector(".heroSearch");
      const HeroInput = document.querySelector(".searchInput");

      SearchFunction(HeroInput, HeroSearch);
    })
    .catch((err) => console.error(err));
};

export default renderDetailedPage;
