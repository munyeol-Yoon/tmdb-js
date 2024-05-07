import { options } from "./config.js";
import { displayFindAllAndSearchResults } from "./findAllAndSearch.js";
import { resetCurrentPage } from "./pagination.js";

// 카테고리 파일이에요. 아래를 보면 반복되는 것 같이 보일거에요. 반복된느 부분을 추가해 카테고리를 늘릴 수 있어요.
// 카테고리가 계속 늘어난 함수화해서 코드를 줄일 수 있을 거에요
// 만들어보시고 함수화해서 코드를 줄여보는 것도 도움이 될거에요!

const $movieCategory = document.querySelector(".movie-category");
const $tvCategory = document.querySelector(".tv-category");

export let categoryStatus = "movie";
/**
 * 이 부분은 건들이지 않았지만
 * 추후에 카테고리가 늘어나게 된다면
 * 추가하면 좋을 것 같아요!
 */
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
