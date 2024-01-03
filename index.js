const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzE2MjE1OWJkOGJhMGYxMTk5Zjc3ZDU0NDUxZGRhMCIsInN1YiI6IjY1OTM1NTdkNjUxZmNmNjAzZjhkZTJhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ekYKjL96tBuoevhvYdJBhCu94l-aWTXQb2e9auZVDOs",
  },
};

const fetchMovieData = async function () {
  const LocalData = localStorage.getItem("movieData");
  if (LocalData) {
    //localstorage에 movidata의 value가 저장되어있다면
    return JSON.parse(LocalData);
  } else {
    //API를 불러오는 함수
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
      options
    );
    const data = await response.json();
    localStorage.setItem("movieData", JSON.stringify(data.results));
    // console.log(data.results);
    return data.results;
  } // 영화 내부의 데이터를 반환
};

//영화 추천 리스트 생성
fetchMovieData().then((movieContents) => {
  console.log(movieContents);
  for (let i = 0; i < 5; i++) {
    const recCard = `
      <div class="rec-card" id="${movieContents[i].id}">
      <div>
        <img
          src="https://image.tmdb.org/t/p/w500${movieContents[i].poster_path}"/>
          </div>
        <div style="flex-direction: column">
          <div class="rec-content">
            <p><span class="title">${movieContents[i].title}</span>
            <span>(${movieContents[i].original_title})</span>
            </p>
            <p>평점 : ⭐${movieContents[i].vote_average}
            <p class="overview">${movieContents[i].overview}</p>
          </div>
        </div>
      </div>`;
    document
      .querySelectorAll(".rec-container")[0]
      .insertAdjacentHTML("beforeend", recCard);
  }
});

//최초 영화 리스트 생성
let imgCnt = 0; //이미지가 몇개 생성되었는지 카운트
fetchMovieData().then((movieContents) => {
  for (i = 0; i < 3; i++) {
    document
      .querySelectorAll(".main-box")[0]
      .insertAdjacentHTML("beforeend", text(movieContents));
    imgCnt += 5;
  }
});

//영화 포스터를 배치하는 변수
const text = function (movieContents) {
  return `
    <div><img
    src="https://image.tmdb.org/t/p/w500${
      movieContents[imgCnt].poster_path
    }" id="${movieContents[imgCnt].id}"/></div>
    <div><img
    src="https://image.tmdb.org/t/p/w500${
      movieContents[imgCnt + 1].poster_path
    }" id="${movieContents[imgCnt + 1].id}"/></div>
    <div><img
    src="https://image.tmdb.org/t/p/w500${
      movieContents[imgCnt + 2].poster_path
    }" id="${movieContents[imgCnt + 2].id}"/></div>
    <div><img
    src="https://image.tmdb.org/t/p/w500${
      movieContents[imgCnt + 3].poster_path
    }" id="${movieContents[imgCnt + 3].id}"/></div>
    <div><img
    src="https://image.tmdb.org/t/p/w500${
      movieContents[imgCnt + 4].poster_path
    }" id="${movieContents[imgCnt + 4].id}"/></div>
  `;
};
//영화 리스트 추가 버튼

// 영화 리스트 추가 생성
const more = `<div class="more-btn">영화를 더 보고 싶다면 클릭!</div>`;

fetchMovieData().then((movieContents) => {
  document.querySelectorAll(".more")[0].insertAdjacentHTML("beforeend", more);

  document.querySelector(".more-btn").addEventListener("click", function () {
    try {
      document
        .querySelectorAll(".main-box")[0]
        .insertAdjacentHTML("beforeend", text(movieContents));
      console.log(`추가적인 영화 등록 완료`);
      imgCnt += 5;
    } catch {
      document.querySelector(".more-btn").textContent =
        "더이상 영화가 없네요..";
    }
  });
});

//추천카드의 버튼을 만드는 반복문
const addCircleButton = `<button class="rec-btn"></button>`;
const btnId = document.querySelector("#btn");

for (i = 0; i < 5; i++) {
  btnId.insertAdjacentHTML("beforeend", addCircleButton);
}

const recBtn = document.querySelectorAll(".rec-btn");
const recContainer = document.querySelector(".rec-container");
// 추천카드를 바꿔주는 함수
const changeCard = function (i) {
  console.log(i);
  recContainer.style.transform = `translateX(${-100 * i}vw)`;
};
//이벤트 핸들러

for (let i = 0; i < recBtn.length; i++) {
  recBtn[i].addEventListener("click", function () {
    changeCard(i);
  });
}
//dataSorts
//btn-info="1"
//왜 반복문 안의 이벤트 핸들러에 외부의 함수를 담게되면 클로저가 작동을 안하는지?

//동기 비동기 학습, 블록 스코프, 전역 스코프 학습

document.querySelector("#search").addEventListener("click", function (event) {
  event.preventDefault();
  console.log(`hi`);
});
//foreach로 idValue에 맞는 id를 검색해서 일치하는 아이디가 있으면 해당 배열의 내용을 기반으로 모달창의 내용을 바꿔줘. 만약 없다면 catch해서 alret창에 내용이 아직 준비되지 않았다고 알려줘
fetchMovieData().then((movieContents) => {
  const mainBoxLength =
    document.getElementsByClassName("main-box")[0].childElementCount;
  const currentDiv = document.querySelectorAll(".main-box div img");

  for (let i = 0; i < mainBoxLength; i++) {
    currentDiv[i].addEventListener("click", function (e) {
      console.log(Number(this.id));
      movieContents.forEach((element) => {
        if (this.id == element.id) {
          console.log(`${this.id}번 id가 일치합니다`);
          console.log(element.title);
        }
      });
    });
  }
  console.log();
});// 아직 다 안만듬

//문자열을 넣고 검색했을때 movieContent라는 변수에 담긴 Array 안에 한글 title이나 영어 title중에 하나라도 맞는게 있다면 그 영화만 보여줘, 또한 영어로 검색했을 경우에는 lowerCase로 적용시켜줘