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
  console.log(response);

  $cardContainer.innerHTML = "";

  response.results.forEach((movie) => {
    if (!movie.poster_path) return;

    const cardDivElement = document.createElement("div");
    cardDivElement.className = "card-container-card";
    cardDivElement.id = `${movie.id}`;

    let card = `
    <div class="content">
      <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" />
      <h3>${movie.title}</h3></br>
      <div class="text">
        <p>${movie.overview}</p></br>
        <p class="rating">Rating : ${movie.vote_average}</p>
      </div>
    </div>
    `;

    cardDivElement.innerHTML = card;

    $cardContainer.appendChild(cardDivElement);
  });
}
