// 기준님과 혜진님은 이코드들 중앙 통제실 처럼 쓰시면 됩니다.
// best 는 파일을 분리해 모듈화해서 여기서 불러오는 식이면 좋을 것 같습니다.
// 어려우시다면 하단에 함수를 만들어 displayModal 함수 안에 넣는 식으로 하셔도 좋습니다!
// 처음부터 어렵게 진행하시기보단 할수 있는 방법으로 만들어보고 리펙토링하는 방법을 권장합니다!

const container = document.querySelector(".container");
let closeButton;

export function displayModal(movieObj) {
  // 1. 모달 안의 HTML 들을 초기화해요.
  container.innerHTML = "";

  // 2. 내용을 담을 div 엘리먼트를 만들어요.
  const $modal = document.createElement("div");
  $modal.className = "modal";

  // 3. 이 변수가 모달 안의 내용들이에요.
  let modal = `
  <h1>영화정보와 평점, 로그인을 넣을 공간 입니다.</h1>
  `;

  // 4. 아래 코드로 DOM 에 삽입해요.
  $modal.innerHTML = modal;
  container.appendChild($modal);

  // TODO 위의 코드를 참고해서 모달 안의 내용을 여기에 채우시면됩니다. 1, 2 번 부분의 코드는 주석으로 지워두고 시작하세요!

  // 버튼에 관련된 코드입니다. 기획상 close 버튼은 사용하지 않으니 불필요한 부분이겠죠?
  if (closeButton) {
    closeButton.removeEventListener("click", toggleContainer);
  }

  closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", hideModal);
}

container.addEventListener("click", (e) => {
  if (e.target === container) {
    hideModal();
  }
});

function hideModal() {
  container.style.display = "none";
}

function toggleContainer() {
  const container = document.querySelector(".container");
  container.style.display =
    container.style.display === "none" ? "flex" : "none";
}
