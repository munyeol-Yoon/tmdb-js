const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTBjZmY5MGUxNGYwYzgwYzI3ZWFmMDllMzNmZTdiYiIsInN1YiI6IjYzOGM0MmM4OGE4NGQyMDA4NDc5NWVjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.obsbTyhT6NIRClGsmJzaESepiFyjsseY66n0BcGev8Y",
  },
};

const $cardContainer = document.querySelector(".card-container");

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  options
)
  .then((response) => response.json())
  .then((response) => {
    displayFindAllAndSearchResults(response);
  })
  .catch((err) => console.error(err));

const $searchForm = document.querySelector(".search-form");

$searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let searchQuery = document.getElementById("movie-search").value;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=be0cff90e14f0c80c27eaf09e33fe7bb`
    );
    if (!response.ok) {
      throw new Error("API Error");
    }
    const data = await response.json();

    displayFindAllAndSearchResults(data);
  } catch (err) {
    console.error(err);
  }
});

function displayFindAllAndSearchResults(response) {
  // console.log(response);

  $cardContainer.innerHTML = "";

  const docFragment = document.createDocumentFragment();

  response.results.forEach((movie) => {
    if (!movie.poster_path) return;

    const cardDivElement = document.createElement("div");
    cardDivElement.className = "card-container-card";
    cardDivElement.id = `card-${movie.id}`;

    let movieObj = {
      id: movie.id,
      title: movie.title,
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

    cardDivElement.addEventListener("click", () => displayModal(movieObj));

    cardDivElement.innerHTML = card;
    docFragment.appendChild(cardDivElement);
  });
  $cardContainer.appendChild(docFragment);
}

let closeButton;

function displayModal(movieObj) {
  const container = document.querySelector(".container");

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
  closeButton.addEventListener("click", () => {
    container.style.display = "none";
  });

  $cardContainer.addEventListener("click", () => {
    container.style.display = "flex";
  });
}

function toggleContainer() {
  const container = document.querySelector(".container");
  container.style.display =
    container.style.display === "none" ? "flex" : "none";
}

const $prevPageBtn = document.querySelector("#prevPage");
const $nextPageBtn = document.querySelector("#nextPage");
const $currentPage = document.querySelector("#currentPage");

let currentPage = 1;
let isFetchingData = false;

$prevPageBtn.addEventListener("click", () => {
  if (!isFetchingData && currentPage > 1) {
    currentPage--;
    fetchData(currentPage);
    scrollToTop();
  }
});

$nextPageBtn.addEventListener("click", () => {
  if (!isFetchingData) {
    currentPage++;
    fetchData(currentPage);
    scrollToTop();
  }
});

function fetchData(page) {
  isFetchingData = true;
  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      displayFindAllAndSearchResults(response);
      $currentPage.textContent = page;
      isFetchingData = false;
    })
    .catch((err) => {
      console.error(err);
      isFetchingData = false;
    });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
