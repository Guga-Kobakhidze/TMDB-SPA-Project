export const HeroSection = (cover, id) => {
  const heroSection = `
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

  return heroSection;
};
