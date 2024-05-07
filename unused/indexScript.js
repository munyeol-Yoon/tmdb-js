import {options} from "./config.js";
import {displayFindAllAndSearchResults} from "./findAllAndSearch.js";

// 확인해보시면 전체조회도 displayFindAllAndSearchResults를 사용하고 검색도 displayFindAllAndSearchResults 를 사용합니다. 유의해주세요!

// TODO 전체조회
fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", options)
  .then((response) => response.json())
  .then((response) => {
    // 수민님과 소영님이 작업하게 되실 부분이라고 예상됩니다.
    displayFindAllAndSearchResults(response);
  })
  .catch((err) => console.error(err));

// TODO 검색
const $searchForm = document.querySelector(".search-form");

$searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let searchQuery = document.getElementById("movie-search").value;

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=be0cff90e14f0c80c27eaf09e33fe7bb`);
    if (!response.ok) {
      throw new Error("API Error");
    }
    const data = await response.json();

    displayFindAllAndSearchResults(data);
  } catch (err) {
    console.error(err);
  }
});
