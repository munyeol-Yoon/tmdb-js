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
