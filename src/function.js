const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzE2MjE1OWJkOGJhMGYxMTk5Zjc3ZDU0NDUxZGRhMCIsInN1YiI6IjY1OTM1NTdkNjUxZmNmNjAzZjhkZTJhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ekYKjL96tBuoevhvYdJBhCu94l-aWTXQb2e9auZVDOs",
  },
};

export const fetchMovieData = async function () {
  const LocalData = localStorage.getItem("movieData");
  if (LocalData) {
    return JSON.parse(LocalData);
  } else {
    //API를 불러오는 함수
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
export const arr = JSON.parse(localStorage.getItem(`movieData`));

export const buildCard = () => {
  const RECOMMEND_CARD_COUNT = 5;
  for (let i = 0; i < RECOMMEND_CARD_COUNT; i++) {
    const recCard = `
      <div class="rec-card" style="background-image: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(https://image.tmdb.org/t/p/original${arr[i].backdrop_path})" id="${arr[i].id}">
      <div>
        
        <div style="flex-direction: column">
          <div class="rec-content">
            <p class="title"><span>${arr[i].title}</span>
            <br>
            <span>(${arr[i].original_title})</span>
            </p>
            <p style="font-size:24px">평점 : ⭐${arr[i].vote_average}
            <p class="overview">${arr[i].overview}</p>
          </div>
        </div>
      </div>`;
    document
      .querySelectorAll(".rec-container")[0]
      .insertAdjacentHTML("beforeend", recCard);
  }
};
