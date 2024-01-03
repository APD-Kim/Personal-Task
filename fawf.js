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
    // LocalStorage에 movieData의 value가 저장되어 있다면
    return JSON.parse(LocalData);
  } else {
    try {
      // 여러 개의 API 엔드포인트 URL 배열
      const apiEndpoints = [
        "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        // 다른 API 엔드포인트를 추가하세요.
      ];

      // 각 API 요청을 병렬로 보내고 응답을 기다림
      const responses = await Promise.all(
        apiEndpoints.map((endpoint) => fetch(endpoint, options))
      );

      // 각 응답을 JSON 형식으로 파싱하여 데이터를 추출
      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      // 데이터를 LocalStorage에 저장
      localStorage.setItem("movieData", JSON.stringify(data));

      // 모든 API의 결과 데이터를 반환
      return data;
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error; // 오류를 호출자에게 전달
    }
  }
};