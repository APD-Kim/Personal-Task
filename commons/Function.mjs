import {
  MAIN_BOX,
  FIRST_POSTER_NUMBER,
  REC_CONTAINER,
  MOVIE_DATA,
  OPTIONS,
} from "/constans.mjs";

// export const a = (() => {
//   let a = 0;
//   let b = 0;
//   return function () {
//     a++;
//     b++;
//     return a + b;
//   };
// })();

//겹치지 않는 랜덤한 정수 생성
export const getRandomArray = () => {
  const randomArr = new Set();
  while (randomArr.size < 5) {
    let randomNum = Math.floor(Math.random() * 20);
    randomArr.add(randomNum);
  }
  return Array.from(randomArr);
};

//추천카드 버튼 생성
export const createButton = () => {
  for (let i = 0; i < getRandomArray().length; i++) {
    document
      .querySelector("#rec-button")
      .insertAdjacentHTML("beforeend", `<button class="rec-btn"></button>`);
  }
};

//포스터 생성

export const text = function (MOVIE_DATA, i) {
  return `
    <div><img
    src="https://image.tmdb.org/t/p/original${MOVIE_DATA[i].poster_path}" id="${MOVIE_DATA[i].id}"/></div>
  `;
};

//TMDb API호출 후 로컬스토리지에 저장

export const fetchMovieData = async function () {
  const LocalData = localStorage.getItem("movieData");
  if (LocalData && LocalData !== undefined) {
    return JSON.parse(LocalData);
  } else {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=11",
      OPTIONS
    );
    const data = await response.json();
    localStorage.setItem("movieData", JSON.stringify(data.results));
    console.log(data);
    return data.results;
  } // 영화 내부의 데이터를 반환
};

//최초 추천카드 생성

export const buildCard = () => {
  getRandomArray().forEach((value) => {
    const recCard = `
      <div class="rec-card" style="background-image: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(https://image.tmdb.org/t/p/original${MOVIE_DATA[value].backdrop_path})" id="${MOVIE_DATA[value].id}">
      <div>
        
        <div style="flex-direction: column">
          <div class="rec-content">
            <p class="title"><span>${MOVIE_DATA[value].title}</span>
            <br>
            <span>(${MOVIE_DATA[value].original_title})</span>
            </p>
            <p style="font-size:24px">평점 : ⭐${MOVIE_DATA[value].vote_average}
            <p class="overview">${MOVIE_DATA[value].overview}</p>
          </div>
        </div>
      </div>`;
    document
      .querySelectorAll(".rec-container")[0]
      .insertAdjacentHTML("beforeend", recCard);
  });
};

//버튼 클릭 시 추천카드 이동

export const moveCard = (e) => {
  if (e.target.classList.contains("rec-btn")) {
    const index = Array.from(document.querySelectorAll(".rec-btn")).indexOf(
      e.target
    );
    // console.log(Array.from(document.querySelectorAll(".rec-btn")));
    REC_CONTAINER.style.transition = `all 1s`;
    REC_CONTAINER.style.transform = `translateX(${-100 * index}vw)`;
  }
};

//포스터 클릭 시 id 알림창

export const alertId = (e) => {
  console.log(e.target);
  if (e.target && e.target.matches("img")) {
    alert(`ID : ${e.target.id}`);
  }
};

//더보기 버튼 클릭 시 영화 추가 생성

export const loadMoreMovie = (() => {
  let currentIndex = FIRST_POSTER_NUMBER;
  return function () {
    try {
      for (let i = currentIndex; i < currentIndex + 5; i++) {
        if (currentIndex < MOVIE_DATA.length) {
          MAIN_BOX.insertAdjacentHTML("beforeend", text(MOVIE_DATA, i));
        } else {
          document.querySelector(".more-btn").textContent =
            "더이상 영화가 없네요..";
          break;
        }
      }
      currentIndex += 5;
    } catch {
      document.querySelector(".more-btn").textContent =
        "더이상 영화가 없네요..";
    }
  };
})();

//최초 포스터 생성

export const createPoster = () => {
  for (let i = 0; i < FIRST_POSTER_NUMBER; i++) {
    MAIN_BOX.insertAdjacentHTML("beforeend", text(MOVIE_DATA, i));
  }
};

//더보기 버튼

export const createMoreBtn = () => {
  document
    .querySelector(".more")
    .insertAdjacentHTML(
      "beforeend",
      `<button class="more-btn">영화를 더 보고 싶다면 클릭!</button>`
    );
};

//검색기능

export const searchMovie = (e) => {
  e.preventDefault();
  let value = document.querySelector("#input").value.toLowerCase();
  MAIN_BOX.innerHTML = "";
  for (let i = 0; i < MOVIE_DATA.length; i++) {
    if (
      MOVIE_DATA[i].title.toLowerCase().includes(value) ||
      MOVIE_DATA[i].original_title.toLowerCase().includes(value)
    ) {
      const searchPoster = function (MOVIE_DATA) {
        return `
        <div><img src="https://image.tmdb.org/t/p/w500${MOVIE_DATA[i].poster_path}" id="${MOVIE_DATA[i].id}"/></div>
      `;
      };
      MAIN_BOX.insertAdjacentHTML("beforeend", searchPoster(MOVIE_DATA));
    }
  }
};
