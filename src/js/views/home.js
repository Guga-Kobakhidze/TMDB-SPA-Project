import { HeroSection } from "../components/heroSection.js";
import { Fetching } from "../helpers/functions.js";
import { CategoryKeywords, MovieKeywords } from "../helpers/Links.js";

const renderDetailedPage = () => {
  const app = document.getElementById("app");

  Fetching(CategoryKeywords.movie, MovieKeywords.upcoming)
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * 20);
      const rand = data.results[randomNumber];
      const trendingCards = HeroSection(rand.backdrop_path, rand.id);
      app.innerHTML = trendingCards;
    })
    .catch((err) => console.error(err));
};

export default renderDetailedPage;
