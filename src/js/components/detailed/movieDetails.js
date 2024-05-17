import personImage from "../../../assets/unnamed.png";
import coverImage from "../../../assets/notfound.jpg";
import { Fetching } from "../../helpers/functions";
import { CategoryKeywords } from "../../helpers/Links";

export const MovieDetails = (
  cover,
  img,
  title,
  date,
  genre,
  language,
  runtime,
  vote,
  tagline,
  desc,
  company,
  id
) => {
  const CoverImage =
    img === null ? coverImage : `https://image.tmdb.org/t/p/original${img}`;

  let colorChange = "";
  let votedPrecent = 0;

  function updateColor() {
    if (votedPrecent >= (vote * 10) + 1) {
      clearInterval(intervalId);
      return;
    }

    if (vote >= 5 && vote < 7) {
      colorChange = `conic-gradient(#d2d531 ${votedPrecent}%, #423d0f 0.5deg)`;
    } else if (vote >= 7) {
      colorChange = `conic-gradient(#00890b ${votedPrecent}%, #204529 0.5deg)`;
    } else if (vote < 5) {
      colorChange = `conic-gradient(#ca1325 ${votedPrecent}%, #571435 0.5deg)`;
    }

    document.querySelector(".precentColor").style.backgroundImage = colorChange;
    document.querySelector(
      ".precentColor h3"
    ).innerHTML = `${votedPrecent} <span>%</span>`;

    votedPrecent += 1;
  }

  const intervalId = setInterval(updateColor, 15);

  const movieDetails = `
        <div class="movieDetailsCard" key="${id}">
                <div class="overlay">
                  <img class="movieCover" src="https://image.tmdb.org/t/p/original${cover}" />
                </div>
                <div class="movieContent container">
                    <div class="movieImg" >
                        <img src=${CoverImage} />
                    </div>
                    <div class="movieInfo">
                        <h1>${title} <span>(${date.slice(0, 4)})</span></h1>
                        <div class="movieDate">
                            <h3>${date} <span>(${language})</span></h3>
                            &#x2219
                            <h3>${genre}</h3>
                            &#x2219
                            <h3>${runtime} <span>min</span></h3>
                        </div>
                        <div class="precentBox">
                            <div class="precent"> 
                              <div class="precentBorder">
                                  <div class="precentColor" style="background: ${colorChange}">
                                      <h3>${votedPrecent === 0 ? "NR" : ""}</h3>
                                  </div>
                                </div>
                            </div>
                            <div class="iconBtn like-btn precent">
                                <i class='bx bxs-heart'></i>
                            </div>
                            <div class="iconBtn bookmark-btn precent">
                                <i class='bx bxs-bookmark'></i>
                            </div> 
                            <div class="iconBtn menu-btn precent">
                                <i class='bx bxs-food-menu'></i>
                            </div>
                        </div>
                        <div class="playTrailer">
                            <button>
                                <i class='bx bxs-right-arrow' ></i>
                                Play Trailer
                            </button>
                        </div>
                        <h3 class="tagline">${tagline}</h3>
                        <div class="overview"> 
                            <h3>Overview</h3>
                            <h4>${desc}</h4>
                        </div>
                        <div class="company">
                            <h3>Company</h3>
                            <h4>${company}</h4>
                        </div>
                    </div>
                </div>
                <div class="videoBox" id="videoSection"></div>
            </div>
            <div class="castBG container">
                  <h2 class="actors">Actors</h2>
                  <div class="casts">
                  <div class="castSlider"></div>
            </div>
      </div>
    `;

  FetchVideo(id);
  FetchCast(id);

  return movieDetails;
};

function FetchVideo(itemId) {
  Fetching(CategoryKeywords.movie, `${itemId}/videos`)
    .then((data) => {
      const randomNum = Math.floor(Math.random() * data.results.length);
      const videoKey = data.results[randomNum]?.key;

      const playBtn = document.querySelector(".playTrailer");
      const mainOverlay = document.querySelector(".mainOverlay");

      if (videoKey) {
        const videoSection = document.getElementById("videoSection");
        videoSection.style.display = "none";
        const videoUrl = `https://www.youtube.com/embed/${videoKey}?controls=0`;

        const iframe = document.createElement("iframe");
        iframe.src = videoUrl;

        videoSection.appendChild(iframe);

        playBtn.addEventListener("click", () => {
          videoSection.style.display = "block";
          mainOverlay.style.display = "block";
        });

        mainOverlay.addEventListener("click", () => {
          videoSection.style.display = "none";
          mainOverlay.style.display = "none";
        });

        const iconBtns = document.querySelectorAll(".iconBtn");

        iconBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            btn.classList.toggle("change");
          });
        });
      } else {
        playBtn.innerHTML =
          "<span style='color: white'>There is no Video</span>";
        document.querySelector(".videoBox").style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error fetching movie trailer:", error);
    });
}

function FetchCast(itemId) {
  Fetching(CategoryKeywords.movie, `${itemId}/credits`)
    .then((data) => {
      const castContainer = document.querySelector(".castSlider");
      data.cast.map((item) => {
        const castBox = document.createElement("div");
        castBox.classList.add("castBox");
        const castLink = document.createElement("a");
        castLink.href = `/person/details?id=${item.id}`;

        const castImg = document.createElement("img");
        const resetImage =
          item.profile_path === null
            ? personImage
            : `https://image.tmdb.org/t/p/original${item.profile_path}`;
        castImg.src = resetImage;

        const actName = document.createElement("h2");
        const originalName = document.createElement("h2");
        const desc = document.createElement("p");
        actName.innerHTML = item.name;
        originalName.innerHTML = item.original_name;
        desc.innerHTML = item.popularity;

        castLink.appendChild(castImg);
        castBox.append(castLink, actName, originalName, desc);
        castContainer.appendChild(castBox);
      });
    })
    .catch((error) => {
      console.error("Error fetching movie trailer:", error);
    });
}
