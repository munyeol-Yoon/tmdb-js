import { options } from "./config.js";
import { mainContentRegister } from "./mainContentRegister.js";

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  options
)
  .then((response) => response.json())
  .then((response) => {
    mainContentRegister(
      response,
      ".main-movie-card-slide",
      "main-movie-card-container-card"
    );
  })
  .catch((err) => console.error(err));

fetch(
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  options
)
  .then((response) => response.json())
  .then((response) => {
    mainContentRegister(
      response,
      ".main-tv-card-slide",
      "main-tv-card-container-card"
    );
  })
  .catch((err) => console.error(err));
