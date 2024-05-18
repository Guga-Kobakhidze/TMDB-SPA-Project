import { fetchTrending } from "./trailersFetch";

export function TrailerCard(id, img, title, cover) {
  const trailerCard = `
    <div key=${id} id=${id} data=${cover} class="trailerCard">
        <img class="trailerImage" src="https://image.tmdb.org/t/p/original${img}" alt="${title}" />
        <div class="titleBox">
             <h3>${title}</h3>
        </div>
    </div>
  `;

  return trailerCard;
}

export const Trailers = () => {
  const trailers = `
  <div class="trailers container">
      <div class="trailersHeading">
          <h2>Latest Trailers</h2>
          <div class="sliderButons trailersButtons">
              <button class="handle handleLeft">
                <i class='bx bxs-chevron-left'></i>
              </button>
              <button class="handle handleRight">
                <i class='bx bxs-chevron-right'></i>
              </button>
          </div>
      </div>
      <div class="trailerCards"></div>
  </div>`;

  fetchTrending();

  return trailers;
};
