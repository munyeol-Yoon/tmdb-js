import { options } from "./config.js";
import { displayFindAllAndSearchResults } from "./findAllAndSearch.js";

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

const $topBtn = document.querySelector(".moveToTop");
const $bottomBtn = document.querySelector(".moveToBottom");

$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

$bottomBtn.onclick = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};
