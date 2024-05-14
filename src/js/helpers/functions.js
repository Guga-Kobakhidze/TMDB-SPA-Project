import SearchData from "../views/search/search";

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

<<<<<<< HEAD
export const generalDataFetcher = async (keyword1, keyword2) =>
  fetch(
    `https://api.themoviedb.org/3/${keyword1}/${keyword2}`,
    modules
  ).then((response) => response.json());
=======
// Search Function

export function SearchFunction(input, form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchQuery = input.value.trim();

    if (searchQuery === "") return;

    scrollToTop();
    SearchData(searchQuery);

    setTimeout(() => {
      input.value = "";
      form.classList.remove("showSearch");
    }, 0);
  });
}
>>>>>>> 23f3e79950063e3aa39ef424828ddcf51d71bd39
