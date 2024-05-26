import personImage from "../../../assets/unnamed.png";
import coverImage from "../../../assets/notfound.jpg";
import {
  Fetching,
  Slider,
  imageFinder,
  infoFinder,
} from "../../helpers/functions";
import { CategoryKeywords, SocialLinks } from "../../helpers/Links";

export const PersonDetails = (
  img,
  name,
  desc,
  known,
  birthday,
  birthPlace,
  id
) => {
  const fullDescription = desc;
  const description = desc.length >= 300 ? desc.slice(0, 300) : desc;

  const personDetails = `
    <div class="peaopleDetails container">            
        <div class="personalInfo">
            <div class="personalImage">
                <img class="peaopleImage" 
                src="${imageFinder(img, personImage)}" 
                alt="cover" />
              <div class="socials"></div>
            </div>
            <h2 class="Personal">Personal Info<h2>
            <div class="knownContent">
                <div class="knownFor">
                    <h3>Known For</h3>
                    <h4>${infoFinder(known)}</h4>
                </div>
                <div class="birthday"> 
                    <h3>Personal Info<h2>
                    <h4>${infoFinder(birthday)}</h4>
                </div>
            </div>
            <div class="birthday"> 
                <h3>Place of Birth</h3>
                <h4>${infoFinder(birthPlace)}</h4>
            </div>
        </div>
        <div class="peopleContent">
          <div class="peopleInfo"> 
            <h1>${infoFinder(name)}</h1>
            <h2>Biography</h2>
            <p class="biorgraphy">${infoFinder(description)}
              <span class="readMore" style="display: ${
                desc.length >= 300 ? "flex" : "none"
              }">Read More <i class='bx bx-chevron-right'></i></span>
            </p>
            </div>
            <div class="sliderControl" >
                <div class="sliderButtons">
                    <button><i class='bx bx-left-arrow-alt left_arrow'></i></button>
                    <button><i class='bx bx-right-arrow-alt right_arrow' ></i></button>
                </div>
                <h2 class="knownFor">Known For</h2>
            </div>
            <div class="castSlider">
              <div class="casts" id="castContainer"></div>
            </div>
        </div>
    </div>
 `;

  fetchCasts(id);

  setTimeout(() => {
    const readMore = document.querySelector(".readMore");
    readMore.addEventListener("click", () => {
      document.querySelector(".biorgraphy").innerHTML = `${infoFinder(
        fullDescription
      )}`;
      readMore.style.display = "none";
    });
  }, 0);

  return personDetails;
};

function fetchCasts(personId) {
  Fetching(CategoryKeywords.person, `${personId}/movie_credits`)
    .then((data) => {
      const castContainer = document.getElementById("castContainer");
      const sliderLength = (data.cast.length - 6) * 153 - 1;

      data.cast.map((cast) => {
        const castImg = document.createElement("img");
        castImg.src = imageFinder(cast.poster_path, coverImage);

        const castTitle = document.createElement("span");
        castTitle.innerHTML = cast.title;

        const castCard = document.createElement("a");
        castCard.href = `/movies/details?id=${cast.id}`;
        castCard.setAttribute("data-link", "true");
        castCard.classList.add("castCard");

        castCard.append(castImg, castTitle);
        castContainer.appendChild(castCard);

        const leftBtn = document.querySelector(".left_arrow");
        const rightBtn = document.querySelector(".right_arrow");
        Slider(rightBtn, leftBtn, castContainer, 153, sliderLength);
      });
    })
    .then(() => {
      Fetching(CategoryKeywords.person, `${personId}/external_ids`).then(
        (data) => {
          Object.keys(data).forEach((key) => {
            if (SocialLinks.hasOwnProperty(key)) {
              const socials = document.querySelector(".socials");
              const linkTag = document.createElement("a");

              linkTag.href = `${SocialLinks[key]}${data[key]}`;
              linkTag.setAttribute("target", "_blank");

              const removeId = key.replace("_id", "");
              key.includes("facebook")
                ? (linkTag.innerHTML = `<i class='bx bxl-${removeId}-circle'></i>`)
                : (linkTag.innerHTML = `<i class='bx bxl-${removeId}'></i>`);

              socials.appendChild(linkTag);
            }
          });
        }
      );
    })
    .catch((err) => console.error(err));
}
