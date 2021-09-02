const express = require("express");
const fs = require("fs");

const app = express();

console.log("Hello");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req,res) => {
    fs.readFile("./src/views/index.html",(err,data) => {
        if(err){
            console.log(err);
        } else {
            res.write(data);
        }
    })
})

app.listen(3000);