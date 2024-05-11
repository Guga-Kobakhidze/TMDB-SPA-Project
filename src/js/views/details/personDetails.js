import { PersonDetails } from "../../components/detailed/peopleDetails.js";
import { Fetching } from "../../helpers/functions.js";
import { CategoryKeywords } from "../../helpers/Links.js";

const details = () => {
  const app = document.getElementById("app");
  const urlParams = new URLSearchParams(window.location.search);
  const personId = urlParams.get("id");

  Fetching(CategoryKeywords.person, personId)
    .then((data) => {
      const detailedPageContent = PersonDetails(
        data.profile_path,
        data.name,
        data.biography,
        data.known_for_department,
        data.birthday,
        data.place_of_birth,
        data.id
      );
      app.innerHTML = detailedPageContent;
    })
    .catch((err) => console.error(err));
};

export default details;
