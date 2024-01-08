import express from "express";
const app = express();
import path from "path";
app.use(express.static("public"));
app.use(express.static("commons"));
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
