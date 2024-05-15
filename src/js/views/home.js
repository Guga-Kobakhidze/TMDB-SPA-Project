import { HeroSection } from "../components/sections/heroSection.js";
import { CategoryKeywords, MovieKeywords } from "../helpers/Links.js";
import { TrendButtons } from "../components/pagination/trendButtons.js";
import { TrendingDay } from "../components/sections/trending/trendingDay.js";
import { TrendingWeek } from "../components/sections/trending/trendingWeek.js";
import {
  Fetching,
  SearchFunction,
  getTrendingCards,
} from "../helpers/functions.js";

const renderDetailedPage = () => {
  const app = document.getElementById("app");

  Fetching(CategoryKeywords.movie, MovieKeywords.upcoming)
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * 20);
      const rand = data.results[randomNumber];
      const heroContent = HeroSection(rand.backdrop_path, rand.id);

      const trendingDay = TrendingDay("day");
      const trendingWeek = TrendingWeek("week");
      const trendingBtns = TrendButtons();

      const mergeTrending = document.createElement("div");
      mergeTrending.classList.add("trendingSection");
      mergeTrending.innerHTML = trendingBtns + trendingDay + trendingWeek;

      // merge all
      app.innerHTML = heroContent;
      app.append(mergeTrending);

      const HeroSearch = document.querySelector(".heroSearch");
      const HeroInput = document.querySelector(".searchInput");

      SearchFunction(HeroInput, HeroSearch);

      const trendBtns = document.querySelectorAll(".trendBtn");
      const trendToday = document.querySelector(".trendingToday");
      const trendWeek = document.querySelector(".trendingWeek");

      getTrendingCards(trendBtns, trendToday, trendWeek);
    })
    .catch((err) => console.error(err));
};

export default renderDetailedPage;
