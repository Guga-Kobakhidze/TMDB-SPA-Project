import Img from "../../assets/notfound.jpg";

export const ProductsCard = (key, id, title, img, vote, date) => {
  const resetImage =
    img === null ? Img : `https://image.tmdb.org/t/p/original${img}`;

  let colorChange = "";
  const votedPrecent = vote * 10;

  if (vote >= 5 && vote < 7) {
    colorChange = `conic-gradient(#d2d531 ${votedPrecent}%, #423d0f 0.5deg)`;
  } else if (vote >= 7) {
    colorChange = `conic-gradient(#00890b ${votedPrecent}%, #204529 0.5deg)`;
  } else if (vote < 5) {
    colorChange = `conic-gradient(#ca1325 ${votedPrecent}%, #571435 0.5deg)`;
  }

  // console.log(key);

  const productsCard = `
      <a href="/${key}/details?id=${id}" data-link>
          <div class="card" key="${id}"> 
              <img src="${resetImage}" alt="${title}"/>
              <div class="card-content">
              <div class="precent"> 
                <div class="precentBorder">
                      <div class="precentColor" style="background: ${colorChange}">
                          <h3>${Math.round(votedPrecent)} 
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
