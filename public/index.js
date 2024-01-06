const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "process.env.ACCESS_TOKEN",
  },
};

console.log(options.headers.Authorization);

//API를 불러오는 함수
const fetchMovieData = async function () {
  const LocalData = localStorage.getItem("movieData");
  if (LocalData) {
    return JSON.parse(LocalData);
  } else {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=11",
      options
    );
    const data = await response.json();
    localStorage.setItem("movieData", JSON.stringify(data.results));
    console.log(data);
    return data.results;
  } // 영화 내부의 데이터를 반환
};
//localStorage에 있는 데이터를 전역변수로 저장
const arr = JSON.parse(localStorage.getItem(`movieData`));

//겹치지 않는 랜덤한 정수 5개 출력
const randomArr = [];
let forCount = 5; //6
for (let i = 0; i < forCount; i++) {
  let randomNum = Math.floor(Math.random() * 20);
  if (randomArr.includes(randomNum)) {
    forCount++;
    continue;
  }
  randomArr.push(randomNum);
}

//추천 영화 리스트 5장 생성
const buildCard = () => {
  const RECOMMEND_CARD_COUNT = 5;
  for (let i = 0; i < RECOMMEND_CARD_COUNT; i++) {
    const recCard = `
      <div class="rec-card" style="background-image: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(https://image.tmdb.org/t/p/original${
        arr[randomArr[i]].backdrop_path
      })" id="${arr[randomArr[i]].id}">
      <div>
        
        <div style="flex-direction: column">
          <div class="rec-content">
            <p class="title"><span>${arr[randomArr[i]].title}</span>
            <br>
            <span>(${arr[randomArr[i]].original_title})</span>
            </p>
            <p style="font-size:24px">평점 : ⭐${arr[randomArr[i]].vote_average}
            <p class="overview">${arr[randomArr[i]].overview}</p>
          </div>
        </div>
      </div>`;
    document
      .querySelectorAll(".rec-container")[0]
      .insertAdjacentHTML("beforeend", recCard);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 페이지가 로드될 때 fetchMovieData 함수 실행
  fetchMovieData();
  buildCard();
});
//영화 포스터를 배치하는 변수
let imgCnt = 0;
const text = function (arr) {
  return `
    <div><img
    src="https://image.tmdb.org/t/p/original${arr[imgCnt].poster_path}" id="${
    arr[imgCnt].id
  }"/></div>
    <div><img
    src="https://image.tmdb.org/t/p/original${
      arr[imgCnt + 1].poster_path
    }" id="${arr[imgCnt + 1].id}"/></div>
    <div><img
    src="https://image.tmdb.org/t/p/original${
      arr[imgCnt + 2].poster_path
    }" id="${arr[imgCnt + 2].id}"/></div>
    <div><img
    src="https://image.tmdb.org/t/p/original${
      arr[imgCnt + 3].poster_path
    }" id="${arr[imgCnt + 3].id}"/></div>
    <div><img
    src="https://image.tmdb.org/t/p/original${
      arr[imgCnt + 4].poster_path
    }" id="${arr[imgCnt + 4].id}"/></div>
  `;
};

//최초 영화 포스터 생성
for (let i = 0; i < 3; i++) {
  document
    .querySelectorAll(".main-box")[0]
    .insertAdjacentHTML("beforeend", text(arr));
  imgCnt += 5;
}

// 영화 리스트 추가 생성 및 버튼
const more = `<div class="more-btn">영화를 더 보고 싶다면 클릭!</div>`;
document.querySelectorAll(".more")[0].insertAdjacentHTML("beforeend", more);

document.querySelector(".more-btn").addEventListener("click", function () {
  try {
    document
      .querySelectorAll(".main-box")[0]
      .insertAdjacentHTML("beforeend", text(arr));
    imgCnt += 5;
  } catch {
    document.querySelector(".more-btn").textContent = "더이상 영화가 없네요..";
  }
});

//추천카드의 버튼을 만드는 반복문
for (let i = 0; i < 5; i++) {
  document
    .querySelector("#btn")
    .insertAdjacentHTML("beforeend", `<button class="rec-btn"></button>`);
}

//버튼 클릭 시 추천 영화 이미지 변경
const recBtn = document.querySelectorAll(".rec-btn");
const recContainer = document.querySelector(".rec-container");
for (let i = 0; i < recBtn.length; i++) {
  recBtn[i].addEventListener("click", function () {
    recContainer.style.transition = `all 1s`;
    recContainer.style.transform = `translateX(${-100 * i}vw)`;
  });
}
//이미지 클릭 시 ID 알림창

const mainBox = document.querySelector(".main-box");
mainBox.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target && e.target.matches("img")) {
    alert(`ID : ${e.target.id}`);
  }
});

//검색기능
document.querySelector("#search").addEventListener("click", function (e) {
  e.preventDefault();
  let value = document.querySelector("#input").value.toLowerCase();
  const mainBox = document.querySelectorAll(".main-box");
  mainBox[0].innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].title.toLowerCase().includes(value) ||
      arr[i].original_title.toLowerCase().includes(value)
    ) {
      const searchPoster = function (arr) {
        return `
        <div><img src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}" id="${arr[i].id}"/></div>
      `;
      };
      mainBox[0].insertAdjacentHTML("beforeend", searchPoster(arr));
    }
  }
});
//css스타일에서 display를 사용하려고 했으나, 그냥 이렇게 해보고싶어서 했습니다.

//grid column
