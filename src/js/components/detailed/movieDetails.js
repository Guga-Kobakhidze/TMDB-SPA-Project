import Image from "../../../assets/unnamed.png";
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
  let colorChange = "";
  let votedPrecent = 0;

  function updateColor() {
    if (votedPrecent >= vote * 10) {
      clearInterval(intervalId);
      return;
    }

    if (vote >= 4 && vote < 7) {
      colorChange = `conic-gradient(rgb(169, 169, 25) ${votedPrecent}%, rgb(155, 155, 155) 0.5deg)`;
    } else if (vote >= 7) {
      colorChange = `conic-gradient(rgb(14, 90, 14) ${votedPrecent}%, rgb(155, 155, 155) 0.5deg)`;
    } else {
      colorChange = `conic-gradient(rgb(155, 155, 155) ${votedPrecent}%, rgb(155, 155, 155) 0.5deg)`;
    }

    document.querySelector(".precentColor").style.backgroundImage = colorChange;
    votedPrecent += 1;
  }

  const intervalId = setInterval(updateColor, 10);

  const movieDetails = `
        <div class="movieDetailsCard" key="${id}">
                <div class="overlay">
                  <img class="movieCover" src="https://image.tmdb.org/t/p/original${cover}" />
                </div>
                <div class="movieContent container">
                    <div class="movieImg" >
                        <img src="https://image.tmdb.org/t/p/original${img}" />
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
                                      <h3>${vote
                                        .toString()
                                        .replace(".", "")
                                        .slice(0, 2)} 
                                      <span>%</span></h3>
                                  </div>
                                </div>
                            </div>
                            <div class="like-btn precent">
                                <i class='bx bxs-heart'></i>
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

        const likeBtn = document.querySelector(".like-btn");

        likeBtn.addEventListener("click", () => {
          likeBtn.classList.toggle("change");
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
            ? Image
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
