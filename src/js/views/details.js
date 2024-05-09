import { Fetching } from "../helpers/functions.js";
import { MovieKeywords, CategoryKeywords } from "../helpers/Links.js";

const DetailedPage = (cover, title, date, rate, desc, img, id) => {
  console.log(id);
  const detailedPage = `
    <div class="mainSection">            
        <img class="mainCover" src="https://image.tmdb.org/t/p/w500${cover}" alt="cover" />
        <div class="mainContent container"> 
            <div>
                <h1>${title}</h1>
                <h3>Release: ${date} Rate: ${rate}</h3>
                <p class="paragraph">${desc}</p>
                <button id="watchNow">
                    <img src="" alt="btnarr"/>
                    watch now
                </button>
            </div>
            <div class="mainImage">
                <img class="mainImg" src="https://image.tmdb.org/t/p/w500${img}" alt="mainimage" />
            </div>
        </div>
    </div>
  `;

  console.log(detailedPage);

  return detailedPage;
};

const renderDetailedPage = () => {
  const app = document.getElementById("app");

  Fetching(CategoryKeywords.movie ,MovieKeywords.popular)
    .then((data) => {
      console.log(data);
      const rand = data.results[0];
      const detailedPageContent = DetailedPage(
        rand.backdrop_path,
        rand.title,
        rand.release_date,
        rand.vote_average,
        rand.overview,
        rand.poster_path,
        rand.id
      );
      app.innerHTML = detailedPageContent;
    })
    .catch((err) => console.error(err));
};


export default renderDetailedPage;