export const ProductsCard = (key, id, title, img, vote, date) => {
  let colorChange = "";

  if (vote >= 4 && vote < 7) {
    colorChange = "rgb(169, 169, 25)";
  } else if (vote >= 7) {
    colorChange = "rgb(14, 90, 14)";
  } else {
    colorChange = "rgb(155, 155, 155)";
  }

  const productsCard = `
      <a href="/${key}/details?id=${id}" data-link>
          <div class="card" key="${id}"> 
              <img src="https://image.tmdb.org/t/p/original${img}" alt="${title}"/>
              <div class="card-content">
                  <div class="precent"> 
                      <div class="precentColor" style="border: 2px solid ${colorChange}"></div>
                      <h3>${vote
                        .toString()
                        .replace(".", "")
                        .slice(0, 2)} <span>%</span></h3>
                  </div>
                  <h1>${title}</h1>
                  <p>${date}</p>
              </div>
          </div>
      </a>
    `;

  return productsCard;
};
