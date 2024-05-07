// 탑 버튼, 언더 버튼 기능 부분 입니다.

const $topBtn = document.querySelector(".moveTopBtn");
const $underBtn = document.querySelector(".moveUnderBtn");

$topBtn.onclick = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};
$underBtn.onclick = () => {
  window.scroll({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};
