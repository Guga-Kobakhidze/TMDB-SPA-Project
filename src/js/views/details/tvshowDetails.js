import { ItemDetails } from "../../components/detailed/itemDetails";
import { Loader } from "../../components/loader/loader";
import { CategoryKeywords } from "../../helpers/Links";
import { Fetching } from "../../helpers/functions";

const tvShowDetailsPage = () => {
  const app = document.getElementById("app");
  const urlParams = new URLSearchParams(window.location.search);
  const tvshowId = urlParams.get("id");
  Loader("flex");

  Fetching(CategoryKeywords.tv, tvshowId)
    .then((data) => {
      const movieDetailedPage = ItemDetails(
        CategoryKeywords.tv,
        data.backdrop_path,
        data.poster_path,
        data.name,
        data.first_air_date,
        data.genres,
        data.original_language,
        data.seasons,
        data.vote_average,
        data.tagline,
        data.overview,
        data.production_companies,
        data.id
      );

      app.innerHTML = movieDetailedPage;
    })
    .catch((err) => console.error(err));
};

export default tvShowDetailsPage;
