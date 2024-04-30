import { options } from "./config.js";
import { displayFindAllAndSearchResults } from "./findAllAndSearch.js";
import { categoryStatus } from "./category.js";

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
    `https://api.themoviedb.org/3/discover/${categoryStatus}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      displayFindAllAndSearchResults(response);
      const totalPages = response.total_pages;
      $currentPage.textContent = page;
      isFetchingData = false;

      if (page === totalPages) {
        alert("마지막 페이지 입니다.");
        $nextPageBtn.disabled = true;
      } else {
        $nextPageBtn.disabled = false;
      }
    })
    .catch((err) => {
      console.error(err);
      isFetchingData = false;
    });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function resetCurrentPage() {
  currentPage = 1;
  $currentPage.textContent = currentPage;
}
