// import { displayModal } from "./modal.js";

const $cardContainer = document.querySelector(".card-container");
const container = document.querySelector(".container");

export function displayFindAllAndSearchResults(response) {
  $cardContainer.innerHTML = "";

  const docFragment = document.createDocumentFragment();

  response.results.forEach((data) => {
    if (!data.poster_path) return;

    const cardDivElement = document.createElement("div");
    cardDivElement.className = "card-container-card";
    cardDivElement.id = `card-${data.id}`;

    let dataObj = {
      id: data.id,
      title: data.title ? data.title : data.name,
      img: `https://image.tmdb.org/t/p/w400/${data.poster_path}`,
      overview: data.overview,
      rating: data.vote_average,
    };

    let card = `
    <a href = "./detail.html?type=tv&media_id=${dataObj.id}"
    <div class="content">
      <img src="${dataObj.img}" />
    </div></a>
    `;

    // cardDivElement.addEventListener("click", () => {
    //   displayModal(movieObj);
    //   container.style.display = "flex";
    // });

    cardDivElement.innerHTML = card;
    docFragment.appendChild(cardDivElement);
  });
  $cardContainer.appendChild(docFragment);
}
