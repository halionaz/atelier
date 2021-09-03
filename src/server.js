const express = require("express");
const favicon = require("serve-favicon");
const fs = require("fs");
const path = require("path");

const app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use(favicon(path.join(__dirname, 'public/icon', 'magpie.ico')));

app.get("/", (req,res) => {
    fs.readFile("./src/views/index.html",(err,data) => {
        if(err){
            console.log(err);
        } else {
            res.write(data);
        }
    })
})

app.listen(3000, () => {
    console.log("서버가 켜졌습니다.");
});