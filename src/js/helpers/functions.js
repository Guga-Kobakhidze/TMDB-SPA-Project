import { Loader } from "../components/loader/loader";
import { fetchTrending } from "../components/sections/trending/trendingFetch";
import SearchData from "../views/search/search";

// Fetching Data functions

const options = {
  method: "GET",
  url: "https://api.fxratesapi.com/latest?api_key=fxr_demo_lmasdg193",
};

export const FetchExchanges = async () => {
  try {
    const response = await fetch(options.url);

    if (!response.ok) throw new Error("error fetching exchange");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const modules = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGIyODM4YjUyMmQwNGQ3ZTZkZjFlYzJhZDMyMjlhNCIsInN1YiI6IjY2M2IzMTI0YzMwYzM1MjUxYjY3YWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kGk_nDxUp27QPdgZokkfYCy5VQzeqInGhJlfTT4ZG-0",
  },
};

export const Fetching = async (category, title, page) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${category}/${title}?${page}`,
      modules
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

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

// Trending Functions

export function Slider(rightBtn, leftBtn, sliderCard, num, length) {
  let currentScroller = 0;

  rightBtn.addEventListener("click", () => {
    if (currentScroller > length) {
      rightBtn.style.backgroundColor = "red";
      setTimeout(() => {
        rightBtn.style.backgroundColor = "";
      }, 500);
      return;
    } else {
      currentScroller += num;
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
      currentScroller -= num;
      sliderCard.style.transform = `translateX(-${currentScroller}px)`;
    }
  });
}

// Trending Change button EventListener
export function getTrendingCards(buttons) {
  buttons.forEach((btn) => {
    let btnAttr = btn.getAttribute("name");

    btn.addEventListener("click", () => {
      fetchTrending(btnAttr);

      buttons.forEach((otherBtn) => {
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

// Unknown info and bio

export function infoFinder(info) {
  let text = info;
  info == null || info == undefined || info == ""
    ? (text = "there is no information available")
    : (text = info);

  return text;
}

// Unknown images

export function imageFinder(image, changer) {
  let cover = image;
  image == null || image == undefined
    ? (cover = changer)
    : (cover = `https://image.tmdb.org/t/p/original${image}`);

  return cover;
}

export const MyName = (name) => {
  return name;
};
