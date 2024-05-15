import Image from "../../../assets/unnamed.png";
import { Fetching } from "../../helpers/functions";
import { CategoryKeywords } from "../../helpers/Links";

export const PersonDetails = (
  img,
  name,
  desc,
  known,
  birthday,
  birthPlace,
  id
) => {
  const resetImage =
    img === null ? Image : `https://image.tmdb.org/t/p/original${img}`;

  const personDetails = `
    <div class="peaopleDetails container">            
        <div class="personalInfo">
            <img class="peaopleImage" src="${resetImage}" alt="cover" />
            <div class="knownFor">
                <h2>Personal Info<h2>
                <h3>Known For</h3>
                <h4>${known}</h4>
            </div>
            <div class="birthday"> 
                <h3>Personal Info<h2>
                <h4>${birthday}</h4>
            </div>
            <div class="birthday"> 
                <h3>Place of Birth</h3>
                <h4>${birthPlace}</h4>
            </div>
        </div>
        <div class="peopleContent">
          <div class="peopleInfo"> 
            <h1>${name}</h1>
            <h2>Biography</h2>
            <p>${desc}</p>
            </div>
            <h2 class="knownFor">Known For</h2>
            <div class="castSlider">
              <div class="casts" id="castContainer"></div>
            </div>
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
        castImg.src =
          cast.poster_path === null
            ? Image
            : `https://image.tmdb.org/t/p/original${cast.poster_path}`;

        const castTitle = document.createElement("span");
        castTitle.innerHTML = cast.title;

        const castCard = document.createElement("a");
        castCard.href = `/movies/details?id=${cast.id}`;
        castCard.setAttribute("data-link", "true");
        castCard.classList.add("castCard");

        castCard.append(castImg, castTitle);

        castContainer.appendChild(castCard);
      });
    })
    .catch((err) => console.error(err));
}
