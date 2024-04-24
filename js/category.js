import { options } from "./config.js";
import { displayFindAllAndSearchResults } from "./findAllAndSearch.js";
import { resetCurrentPage } from "./pagination.js";

const $movieCategory = document.querySelector(".movie-category");
const $tvCategory = document.querySelector(".tv-category");

export let categoryStatus = "movie";

$movieCategory.addEventListener("click", async () => {
  categoryStatus = "movie";
  fetch(
    `https://api.themoviedb.org/3/discover/${categoryStatus}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      displayFindAllAndSearchResults(response);
      resetCurrentPage();
    })
    .catch((err) => console.error(err));
});

$tvCategory.addEventListener("click", async () => {
  categoryStatus = "tv";
  fetch(
    `https://api.themoviedb.org/3/discover/${categoryStatus}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      displayFindAllAndSearchResults(response);
      resetCurrentPage();
    })
    .catch((err) => console.error(err));
});
