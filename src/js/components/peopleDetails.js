import { Fetching } from "../helpers/functions";
import { CategoryKeywords } from "../helpers/Links";

export const PersonDetails = (
  img,
  name,
  desc,
  known,
  birthday,
  birthPlace,
  id
) => {
  const personDetails = `
    <div class="peaopleDetails container">            
        <div class="personalInfo">
            <img class="peaopleImage" src="https://image.tmdb.org/t/p/original${img}" alt="cover" />
            <div class="knownFor">
                <h2>Personal Info<h2>
                <h3>Known For</h3>
                <h4>${known}</h4>
            </div>
            <div class="birthday"> 
                <h3>${birthday}</h3>
            </div>
            <div class="birthday"> 
                <h3>${birthPlace}</h3>
            </div>
        </div>
        <div class="peopleInfo"> 
            <h1>${name}</h1>
            <h2>Biography</h2>
            <div class="description">
                <p>${desc}</p>
                <button class="readMore">Read More</button>
            </div>
            <div class="casts" id="castContainer"></div>
        </div>
    </div>
 `;

  fetchCasts(id);

  return personDetails;
};

function fetchCasts(personId) {
  Fetching(CategoryKeywords.person, `${personId}/movie_credits`)
    .then((data) => {
      const castContainer = document.getElementById("castContainer");

      data.cast.map((cast) => {
        const castImg = document.createElement("img");
        castImg.src = `https://image.tmdb.org/t/p/original${cast.poster_path}`;

        const castCard = document.createElement("div");
        castCard.classList.add("castCard");
        castCard.appendChild(castImg);

        castContainer.appendChild(castCard);
      });
    })
    .catch((err) => console.error(err));
}
