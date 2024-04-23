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
  })
  .catch((err) => console.error(err));
