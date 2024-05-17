import { fetchTrending } from "./trailersFetch";

export function TrailerCard(id, img, title, cover) {
  const trailerCard = `
    <div key=${id} id=${id} data=${cover} class="trailerCard">
        <img class="trailerImage" src="https://image.tmdb.org/t/p/original${img}" alt="${title}" />
        <div>
             <h1>${title}</h1>
        </div>
    </div>
  `;

  return trailerCard;
}

export const Trailers = () => {
  const trailers = `<div class="trailers container"></div>`;

  fetchTrending();

  return trailers;
};
