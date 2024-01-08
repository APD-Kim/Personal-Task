export const MAIN_BOX = document.querySelector("#main-box");
export const REC_BUTTON = document.querySelector("#rec-button");
export const REC_CONTAINER = document.querySelector(".rec-container");
export const FIRST_POSTER_NUMBER = 15;
export const MOVIE_DATA = JSON.parse(localStorage.getItem(`movieData`));
export const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzE2MjE1OWJkOGJhMGYxMTk5Zjc3ZDU0NDUxZGRhMCIsInN1YiI6IjY1OTM1NTdkNjUxZmNmNjAzZjhkZTJhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ekYKjL96tBuoevhvYdJBhCu94l-aWTXQb2e9auZVDOs",
  },
};
