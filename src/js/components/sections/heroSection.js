import { CategoryKeywords, MovieKeywords } from "../../helpers/Links";
import { Fetching, SearchFunction, SearchPopup } from "../../helpers/functions";

export const HeroSection = () => {
  const heroContainer = document.createElement("div");
  heroContainer.classList.add("heroSection");

  const heroContent = document.createElement("div");
  heroContent.classList.add("heroContent", "container");

  heroContent.innerHTML = `
    <h1>Welcome</h1>
    <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
    <form class="searchForm heroSearch"> 
      <input id="search-input" class="searchInput" type="text" name="search" placeholder="Search for a movie, tv show, person...." />
      <button class="searchBtn" type="submit">Search</button>
      <div class="SearchPopup" id="searchPopup">What are you looking for? <i class='bx bxs-wink-smile'></i></div>
    </form>
    <div class="overlay"></div>
  `;

  const heroCover = document.createElement("img");
  heroCover.classList.add("heroCover");
  heroContainer.append(heroCover, heroContent);

  getHeroSection(heroCover);

  return heroContainer;
};

export function getHeroSection(cover) {
  Fetching(CategoryKeywords.movie, MovieKeywords.upcoming).then((data) => {
    const randomNumber = Math.floor(Math.random() * 20);
    const rand = data.results[randomNumber];
    cover.src = `https://image.tmdb.org/t/p/original${rand.backdrop_path}`;
    cover.alt = rand.title;

    const searchInput = document.querySelector(".searchInput");
    const searchPopup = document.getElementById("searchPopup");

    searchInput.addEventListener("mousemove", (e) => {
      searchPopup.style.display = "flex";
      SearchPopup(e, searchPopup);
    });

    searchInput.addEventListener("mouseout", () => {
      searchPopup.style.display = "none";
    });
  });
}
