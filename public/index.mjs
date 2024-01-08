import {
  createButton,
  fetchMovieData,
  buildCard,
  moveCard,
  alertId,
  loadMoreMovie,
  createPoster,
  createMoreBtn,
  searchMovie,
} from "/Function.mjs";

import { MAIN_BOX, REC_BUTTON } from "/constans.mjs";

//API를 불러오는 함수
//5~10초 사이에 api호출 해보기
// 폴링(polling)
//웹 소켓

document.addEventListener("DOMContentLoaded", async () => {
  await fetchMovieData();
  // 페이지가 로드 시 카드 및 버튼, 포스터 생성
  buildCard();
  createPoster();
  createButton();
  createMoreBtn();
});

//더보기 버튼 이벤트 핸들러
document.querySelector(".more").addEventListener("click", loadMoreMovie);
//추천카드 버튼 이벤트 핸들러
REC_BUTTON.addEventListener("click", moveCard);
//이미지 클릭 시 ID 알림창
MAIN_BOX.addEventListener("click", alertId);

//검색기능
document.querySelector("#search").addEventListener("click", searchMovie);
