import { FetchExchanges } from "../../helpers/functions";

export const exchangeCurrencies = () => {
  const popUp = document.createElement("div");
  popUp.classList.add("exchange");

  const selectForm = document.createElement("form");
  selectForm.classList.add("selectForm");

  const SelectInput = document.createElement("select");
  SelectInput.classList.add("SelectInput");
  SelectInput.setAttribute("name", "select");
  SelectInput.innerHTML = `<option value="">Select $$$ - $$$ </option>`;

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

  return popUp;
};
