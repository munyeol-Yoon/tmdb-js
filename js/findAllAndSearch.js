// 수민님과 소영님이 기능작업하실때 사용할 파일입니다.
// displayFindAllAndSearchResults 함수는 여러 곳에서 사용해요.
// 여러 곳에서 사용한다는건 주의가 필요합니다.
// 주의가 필요하다고해서 두려워하지마시고, 이부분에 변경사항이 생길시 모든 기능을 테스트해봐야한다는 의미입니다!
// TOP 버튼을 만든다면 이 파일에 작성하는 것 보다는 indexScript.js 전체조회 부분에 작성하는 것이 바람직합니다.
// 왜냐하면 이 모듈을 여러곳에서 사용하고 있으니 여기에 TOP 버튼을 만든다면 다른 모든 페이지도 TOP 이 보이게 될 겁니다.
// main 페이지에 TOP 버튼이 나오기를 원하지 않으니 참고해주세요!

// TODO 이파일은 전체를 조회하거나, 검색을 할때 사용하는 모듈이에요. displayFindAllAndSearchResults 를 호출해 인자를 넣으면 card 들을 화면에 보여줍니다.

const $cardContainer = document.querySelector(".card-container");
const container = document.querySelector(".container");

export function displayFindAllAndSearchResults(response) {
  $cardContainer.innerHTML = "";

  // TODO 아래는 따로 설명해드릴게요. 글로적기에는 왜사용하는지 설명해야해서요 ! 저녁에 설명드리죠!
  const docFragment = document.createDocumentFragment();

  response.results.forEach((movie) => {
    if (!movie.poster_path) return; // 이 부분은 이미지가 없는 영화의 경우 제외시킨겁니다!

    const cardDivElement = document.createElement("div");
    cardDivElement.className = "card-container-card";
    cardDivElement.id = `card-${movie.id}`;

    let movieObj = {
      id: movie.id,
      title: movie.title ? movie.title : movie.name,
      img: `https://image.tmdb.org/t/p/w400/${movie.poster_path}`,
      overview: movie.overview,
      rating: movie.vote_average,
    };

    // img 파일만 보이게 해 놓은 상태 입니다.
    let card = `<a href = "/feature/detail.html?media_id=${movieObj.id}"
    <div class="content">
      <img src="${movieObj.img}" />
    </div></a>
    `;

    cardDivElement.innerHTML = card;
    docFragment.appendChild(cardDivElement);
  });
  $cardContainer.appendChild(docFragment);
}
