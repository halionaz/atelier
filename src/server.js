import express from "express";
import favicon from "serve-favicon";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.use(favicon(__dirname + '/public/icon/magpie.ico'));

app.get("/", (req,res) => {
    console.log("서버에 접속했습니다.");
    res.render("home");
});

app.listen(3000, () => {
    console.log("서버가 켜졌습니다.");
});