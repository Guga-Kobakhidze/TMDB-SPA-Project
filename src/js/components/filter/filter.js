import { modules } from "../../helpers/functions";
export const Filter = (pageKey) => {
  const isShow = pageKey === "movie";

  const filterBox = `
        <form class="filterBox filter-form">
              <div class="title">
                  <h2>Filters</h2>
                  <i class='bx bx-chevron-right'></i>
              </div>
              <div class="filterForm">
                  <h2>Show Me</h2>
                  <div class="radioGroup filterTitle filterShow">
                      <div class="radioLabel">
                          <input type="radio" id="0" name="movieType" checked />
                          <label for="0">Everything</label>
                      </div>
                      <div class="radioLabel">
                          <input type="radio" id="1" name="movieType" />
                          <label for="1">${
                            isShow ? `Movies` : `TV Shows`
                          } I Haven't Seen</label>
                      </div>
                      <div class="radioLabel">
                          <input type="radio" id="2" name="movieType" />
                          <label for="2">${
                            isShow ? `Movies` : `TV Shows`
                          } I have Seen</label>
                      </div>
                  </div>
                  <div class="filterForm filterRelease filterTitle">
                      <h2>Release Dates</h2>
                      <div class="radioLabel ReleaseDate">
                          <input type="checkbox" id="searchAll" name="releaseType" />
                          <label for="searchAll">Search all releases?</label>
                      </div>
                     ${
                       isShow
                         ? `<div class="otherCheckboxes">
                          <div class="radioLabel ReleaseDate">
                              <input type="checkbox" id="222" name="releaseType" />
                              <label for="222">Theatrical (limited)</label>
                          </div>
                          <div class="radioLabel ReleaseDate">
                              <input type="checkbox" id="333" name="releaseType" />
                              <label for="333">Theatrical</label>
                          </div>
                          <div class="radioLabel ReleaseDate">
                              <input type="checkbox" id="111" name="releaseType" />
                              <label for="111">Premiere</label>
                          </div>
                          <div class="radioLabel ReleaseDate">
                              <input type="checkbox" id="444" name="releaseType" />
                              <label for="444">Digital</label>
                          </div>
                          <div class="radioLabel ReleaseDate">
                              <input type="checkbox" id="555" name="releaseType" />
                              <label for="555">Physical</label>
                          </div>
                          <div class="radioLabel ReleaseDate">
                              <input type="checkbox" id="666" name="releaseType" />
                              <label for="666">TV</label>
                          </div>
                      </div>`
                         : ""
                     }
                      <div class="datePicker">
                          <div>
                              <label for="releaseFrom">From:</label>
                              <input type="date" id="releaseFrom" name="releaseFrom">
                          </div>
                          <div>
                              <label for="releaseTo">To:</label>
                              <input type="date" id="releaseTo" name="releaseTo">
                          </div>
                      </div>
                  </div>
                  <div class="filterForm filterTitle">
                      <h2>Genres</h2>
                      <div class="allGenres"></div>
                  </div>
                  <div class="filterForm languageContainer filterTitle">
                      <h2>Language</h2>
                      <select class="languages" name="languages">
                          <option value="">Select a language...</option>
                          <!-- Add language options here -->
                      </select>
                  </div>
                  <div class="filterForm filterTitle filterRage">
                      <h2>User Score</h2>
                      <div class="double_range_slider_box">
                          <p class='rangeInfo'>Range</p>
                          <ul class='scoreScale'>
                          </ul>
                          <div class="double_range_slider">
                              <input type="range" class="inputRange range01" min="0" max="10" value="0" step="1" />
                              <input type="range" class="inputRange range02" min="0" max="10" value="10" step="1" />
                          </div>
                      </div>
                  </div>
                  <button type="submit" class="searchBtn">Search</button>
              </div>
        </form>
    `;

  const filterSection = document.createElement("div");
  filterSection.classList.add("filterContent");

  filterSection.innerHTML = filterBox;

  const searchSection = document.createElement("div");
  searchSection.append(filterSection);

  const releaseSection = document.createElement("div");
  releaseSection.classList.add("releaseContent");

  const genreElementsCreator = async () => {
    fetch(
      `https://api.themoviedb.org/3/genre/${isShow ? "movie" : "tv"}/list`,
      modules
    )
      .then((response) => response.json())
      .then((data) => {
        const genreArr = data.genres.map(({ name, id }) => ({
          id,
          name,
        }));
        console.log(genreArr);

        for (let element of genreArr) {
          const divElement = document.createElement("div");
          divElement.classList.add("genreCheckbox");

          const inputElement = document.createElement("input");
          inputElement.type = "checkbox";
          inputElement.id = element.id;

          const labelElement = document.createElement("label");
          labelElement.textContent = element.name;
          labelElement.setAttribute("for", element.id);

          divElement.append(inputElement, labelElement);

          filterSection.querySelector(".allGenres").appendChild(divElement);
        }
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
