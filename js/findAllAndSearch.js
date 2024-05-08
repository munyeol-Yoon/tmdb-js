// 수민님과 소영님이 기능작업하실때 사용할 파일입니다.
// displayFindAllAndSearchResults 함수는 여러 곳에서 사용해요.
// 여러 곳에서 사용한다는건 주의가 필요합니다.
// 주의가 필요하다고해서 두려워하지마시고, 이부분에 변경사항이 생길시 모든 기능을 테스트해봐야한다는 의미입니다!
// TOP 버튼을 만든다면 이 파일에 작성하는 것 보다는 indexScript.js 전체조회 부분에 작성하는 것이 바람직합니다.
// 왜냐하면 이 모듈을 여러곳에서 사용하고 있으니 여기에 TOP 버튼을 만든다면 다른 모든 페이지도 TOP 이 보이게 될 겁니다.
// main 페이지에 TOP 버튼이 나오기를 원하지 않으니 참고해주세요!

// TODO 이파일은 전체를 조회하거나, 검색을 할때 사용하는 모듈이에요. displayFindAllAndSearchResults 를 호출해 인자를 넣으면 card 들을 화면에 보여줍니다.

// import { displayModal } from "./modal.js";

const $cardContainer = document.querySelector(".card-container");
const container = document.querySelector(".container");

export function displayFindAllAndSearchResults(response) {
  $cardContainer.innerHTML = "";

  const docFragment = document.createDocumentFragment();

  response.results.forEach((data) => {
    if (!data.poster_path) return;

    const cardDivElement = document.createElement("div");
    cardDivElement.className = "card-container-card";
    cardDivElement.id = `card-${data.id}`;

    let dataObj = {
      id: data.id,
      title: data.title ? data.title : data.name,
      img: `https://image.tmdb.org/t/p/w400/${data.poster_path}`,
      overview: data.overview,
      rating: data.vote_average,
    };

    let card = `
    <a href = "/feature/detail.html?type=tv&media_id=${dataObj.id}"
    <div class="content">
      <img src="${dataObj.img}" />
    </div></a>
    `;

    // 이 이벤트는 모달 이벤트가 발생하는 부분이에요!
    // cardDivElement.addEventListener("click", () => {
    //   displayModal(movieObj);
    //   container.style.display = "flex";
    // });

    cardDivElement.innerHTML = card;
    docFragment.appendChild(cardDivElement);
  });
  $cardContainer.appendChild(docFragment);
}
