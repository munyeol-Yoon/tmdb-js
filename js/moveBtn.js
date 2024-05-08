// ***스크롤 최상단 이동
const $topBtn = document.querySelector(".moveToTop");
const $bottomBtn = document.querySelector(".moveToBottom");

$topBtn.onclick = () => {
  console.log("btn");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

$bottomBtn.onclick = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};
