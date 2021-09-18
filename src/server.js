import express from "express";
import favicon from "serve-favicon";
import session from "express-session";
import {sec} from "./secret.js";
const FileStore = require('session-file-store')(session);

let memberCnt = 1;

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.use(favicon(__dirname + '/public/icon/magpie.ico'));

app.use(session({
    HttpOnly: true,
    secret: sec,
    resave: false,
    saveUninitialized: true,
    store : new FileStore({logFn: function(){}})
}));

app.get("/", (req,res) => {
    if(req.session.num){
        console.log(`${req.session.num}가 서버에 접속했습니다.`);
    } else {
        req.session.num = memberCnt;
        memberCnt++;
        console.log(`새로운 참가자, ${req.session.num}이 참가했습니다.`);
    }
    res.render("home");
});

app.listen(3000, () => {
    console.log("서버가 켜졌습니다.");
});