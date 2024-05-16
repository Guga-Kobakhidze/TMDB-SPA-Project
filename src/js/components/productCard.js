export const ProductsCard = (key, id, title, img, vote, date) => {
  let colorChange = "";
  const votedPrecent = vote * 10;

  if (vote >= 4 && vote < 7) {
    colorChange = `conic-gradient(rgb(169, 169, 25) ${votedPrecent}%, rgb(155, 155, 155) 0.5deg)`;
  } else if (vote >= 7) {
    colorChange = `conic-gradient(rgb(14, 90, 14) ${votedPrecent}%, rgb(155, 155, 155) 0.5deg)`;
  } else {
    colorChange = `conic-gradient(rgb(155, 155, 155) ${votedPrecent}%, rgb(155, 155, 155) 0.5deg)`;
  }

  const productsCard = `
      <a href="/${key}/details?id=${id}" data-link>
          <div class="card" key="${id}"> 
              <img src="https://image.tmdb.org/t/p/original${img}" alt="${title}"/>
              <div class="card-content">
              <div class="precent"> 
                <div class="precentBorder">
                      <div class="precentColor" style="background: ${colorChange}">
                          <h3>${vote.toString().replace(".", "").slice(0, 2)} 
                          <span>%</span></h3>
                      </div>
                    </div>
                </div>
                <h1>${title}</h1>
                <p>${date}</p>
              </div>
          </div>
      </a>
    `;

  return productsCard;
};
