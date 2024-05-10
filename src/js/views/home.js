import { Fetching } from "../helpers/functions.js";
import { CategoryKeywords, MovieKeywords } from "../helpers/Links.js";

const DetailedPage = (cover, id) => {
  console.log(cover);
  const detailedPage = `
    <div class="heroSection" key="${id}">            
        <img class="heroCover" src="https://image.tmdb.org/t/p/original${cover}" alt="cover" />
        
        <div class="heroContent container"> 
            <h1>welcome</h1>
            <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
            <form class="searchForm"> 
              <input id="search-input" class="searchInput" tye=pe="text" name="search" placeholder="Search for a movie, tv show, person...." />
              <button class="searchBtn" type="submit">Search</button>
            </form>
        </div>
        <div class="overlay"></div>
    </div>
  `;

  return detailedPage;
};

const renderDetailedPage = () => {
  const app = document.getElementById("app");

  Fetching(CategoryKeywords.movie, MovieKeywords.upcoming)
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * 20);
      const rand = data.results[randomNumber];
      const trendingCards = DetailedPage(rand.backdrop_path, rand.id);
      app.innerHTML = trendingCards;
    })
    .catch((err) => console.error(err));
};

export default renderDetailedPage;
