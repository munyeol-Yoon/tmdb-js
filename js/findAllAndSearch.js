import { displayModal } from "./modal.js";

const $cardContainer = document.querySelector(".card-container");
const container = document.querySelector(".container");

export function displayFindAllAndSearchResults(response) {
  console.log(response);

  $cardContainer.innerHTML = "";

  const docFragment = document.createDocumentFragment();

  response.results.forEach((movie) => {
    if (!movie.poster_path) return;

    const cardDivElement = document.createElement("div");
    cardDivElement.className = "card-container-card";
    cardDivElement.id = `card-${movie.id}`;

    let movieObj = {
      id: movie.id,
      title: movie.title ? movie.title : movie.name,
      img: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
      overview: movie.overview,
      rating: movie.vote_average,
    };

    let card = `
    <div class="content">
      <img src="${movieObj.img}" />
      <h3>${movieObj.title}</h3><br />
      <div class="text">
        <p>${movieObj.overview}</p><br />
        <p class="rating">Rating : ${movieObj.rating}</p>
      </div>
    </div>
    `;

    cardDivElement.addEventListener("click", () => {
      displayModal(movieObj);
      container.style.display = "flex";
    });

    cardDivElement.innerHTML = card;
    docFragment.appendChild(cardDivElement);
  });
  $cardContainer.appendChild(docFragment);
}
