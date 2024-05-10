import { pagination } from "../components/pagination/pagination.js";
import { PeopleCard } from "../components/peopleCard.js";
import { Fetching, scrollToTop } from "../helpers/functions.js";
import { CategoryKeywords } from "../helpers/Links.js";

let currentPage = 1;

const people = () => {
  const app = document.getElementById("app");

  const loadPerson = (page) => {
    Fetching(CategoryKeywords.person, "popular", `page=${page}`)
      .then((data) => {
        const personCards = data.results.map((card) => {
          return PeopleCard(
            card.id,
            card.original_name,
            card.profile_path,
            card.known_for
          );
        });

        const allCards = personCards.join("");
        const allCardsContainer = document.createElement("div");
        allCardsContainer.classList.add("PersonCards");
        allCardsContainer.innerHTML = allCards;

        const Title = document.createElement("h1");
        Title.innerHTML = "Popular People";

        const container = document.createElement("div");
        container.classList.add("PersonSection", "container");
        container.append(Title, allCardsContainer);
        container.insertAdjacentHTML("beforeend", pagination);

        app.innerHTML = "";
        app.appendChild(container);

        const nextBtn = container.querySelector(".next");
        const prevBtn = container.querySelector(".prev");

        nextBtn.addEventListener("click", () => {
          currentPage++;
          loadPerson(currentPage);
          scrollToTop();
        });

        prevBtn.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            loadPerson(currentPage);
            scrollToTop();
          }
        });
      })
      .catch((err) => console.error(err));
  };

  loadPerson(currentPage);
};

export default people;
