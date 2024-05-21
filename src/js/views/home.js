import { SearchFunction, getTrendingCards } from "../helpers/functions.js";
import { HeroSection } from "../components/sections/heroSection.js";
import { TrendButtons } from "../components/pagination/trendButtons.js";
import { Trending } from "../components/sections/trending/trending.js";
import { GetGenres } from "../components/sections/genres/genre.js";
import { GenreFunc } from "../components/sections/genres/genreFunc.js";
import { Trailers } from "../components/sections/trailers/trailers.js";
import { exchangeCurrencies } from "../components/exchange/exchange.js";

const renderDetailedPage = () => {
  const app = document.getElementById("app");

  // Hero Section
  const heroContent = HeroSection();

  // Genres Section MOVIE
  const movieGenreOne = GetGenres("movie");
  const movieGenreTwo = GetGenres("movie");

  const getMovieGenre = GenreFunc(movieGenreOne, movieGenreTwo);

  // Trending Section
  const trendingBtns = TrendButtons();
  const trending = Trending();

  const mergeTrending = document.createElement("div");
  mergeTrending.classList.add("trendingSection");
  mergeTrending.innerHTML = trendingBtns + trending;

  // Gemres Section TV
  const tvGenreOne = GetGenres("tv");
  const tvGenreTwo = GetGenres("tv");

  const getTvGenre = GenreFunc(tvGenreOne, tvGenreTwo, "tvGenre");

  // Trailers Section

  const trailers = Trailers();
  const mergeTrailers = document.createElement("div");
  mergeTrailers.classList.add("trailerSection");
  mergeTrailers.innerHTML = trailers;

  const exchangePopup = exchangeCurrencies();
  const exchangeDiv = document.createElement("div");
  exchangeDiv.append(exchangePopup);

  // merge all
  app.innerHTML = "";
  app.append(
    heroContent,
    getMovieGenre,
    mergeTrending,
    getTvGenre,
    mergeTrailers,
    exchangeDiv
  );

  // Search
  const HeroSearch = document.querySelector(".heroSearch");
  const HeroInput = document.querySelector(".searchInput");

  SearchFunction(HeroInput, HeroSearch);

  const trendBtns = document.querySelectorAll(".trendBtn");

  getTrendingCards(trendBtns);
};

export default renderDetailedPage;
