import { Filter } from "../components/filter/filter";
import { pagination } from "../components/pagination/pagination";
import routes from "../route/route";

export function getItemPage(movieCards, pageKey) {
  const app = document.getElementById("app");
  const allCards = movieCards.join("");
  const allCardsContainer = document.createElement("div");
  allCardsContainer.classList.add("AllCards");
  allCardsContainer.innerHTML = allCards;

  const filterSection = Filter(pageKey);

  const container = document.createElement("div");
  container.classList.add("ProductsSection");
  container.classList.add("container");

  const productsContent = document.createElement("div");
  productsContent.classList.add("productsContent");

  let view = routes[location.pathname];
  const mainTitle = document.createElement("h1");
  mainTitle.classList.add("mainTitle");
  mainTitle.innerHTML = view.title;

  productsContent.append(filterSection, allCardsContainer);
  container.append(mainTitle, productsContent);
  container.insertAdjacentHTML("beforeend", pagination);
  app.innerHTML = "";
  app.appendChild(container);

  const filterClick = document.querySelector(".filterBox .title");
  const filterContent = document.querySelector(".filterContent");

  function getSearch(item, content, className) {
    item.addEventListener("click", () => {
      content.classList.toggle(className);
    });
  }

  getSearch(filterClick, filterContent, "show");

  return container;
}

// Filter Function

export function setupEventListeners(
  from,
  to,
  range1,
  range2,
  genres,
  selectEl,
  checkboxes,
  radios,
  allCheckBox,
  releaseCheckes,
  filters
) {
  // Release dates
  from.addEventListener("change", () => {
    filters.releaseFrom = from.value;
  });

  to.addEventListener("change", () => {
    filters.releaseTo = to.value;
  });

  // Range
  range1.addEventListener("input", () => {
    logRangeValues();
  });

  range2.addEventListener("input", () => {
    logRangeValues();
  });

  function logRangeValues() {
    filters.rangeFrom = range1.value;
    filters.rangeTo = range2.value;
  }

  // Genres
  genres.addEventListener("change", (event) => {
    const checkedCheckbox = event.target;
    const checkboxId = checkedCheckbox.id;
    if (checkedCheckbox.checked) {
      filters.genreStates[checkboxId] = checkedCheckbox.value;
    } else {
      delete filters.genreStates[checkboxId];
    }
  });

  // Languages
  selectEl.addEventListener("change", () => {
    const selectedValue = selectEl.value;
    filters.selectedLanguage = selectedValue;
  });

  // Checkboxes and radios
  function getAttribute(inputs) {
    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (input.type === "checkbox") {
          const attribute = input.getAttribute("id");
          filters.checkboxStates[attribute] = input.checked;
        } else if (input.type === "radio") {
          const attribute = input.getAttribute("id");
          filters.radio = attribute;
        }
      });
    });
  }

  getAttribute(checkboxes);
  getAttribute(radios);

  // Toggle checkboxes
  allCheckBox.addEventListener("change", () => {
    releaseCheckes.classList.toggle("hideCheckboxes");
  });
}
