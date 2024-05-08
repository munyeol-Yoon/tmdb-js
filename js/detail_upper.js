// 영화/tv시리즈의 상세 정보가 표시되는 detail page의 상단부 내용 구현하는 js 모듈 - 윤기준

// 클릭한 영화에 대해 표기될 정보들이 할당될 객체 미리 선언해둠
let mediaInfos = {
  mediaID: 0,
  mediaType: "",
  posterPath: "",
  rating: 0,
  $mediaTitle: "",
  overview: "",
  backdropPath: "",
  genreIds: [],
  genre: [],
  actors: [],
  directors: [],
  directorCount: 0,
};

// url 내 클릭한 미디어 ID 정보 가져오는 함수
const getMediaIdAndType = async () => {
  const urlParams = new URL(location.href).searchParams;
  mediaInfos.mediaID = parseInt(urlParams.get("media_id"));
  mediaInfos.mediaType = urlParams.get("type");
  console.log(mediaInfos.mediaType);
};
// 위 함수를 실행시킨 결과(=클릭한 미디어의 ID)를 mediaID 속성으로 할당

// TMDB에서 id에 따른 영화 정보 받아오는 함수
const fetchMovieData = async (targetID) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDJlYjRiZmU3MDgxMWYxZTM4NTQ2NjdlY2E3ODMxZSIsInN1YiI6IjY2MmU1ODJiNjlkMjgwMDEyNjQzMWZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCAD6KLBg4hPCt30_MWWZ-UoNY_Da5R_IKuLnVelElQ",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${parseInt(targetID)}?language=en-US`,
    options
  );
  const data = await response.json();
  return data;
};

// TMDB에서 id에 따른 tv 정보 받아오는 함수
const fetchTVData = async (targetID) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDJlYjRiZmU3MDgxMWYxZTM4NTQ2NjdlY2E3ODMxZSIsInN1YiI6IjY2MmU1ODJiNjlkMjgwMDEyNjQzMWZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCAD6KLBg4hPCt30_MWWZ-UoNY_Da5R_IKuLnVelElQ",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${parseInt(targetID)}?language=en-US`,
    options
  );
  const data = await response.json();
  console.log(data);
  return data;
};

// TMDB 서버에 접근해 지정된 영화 ID에 따른 출연진 및 스태프 정보를 가져오는 함수
const fetchMovieCredit = async (targetID) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDJlYjRiZmU3MDgxMWYxZTM4NTQ2NjdlY2E3ODMxZSIsInN1YiI6IjY2MmU1ODJiNjlkMjgwMDEyNjQzMWZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCAD6KLBg4hPCt30_MWWZ-UoNY_Da5R_IKuLnVelElQ",
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${parseInt(
      targetID
    )}/credits?language=en-US`,
    options
  );
  const data = await response.json();
  return data;
};

// TMDB 서버에 접근해 지정된 영화 ID에 따른 출연진 및 스태프 정보를 가져오는 함수
const fetchTvCredit = async (targetID) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDJlYjRiZmU3MDgxMWYxZTM4NTQ2NjdlY2E3ODMxZSIsInN1YiI6IjY2MmU1ODJiNjlkMjgwMDEyNjQzMWZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCAD6KLBg4hPCt30_MWWZ-UoNY_Da5R_IKuLnVelElQ",
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${parseInt(
      targetID
    )}/credits?language=en-US`,
    options
  );
  const data = await response.json();
  console.log(data);
  return data;
};

