const $cardContainer = document.querySelector(".main-card-container");

export function mainFindAll(response) {
  $cardContainer.innerHTML = "";

  const docFragment = document.createDocumentFragment();

  response.results.forEach((movie) => {
    if (!movie.poster_path) return;

    const cardDivElement = document.createElement("div");
    cardDivElement.className = "main-card-container-card";
    cardDivElement.id = `card-${movie.id}`;

    let movieObj = {
      id: movie.id,
      title: movie.title ? movie.title : movie.name,
      img: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
      overview: movie.overview,
      rating: movie.vote_average,
    };

    let card = `
    <div class="main-card-container-imageBox">
      <img src="${movieObj.img}" />
      
    </div>
    `;

    cardDivElement.innerHTML = card;
    docFragment.appendChild(cardDivElement);
  });
  // $cardContainer.appendChild(docFragment);
}
