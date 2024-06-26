import Image from "../../../assets/notfound.jpg";

export function SearchedItem(key, img, title, date, desc, id) {
  const resetImage =
    img === null ? Image : `https://image.tmdb.org/t/p/original${img}`;

  const accessKey = key === "tv" ? "tvshow" : key;
  console.log(accessKey);

  const searchedItems = `
        <div class="SearchedItems"> 
            <a 
            href="/${accessKey}${
    accessKey === "person" ? "" : "s"
  }/details?id=${id}" 
            data-link>
                <img width="300px" src=${resetImage}/>
            </a> 
            <div class="SearchedDesc">
                <a href="/${key}s/details?id=${id}" data-link>
                    <span>${title}</span>
                </a> 
                <h2>${date}</h2>
                <p>${desc}</p>
            </div>
        </div>
      `;

  return searchedItems;
}

export function searchedValues(movie, tv, person) {
  const searchedValues = `
        <div class="SearchResults">
            <div class="title"> 
                <h1>Search Results</h1>
            </div>
            <div class="filteredContent">
                <div class="filterResult" accesskey="movie">
                    <h1>Movies
                        <span>${movie}</span>
                    </h1>
                </div>
                <div class="filterResult" accesskey="tv">
                    <h1>TV Shows
                        <span>${tv}</span>
                    </h1>
                </div>
                <div class="filterResult" accesskey="people">
                    <h1>People
                        <span>${person}</span>
                    </h1>
                </div>
            </div>
        </div>
        <p class="filterPara">
            Tip: You can use the 'y:' filter 
            to narrow your results by year. Example: 'star wars 
            y:1977'.
        </p>
      `;

  return searchedValues;
}