// 가져온 미디어 ID를 바탕으로 클릭 타겟 미디어에 대한 배우들 및 감독 정보와 더불어,
// 영화 제목, 설명, 포스터 사진, 평점 정보를 구축하는 함수
const createDatabase = async () => {
  await getMediaIdAndType();
  const rawData = {};

  // 클릭한 미디어가 영화일 때 실행시키는 부분임
  if (mediaInfos.mediaType === "movie") {
    // TMDB API에서 가져온 타겟 영화의 제작진 정보 객체를 상수 crews에 할당
    rawData.crews = await fetchMovieCredit(mediaInfos.mediaID);
    // TMDB API에서 가져온 타겟 영화의 상세 정보 객체를 상수 crews에 할당
    rawData.infos = await fetchMovieData(mediaInfos.mediaID);

    rawData.crews.cast.forEach((actor) => {
      const currentActor = {
        name: actor.name,
        gender: actor.gender,
        characterName: actor.character,
        creditId: actor.credit_id,
        id: actor.id,
        profilepath: actor.profile_path,
      };
      mediaInfos.actors.push(currentActor);
    });
    // 각 감독의 이름, 성별, creditID, ID, 프로필사진 path가 담긴 객체들을 이전에 만든 directors 배열에 저장함
    // (감독도 여러명일 수 있으므로..)
    rawData.crews.crew.forEach((crew) => {
      if (crew.job === "Director") {
        const currentCrew = {
          name: crew.name,
          gender: crew.gender,
          creditId: crew.credit_id,
          id: crew.id,
          profilepath: crew.profile_path,
          job: crew.job,
        };
        mediaInfos.directors.push(currentCrew);
      }
    });

    // 색출된 타겟 미디어에서 필요한 정보 추출해 사전에 선언해둔 MediaInfos 객체에 할당시킴
    // 추후 해당 객체 통해 html 구성
    mediaInfos.$mediaTitle = rawData.infos.title;
    mediaInfos.posterPath = rawData.infos.poster_path;
    mediaInfos.rating = rawData.infos.vote_average.toFixed(1);
    mediaInfos.overview = rawData.infos.overview;
    mediaInfos.backdropPath = rawData.infos.backdrop_path;

    rawData.infos.genres.forEach((genre) => {
      mediaInfos.genre.push(genre.name);
    });
  }
  // 클릭한 미디어가 tv일 때 실행시키는 부분임
  else {
    // TMDB API에서 가져온 타겟 tv시리즈의 제작진 정보 객체를 상수 crews에 할당
    rawData.crews = await fetchTvCredit(mediaInfos.mediaID);
    // TMDB API에서 가져온 타겟 tv시리즈의 상세 정보 객체를 상수 crews에 할당
    rawData.infos = await fetchTVData(mediaInfos.mediaID);

    rawData.crews.cast.forEach((actor) => {
      const currentActor = {
        name: actor.name,
        gender: actor.gender,
        characterName: actor.character,
        creditId: actor.credit_id,
        id: actor.id,
        profilepath: actor.profile_path,
      };
      mediaInfos.actors.push(currentActor);
    });
    // 각 감독의 이름, 성별, creditID, ID, 프로필사진 path가 담긴 객체들을 이전에 만든 directors 배열에 저장함
    // (감독도 여러명일 수 있으므로..)
    rawData.crews.crew.forEach((crew) => {
      if (
        crew.job === "Director" ||
        crew.job === "Creator" ||
        crew.job === "Writers' Production" ||
        crew.job === "Executive Producer"
      ) {
        const currentCrew = {
          name: crew.name,
          gender: crew.gender,
          creditId: crew.credit_id,
          id: crew.id,
          profilepath: crew.profile_path,
          job: crew.job,
          popularity: crew.popularity,
        };
        mediaInfos.directors.push(currentCrew);
      }
    });
    // 감독이 여러명일 경우 이후 코드에 의해 2명까지만 화면에 표시되는데,
    // 이 때 가장 인기가 높은 두명만 표기되게끔 미리 정렬해둠
    mediaInfos.directors.sort((a, b) => b.popularity - a.popularity);

    // 색출된 타겟 미디어에서 필요한 정보 추출해 사전에 선언해둔 MediaInfos 객체에 할당시킴
    // 추후 해당 객체 통해 html 구성
    mediaInfos.$mediaTitle = rawData.infos.name;
    mediaInfos.posterPath = rawData.infos.poster_path;
    mediaInfos.rating = rawData.infos.vote_average.toFixed(1);
    mediaInfos.overview = rawData.infos.overview;
    mediaInfos.backdropPath = rawData.infos.backdrop_path;
    mediaInfos.genreIds = rawData.infos.genre_ids;

    rawData.infos.genres.forEach((genre) => {
      mediaInfos.genre.push(genre.name);
    });
  }
  console.log(mediaInfos);
};

