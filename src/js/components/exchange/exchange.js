import { FetchExchanges } from "../../helpers/functions";

export const exchangeCurrencies = () => {
  const showPopup = document.createElement("div");
  showPopup.classList.add("show-popup");
  showPopup.innerHTML = "<i class='bx bxs-dollar-circle'></i>";

  const popUp = document.createElement("div");
  popUp.classList.add("exchange");

  const selectForm = document.createElement("form");
  selectForm.classList.add("selectForm");

  const SelectInput = document.createElement("select");
  SelectInput.classList.add("SelectInput");
  SelectInput.setAttribute("name", "select");
  SelectInput.innerHTML = `<option value="">$$$ - $$$ </option>`;

  FetchExchanges()
    .then((data) => {
      if (data && data.rates) {
        Object.keys(data.rates).forEach((currency) => {
          const option = document.createElement("option");
          option.setAttribute("value", currency);
          option.innerHTML = currency;
          SelectInput.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching exchange rates:", error);
    });

  selectForm.appendChild(SelectInput);
  popUp.appendChild(selectForm);
  showPopup.appendChild(popUp);

  showPopup.querySelector("i").addEventListener("click", () => {
    showPopup.classList.toggle("toggle");
  });

  return showPopup;
};
