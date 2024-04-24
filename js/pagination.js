import { options } from "./config.js";
import { displayFindAllAndSearchResults } from "./findAllAndSearch.js";

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
