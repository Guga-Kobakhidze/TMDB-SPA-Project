import { modules } from "../../helpers/functions";
export const Filter = () => {
  const sortBox = `
        <form class="sortBox">
            <div class="title">
                <h2>Sort</h2>
                <i class='bx bx-chevron-right'></i>
            </div>  
            <div class="selectBox">
                <h2>Sort Results By</h2>
                <div class="mySelect">
                <select name="select" class="selected-item" id="selectedItem">
                    <option value="Popular Descending" >Popular Descending</option>
                    <option value="Popular Ascending" >Popular Ascending</option>
                    <option value="Rating Descending" >Rating Descending</option>
                    <option value="Rating Ascending" >Rating Ascending</option>
                    <option value="Release Date Descending" >Release Date Descending</option>
                    <option value="Release Date Ascending" >Release Date Ascending</option>
                    <option value="Title A-Z" >Title (A-Z)</option>
                    <option value="Title Z-A" >Title (Z-A)</option>
                </select>
                <i class='bx bxs-down-arrow selectIcon'></i>
                </div>
            </div>
            <button type="submit" class="searchBtn">Search</button>
        </form>

    `;

  const filterBox = `
        <form class="filterBox">
              <div class="title">
                  <h2>Filters</h2>
                  <i class='bx bx-chevron-right'></i>
              </div>
              <div class="filterForm">
                  <h2>Show Me</h2>
                  <div class="radioGroup">
                      <div class="radioLabel">
                          <input type="radio" id="everyMovie" name="movieType" checked />
                          <label for="everyMovie">Everything</label>
                      </div>
                      <div class="radioLabel">
                          <input type="radio" id="havenotSeen" name="movieType" />
                          <label for="havenotSeen">Movies I Haven't Seen</label>
                      </div>
                      <div class="radioLabel">
                          <input type="radio" id="haveSeen" name="movieType" />
                          <label for="haveSeen">Movies I have Seen</label>
                      </div>
                  </div>
                  <div class="filterForm">
                      <h2>Release Dates</h2>
                      <div class="radioLabel">
                          <input type="checkbox" id="searchAll" name="releaseType" />
                          <label for="searchAll">Search all releases?</label>
                      </div>
                      <div class="radioLabel">
                          <input type="checkbox" id="allCountries" name="releaseType" />
                          <label for="allCountries">Search all countries?</label>
                      </div>
                      <div class="radioLabel">
                          <input type="checkbox" id="thlim" name="releaseType" />
                          <label for="thlim">Theatrical (limited)</label>
                      </div>
                      <div class="radioLabel">
                          <input type="checkbox" id="theatrical" name="releaseType" />
                          <label for="theatrical">Theatrical</label>
                      </div>
                      <div class="radioLabel">
                          <input type="checkbox" id="premiere" name="releaseType" />
                          <label for="premiere">Premiere</label>
                      </div>
                      <div class="radioLabel">
                          <input type="checkbox" id="digital" name="releaseType" />
                          <label for="digital">Digital</label>
                      </div>
                      <div class="radioLabel">
                          <input type="checkbox" id="physical" name="releaseType" />
                          <label for="physical">Physical</label>
                      </div>
                      <div class="radioLabel">
                          <input type="checkbox" id="tv" name="releaseType" />
                          <label for="tv">TV</label>
                      </div>
                      <div>
                          <label for="releaseFrom">From:</label>
                          <input type="date" id="releaseFrom" name="releaseFrom">
                      </div>
                      <div>
                          <label for="releaseTo">To:</label>
                          <input type="date" id="releaseTo" name="releaseTo">
                      </div>
                  </div>
                  <div class="filterForm genresSection">
                      <h2>Genres</h2>
                      <!-- Add genre checkboxes here -->
                  </div>
                  <div class="filterForm languageContainer">
                      <h2>Language</h2>
                      <select class="languages" name="languages">
                          <option value="">Select a language...</option>
                          <!-- Add language options here -->
                      </select>
                  </div>
                  <div class="filterForm">
                      <h2>User Score</h2>
                      <div class="double_range_slider_box">
                          <p class='rangeInfo'>Range</p>
                          <ul class='scoreScale'>
                              <!-- Add scale marks here -->
                          </ul>
                          <div class="double_range_slider">
                              <input type="range" class="inputRange range01" min="0" max="10" value="0" step="1" />
                              <input type="range" class="inputRange range02" min="0" max="10" value="10" step="1" />
                          </div>
                      </div>
                      <div class="radioGroup">
                          <label for="minVotes">Minimum User Votes</label>
                          <input id="minVotes" type="range" value="250" min="0" max="500" />
                      </div>
                      <div class="radioGroup">
                          <label for="rate">Runtime (minutes)</label>
                          <input id="rate" type="range" value="0" min="0" max="360" />
                      </div>
                  </div>
                  <button type="submit" class="searchBtn">Search</button>
              </div>
        </form>
    `;

  const filterSection = document.createElement("div");
  filterSection.classList.add("filterContent");

  const sortSection = document.createElement("div");
  sortSection.classList.add("sortContent");

  filterSection.innerHTML = filterBox;
  sortSection.innerHTML = sortBox;

  const searchSection = document.createElement("div");
  searchSection.append(sortSection, filterSection);

  const releaseSection = document.createElement("div");
  releaseSection.classList.add("releaseContent");

  const genreElementsCreator = async () => {
    const rawData = fetch(
      "https://api.themoviedb.org/3/genre/movie/list",
      modules
    )
      .then((response) => response.json())
      .then((responseData) => {
        const arr = [];
        const divContainer = document.createElement("div");
        divContainer.classList.add("radioGroup");

        for (let genre of responseData.genres) {
          const pELement = document.createElement("p");
          pELement.textContent = genre.name;
          divContainer.append(pELement);
        }

        filterSection.querySelector(".genresSection").append(divContainer);
      });
  };
  const languageGenerator = async () => {
    fetch(`https://api.themoviedb.org/3/configuration/languages`, modules)
      .then((res) => res.json())
      .then((data) => {
        const arr = data.map(({ english_name, iso_639_1 }) => ({
          english_name,
          iso_639_1,
        }));

        for (let element of arr) {
          const optionElement = document.createElement("option");
          optionElement.value = element.iso_639_1;
          optionElement.textContent = element.english_name;
          filterSection.querySelector(".languages").append(optionElement);
        }
      });
  };

  const scoreScaleGenerator = (ulClass, step, quantity, division) => {
    filterSection.querySelector(ulClass).innerHTML = "";

    const totalSteps = quantity / step;

    const divisionIncrement = totalSteps / division;

    let divisionIndex = 0;

    for (let i = 0; i <= totalSteps; i++) {
      const liElement = document.createElement("li");
      filterSection.querySelector(ulClass).appendChild(liElement);

      if (i === Math.round(divisionIndex)) {
        filterSection.querySelector(ulClass).getElementsByTagName("li")[
          i
        ].textContent = i * step;
        filterSection
          .querySelector(ulClass)
          .getElementsByTagName("li")
          [i].classList.add("division");

        divisionIndex += divisionIncrement;
      }
    }
    console.log(filterSection.querySelector(ulClass));
  };

  const rangeInfo = filterSection.querySelector(".rangeInfo");
  const range1 = filterSection.querySelector(".range01");
  const range2 = filterSection.querySelector(".range02");

  const toggleRangeView = () => {
    if (rangeInfo.classList.contains("visible")) {
      rangeInfo.classList.remove("visible");
    } else {
      rangeInfo.classList.add("visible");
    }
  };
  let isDragging = false;

  const updateRangeInfo = () => {
    const value1 = parseInt(range1.value);
    const value2 = parseInt(range2.value);
    rangeInfo.textContent = `Range ${value1} - ${value2}`;
  };

  const handleInput = (event) => {
    const target = event.target;
    let value1 = parseInt(range1.value);
    let value2 = parseInt(range2.value);

    if (target === range1) {
      if (value1 > value2) {
        range2.value = value1;
      }
    } else if (target === range2) {
      if (value2 < value1) {
        range1.value = value2;
      }
    }

    updateRangeInfo();

    if (value1 === value2) {
      if (target === range1) {
        range2.value = value1;
      } else {
        range1.value = value2;
      }
    }

    rangeInfo.classList.add("visible");
  };

  const handleMouseDown = () => {
    isDragging = true;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleDrag = (event) => {
    if (!isDragging) return;

    const target = event.target;
    const value1 = parseInt(range1.value);
    const value2 = parseInt(range2.value);

    if (value1 === value2) {
      if (target === range1) {
        range2.value = range1.value;
      } else if (target === range2 && parseInt(event.target.value) > value2) {
        range1.value = range2.value;
      }
    }

    updateRangeInfo();
  };

  range1.addEventListener("input", handleInput);
  range2.addEventListener("input", handleInput);
  range1.addEventListener("input", updateRangeInfo);
  range2.addEventListener("input", updateRangeInfo);
  range1.addEventListener("mousedown", handleMouseDown);
  range2.addEventListener("mousedown", handleMouseDown);
  range1.addEventListener("mouseup", handleMouseUp);
  range2.addEventListener("mouseup", handleMouseUp);
  range1.addEventListener("mouseup", toggleRangeView);
  range2.addEventListener("mouseup", toggleRangeView);
  range1.addEventListener("input", handleDrag);
  range2.addEventListener("input", handleDrag);

  genreElementsCreator();
  languageGenerator();
  scoreScaleGenerator(".scoreScale", 1, 10, 2);

  return searchSection;
};
