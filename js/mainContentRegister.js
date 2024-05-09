export function mainContentRegister(response, parentTagName, childTagName) {
  const $cardSlide = document.querySelector(parentTagName);
  $cardSlide.innerHTML = "";

  const docFragment = document.createDocumentFragment();

  response.results.forEach((movie) => {
    if (!movie.poster_path) return;

    const cardDivElement = document.createElement("div");
    cardDivElement.className = childTagName;

    let movieObj = {
      id: movie.id,
      title: movie.title ? movie.title : movie.name,
      img: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
      overview: movie.overview,
      rating: movie.vote_average,
    };

    let card = `
    <div class="main-movie-card-image">
      <img src="${movieObj.img}" />
    </div>
    `;

    cardDivElement.innerHTML = card;
    docFragment.appendChild(cardDivElement);
  });

  for (let i = 0; i < 5; i++) {
    const posterPath = `https://image.tmdb.org/t/p/w300/${response.results[i].poster_path}`;
    const cardDivElement = document.createElement("div");
    cardDivElement.className = childTagName;

    let card = `
    <div class="main-movie-card-image">
      <img src="${posterPath}" />
    </div>
    `;

    cardDivElement.innerHTML = card;
    docFragment.appendChild(cardDivElement);
  }

  $cardSlide.appendChild(docFragment);
}
