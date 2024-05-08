// ***스크롤 최상단 이동
const $topBtn = document.querySelector(".move-to-top");
const $bottomBtn = document.querySelector(".move-to-bottom");

$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

$bottomBtn.onclick = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};
