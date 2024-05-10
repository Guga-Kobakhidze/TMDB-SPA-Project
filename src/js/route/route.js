import home from "../views/home.js";
import tvshows from "../views/tvshows.js";
import movies from "../views/movies.js";
import people from "../views/people.js";
import details from "../views/details.js";

const routes = {
  "/": { title: "Home", render: home },
  "/movies": { title: "Movies", render: () => movies("popular") },
  "/movies/popular": {
    title: "Movies - Popular",
    render: () => movies("popular"),
  },
  "/movies/nowplaying": {
    title: "Movies - Now Playing",
    render: () => movies("now_playing"),
  },
  "/movies/toprated": {
    title: "Movies - Top Rated",
    render: () => movies("top_rated"),
  },
  "/movies/upcoming": {
    title: "Movies - Upcoming",
    render: () => movies("upcoming"),
  },
  "/tvshows": { title: "TV Shows", render: () => tvshows("popular") },
  "/tvshows/popular": {
    title: "TV Shows - popular",
    render: () => tvshows("popular"),
  },
  "/tvshows/on_the_air": {
    title: "TV Shows - On The Air",
    render: () => tvshows("on_the_air"),
  },
  "/tvshows/top_rated": {
    title: "TV Shows - Toprated",
    render: () => tvshows("top_rated"),
  },
  "/tvshows/airing_today": {
    title: "TV Shows - Airing Today",
    render: () => tvshows("airing_today"),
  },
  "/person": {
    title: "Person populars",
    render: people,
  },
  "/person/details": {
    title: "details",
    render: details,
  },
};

export default routes;