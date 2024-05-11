export const PeopleCard = (id, name, img, desc) => {
  const peopleCard = `
    <a href="/person/details?id=${id}" data-link>
      <div class="card personCard" key="${id}"> 
        <img src="https://image.tmdb.org/t/p/original${img}" alt="${name}"/>
        <div class="card-content">
          <h1>${name}</h1>
          <p>${desc.map(
            (desc) => desc.original_name || desc.original_title
          )}</p>
        </div>
      </div>
    </a>
  `;

  return peopleCard;
};
