import { MovieDetails } from "../../components/detailed/movieDetails";
import { CategoryKeywords } from "../../helpers/Links";
import { Fetching } from "../../helpers/functions";

const movieDetailsPage = () => {
  const app = document.getElementById("app");
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  Fetching(CategoryKeywords.movie, movieId)
    .then((data) => {
      const movieDetailedPage = MovieDetails(
        data.backdrop_path,
        data.poster_path,
        data.title,
        data.release_date,
        data.genres[0].name,
        data.original_language,
        data.runtime,
        data.vote_average,
        data.tagline,
        data.overview,
        data.production_companies[0].name,
        data.id
      );

      app.innerHTML = movieDetailedPage;
    })
    .catch((err) => console.error(err));
};

export default movieDetailsPage;
