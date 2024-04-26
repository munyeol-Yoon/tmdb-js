const $cardContainerCard = document.querySelector(".card-container-card");
// const $cardContainer = document.querySelector(".card-container");
// const $cardContent = document.querySelector(".content");
const container = document.querySelector(".container");
let closeButton;

export function displayModal(movieObj) {
  container.innerHTML = "";

  const $modal = document.createElement("div");
  $modal.className = "modal";

  let modal = `
    <h2>${movieObj.title}</h2>
    <img src="${movieObj.img}" />
    <p>${movieObj.overview}</p>
    <p>Rating: ${movieObj.rating}</p>
    <button class="close">Close</button>
  `;

  $modal.innerHTML = modal;
  container.appendChild($modal);

  if (closeButton) {
    closeButton.removeEventListener("click", toggleContainer);
  }

  closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", hideModal);

  // $cardContainerCard.addEventListener("click", () => {
  //   container.style.display = "flex";
  // });
}

container.addEventListener("click", (e) => {
  if (e.target === container) {
    hideModal();
  }
});

function hideModal() {
  container.style.display = "none";
}

function toggleContainer() {
  const container = document.querySelector(".container");
  container.style.display =
    container.style.display === "none" ? "flex" : "none";
}
