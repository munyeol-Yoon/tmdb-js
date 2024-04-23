const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTBjZmY5MGUxNGYwYzgwYzI3ZWFmMDllMzNmZTdiYiIsInN1YiI6IjYzOGM0MmM4OGE4NGQyMDA4NDc5NWVjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.obsbTyhT6NIRClGsmJzaESepiFyjsseY66n0BcGev8Y",
  },
};

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    const $cardContainer = document.querySelector(".card-container");

    response.results.forEach((movie) => {
      const cardDivElement = document.createElement("div");

      let card = `
        <h1>${movie.title}, ${movie.overview}, ${movie.vote_average}</h1>
      `;

      cardDivElement.innerHTML = card;

      $cardContainer.appendChild(cardDivElement);
    });
  })
  .catch((err) => console.error(err));
