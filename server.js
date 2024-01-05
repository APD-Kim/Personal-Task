const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
app.use(express.static("src"));

app.listen(5500, () => {
  console.log("http://localhost:5500 에서 서버 실행중");
});

app.get("/", (req, res) => {
  const absolutePath = path.join(__dirname, "public", "main.html");
  res.sendFile(absolutePath);
  //openapi의 데이터를 보낸다
});

//api 서버 만들기
//rest api
//restful api
//DBMS