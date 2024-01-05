const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzE2MjE1OWJkOGJhMGYxMTk5Zjc3ZDU0NDUxZGRhMCIsInN1YiI6IjY1OTM1NTdkNjUxZmNmNjAzZjhkZTJhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ekYKjL96tBuoevhvYdJBhCu94l-aWTXQb2e9auZVDOs",
  },
};
//API를 불러오는 함수
export const fetchMovieData = async function () {
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
export const arr = JSON.parse(localStorage.getItem(`movieData`));

//겹치지 않는 랜덤한 정수 5개 출력
const randomArr = [];
let forCount = 5;
for (let i = 0; i < forCount; i++) {
  let randomNum = Math.floor(Math.random() * 20);
  if (randomArr.includes(randomNum)) {
    forCount++;
    continue;
  }
  randomArr.push(randomNum);
}

//추천 영화 리스트 5장 생성
export const buildCard = () => {
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
