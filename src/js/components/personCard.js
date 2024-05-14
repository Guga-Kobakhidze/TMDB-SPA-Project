import Image from "../../assets/unnamed.png";

export const PersonCard = (id, name, img, desc) => {
  const resetImage =
    img === null ? Image : `https://image.tmdb.org/t/p/original${img}`;

  const personCard = `
    <a href="/person/details?id=${id}" data-link>
      <div class="card personCard" key="${id}"> 
        <img src=${resetImage} alt="${name}"/>
        <div class="card-content">
          <h1>${name}</h1>
          <p>${desc.map(
            (desc) => desc.original_name || desc.original_title
          )}</p>
        </div>
      </div>
    </a>
  `;

  return personCard;
};
