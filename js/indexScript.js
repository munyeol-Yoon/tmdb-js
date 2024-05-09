import { options } from "./config.js";
import { displayFindAllAndSearchResults } from "./findAllAndSearch.js";
import { categoryStatus } from "./category.js";

const $movieCategory = document.querySelector(".movie-category");
const $tvCategory = document.querySelector(".tv-category");

fetch(
  `https://api.themoviedb.org/3/discover/${categoryStatus}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
  options
)
  .then((response) => response.json())
  .then((response) => {
    updateCategoryColors(categoryStatus);
    displayFindAllAndSearchResults(response);
  })
  .catch((err) => console.error(err));

const $searchForm = document.querySelector(".search-form");

$searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let searchQuery = document.getElementById("movie-search").value;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${categoryStatus}?query=${searchQuery}&api_key=be0cff90e14f0c80c27eaf09e33fe7bb`
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

function updateCategoryColors(activeCategory) {
  if (activeCategory === "movie") {
    $movieCategory.style.color = "#76abae";
    $tvCategory.style.color = "white";
  }
  if (activeCategory === "tv") {
    $movieCategory.style.color = "white";
    $tvCategory.style.color = "#76abae";
  }
}
