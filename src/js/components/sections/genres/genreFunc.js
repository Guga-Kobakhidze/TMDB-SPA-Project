export function GenreFunc(valueOne, valueTwo, className = null) {
  const genreContent = document.createElement("div");
  genreContent.classList.add("genreContent");
  genreContent.append(valueOne, valueTwo);

  const genreCard = document.createElement("div");
  genreCard.classList.add("genreCard", "container");
  genreCard.append(genreContent);

  const ganreContainer = document.createElement("div");
  ganreContainer.classList.add("genreContainer");
  ganreContainer.classList.add(className);
  ganreContainer.append(genreCard);

  return ganreContainer;
}
