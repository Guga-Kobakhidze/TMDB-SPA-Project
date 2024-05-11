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

  if (vote >= 4 && vote < 7) {
    colorChange = "rgb(169, 169, 25)";
  } else if (vote >= 7) {
    colorChange = "rgb(14, 90, 14)";
  } else {
    colorChange = "rgb(155, 155, 155)";
  }

  const movieDetails = `
        <div class="movieDetailsCard" key="${id}">
            <img class="movieCover" src="https://image.tmdb.org/t/p/original${cover}" />
            <div class="movieImg" >
                <img src="https://image.tmdb.org/t/p/original${img}" />
            </div>
            <div class="movieInfo">
                <h1>${title} <span>(${date.slice(0, 4)})</span></h1>
                <div class="movieDate">
                    <h3>${date} <span>(${language})</span></h3>
                    <h3>${genre}</h3>
                    <h3>${runtime} <span>min</span></h3>
                </div>
                <div class="precent"> 
                    <div class="precentColor" style="border: 2px solid ${colorChange}"></div>
                    <h3>${vote.toString().replace(".", "").slice(0, 2)} 
                    <span>%</span></h3>
                </div>
                <div class="movieVideo">
                    <div class="like">
                        like
                    </div>
                    <div>
                        <button class="playTrailer">
                            Play Trailer
                        </button>
                    </div>
                <div>
                <h3>${tagline}</h3>
                <div class="overview"> 
                    <h3>Overview</h3>
                    <h4>${desc}</h4>
                </div>
                <div class="company">
                    <h3>Company</h3>
                    <h4>${company}</h4>
                </div>
            </div>
            <div class="videoBox" id="videoSection"></div>
        </div>
    `;

  FetchVideo(id);

  return movieDetails;
};

function FetchVideo(itemId) {
  Fetching(CategoryKeywords.movie, `${itemId}/videos`)
    .then((data) => {
      const randomNum = Math.floor(Math.random() * data.results.length);
      const videoKey = data.results[randomNum]?.key;

      console.log(randomNum, data.results.length);

      if (videoKey) {
        const videoSection = document.getElementById("videoSection");
        videoSection.style.display = "none";
        const videoUrl = `https://www.youtube.com/embed/${videoKey}?controls=0`;

        const iframe = document.createElement("iframe");
        iframe.src = videoUrl;

        videoSection.appendChild(iframe);

        const playBtn = document.querySelector(".playTrailer");

        playBtn.addEventListener("click", () => {
          videoSection.style.display = "block";
        });
      } else {
        console.error("No video found for this movie.");
      }
    })
    .catch((error) => {
      console.error("Error fetching movie trailer:", error);
    });
}
