import { options } from "./config.js";
import { mainFindAll } from "./mainFindAll.js";

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  options
)
  .then((response) => response.json())
  .then((response) => {
    mainFindAll(response);
  })
  .catch((err) => console.error(err));