// 백드롭 이미지, 제목, 평점, 장르 표시되는 상단부 섹션 구현하는 함수
const createBackdropSection = () => {
  const $backdropWallpaper = document.getElementById("backdrop-wallpaper");
  const $mediaTitle = document.getElementById("title");
  const $mediaRating = document.getElementById("rating");
  const $mediaGenre = document.getElementById("genres");
  $backdropWallpaper.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${mediaInfos.backdropPath})`;
  $mediaTitle.innerText = `${mediaInfos.$mediaTitle}`;
  $mediaRating.innerText = `${mediaInfos.rating} /10`;

  mediaInfos.genre.forEach((genre, index) => {
    if (index !== mediaInfos.genre.length - 1) {
      const $$addTargetGenre = document.createTextNode(genre + " / ");
      $mediaGenre.appendChild($$addTargetGenre);
    } else {
      const $$addTargetGenre = document.createTextNode(genre);
      $mediaGenre.appendChild($$addTargetGenre);
    }
  });
};

// 포스터 사진과 평점 section 내용 구현하는 함수
const createPosterAndOverviewSection = () => {
  const $posterAndOverviewSection = document.getElementById(
    "poster-and-overview"
  );
  $posterAndOverviewSection.innerHTML = `
    <img class = poster src="https://image.tmdb.org/t/p/w300${mediaInfos.posterPath}" onerror="this.onerror=null; this.src='/assets/blank_profile.png';">
    <p class="overview">${mediaInfos.overview}</p>
`;
};

// 제작진 및 배우 section 내용 구현하는 함수
const createCrewContainer = () => {
  const $crewContainer = document.getElementById("crew-info-container");
  // 감독 (2명)
  for (let i = 0; i < 2; i++) {
    if (mediaInfos.directors[i] !== undefined) {
      const $addTarget = document.createElement("div");
      $addTarget.id = mediaInfos.directors[i].id;
      $addTarget.className = "crew-card";
      $addTarget.innerHTML = `
      <img class = "crew-image" src="https://image.tmdb.org/t/p/original${mediaInfos.directors[i].profilepath}" onerror="this.onerror=null; this.src='/assets/blank_profile.png';">
      <h3 class="crew-name">${mediaInfos.directors[i].name}</h3>
      <p class="crew-job">${mediaInfos.directors[i].job}</p>`;
      $crewContainer.appendChild($addTarget);
      mediaInfos.directorCount++;
    }
  }

  // 배우들 (6-감독명수)
  for (let i = 0; i < 6 - mediaInfos.directorCount; i++) {
    if (mediaInfos.actors[i] !== undefined) {
      const $addTarget = document.createElement("div");
      $addTarget.id = mediaInfos.actors[i].id ? mediaInfos.actors[i].id : null;
      $addTarget.className = "crew-card";
      $addTarget.innerHTML = `
      <img  class = "crew-image" src="https://image.tmdb.org/t/p/w200${mediaInfos.actors[i].profilepath}" onerror="this.onerror=null; this.src='/assets/blank_profile.png';">
      <h3 class="crew-name">${mediaInfos.actors[i].name}</h3>
      <p class="crew-job">${mediaInfos.actors[i].characterName}</p>`;
      $crewContainer.appendChild($addTarget);
    } else {
      const $addTarget = document.createElement("div");
      $addTarget.className = "crew-card";
      $addTarget.innerHTML = "";
      $crewContainer.appendChild($addTarget);
    }
  }
};

// 데이터베이스를 먼저 만든 후, html 문서 렌더링 작업 실행하도록 순서 설정
createDatabase().then(() => {
  createBackdropSection();
  createPosterAndOverviewSection();
  createCrewContainer();
});
