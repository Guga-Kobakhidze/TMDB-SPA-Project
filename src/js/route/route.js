import home from "../views/home.js";
import tvshows from "../views/tvshows.js";
import movies from "../views/movies.js";
import person from "../views/person.js";
import movieDetails from "../views/details/details.js";
import personDetails from "../views/details/personDetails.js";

const routes = {
  "/": { title: "Home", render: home },
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
  "/movies/details": {
    title: "Movie Details",
    render: movieDetails,
  },
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
    render: person,
  },
  "/person/details": {
    title: "Person Details",
    render: personDetails,
  },
  "/search/query=:query": {
    title: "Search",
    render: (params) => SearchData(params.query),
  },
};

export default routes;
