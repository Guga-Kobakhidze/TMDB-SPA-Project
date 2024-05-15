import { ProductsCard } from "../components/productCard";
import SearchData from "../views/search/search";
import { CategoryKeywords } from "./Links";

// Fetching Data functions

export const modules = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGIyODM4YjUyMmQwNGQ3ZTZkZjFlYzJhZDMyMjlhNCIsInN1YiI6IjY2M2IzMTI0YzMwYzM1MjUxYjY3YWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kGk_nDxUp27QPdgZokkfYCy5VQzeqInGhJlfTT4ZG-0",
  },
};

export const Fetching = async (category, title, page) =>
  fetch(
    `https://api.themoviedb.org/3/${category}/${title}?${page}`,
    modules
  ).then((response) => response.json());

// Scroll to Top

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const generalDataFetcher = async (keyword1, keyword2) =>
  fetch(`https://api.themoviedb.org/3/${keyword1}/${keyword2}`, modules).then(
    (response) => response.json()
  );

export function SearchFunction(input, form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchQuery = input.value.trim();

    if (searchQuery === "") return;

    SearchData(searchQuery);
    scrollToTop();

    setTimeout(() => {
      input.value = "";
      form.classList.remove("showSearch");
    }, 0);
  });
}

// Trending  Functions

export function Slider(rightBtn, leftBtn, sliderCard) {
  let currentScroller = 0;

  rightBtn.addEventListener("click", () => {
    if (currentScroller > 2590) {
      rightBtn.style.backgroundColor = "red";
      setTimeout(() => {
        rightBtn.style.backgroundColor = "";
      }, 500);
      return;
    } else {
      currentScroller += 200;
      sliderCard.style.transform = `translateX(-${currentScroller}px)`;
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentScroller <= 0) {
      leftBtn.style.backgroundColor = "red";
      setTimeout(() => {
        leftBtn.style.backgroundColor = "";
      }, 500);
      return;
    } else {
      currentScroller -= 200;
      sliderCard.style.transform = `translateX(-${currentScroller}px)`;
    }
  });
}

export function getTrendingCards(button, day, week) {
  button.forEach((btn) => {
    const attribute = btn.getAttribute("name");

    btn.addEventListener("click", () => {
      switch (attribute) {
        case "day":
          day.style.display = "flex";
          week.style.display = "none";
          break;
        case "week":
          day.style.display = "none";
          week.style.display = "flex";
          break;
      }

      button.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.classList.remove("chosen");
        }
      });
      btn.classList.add("chosen");
    });
  });
}

// Search popup function

export function SearchPopup(e, popup) {
  const mouseX = e.pageX;
  const mouseY = e.pageY;
  popup.style.left = `${mouseX}px`;
  popup.style.top = `${mouseY}px`;
}
