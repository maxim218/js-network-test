"use strict";

// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// libraries
const express = require("express");
const fs = require("fs");

// run server
const app = express();
const port = 5000;
app.listen(port);
console.log("Server on port " + port);

// axios
app.get("/axios", function(request, response) {
    response.sendFile(__dirname + "/" + "axios.min.js");
});

// get page
app.get("/page", function(request, response) {
    response.sendFile(__dirname + "/" + "page.html");
});

// get code
app.get("/code", function(request, response) {
    response.sendFile(__dirname + "/" + "code.js");
});

// get chai
app.get("/chai", function(request, response) {
    response.sendFile(__dirname + "/" + "chai.js");
});

// save file
app.post("/save", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const {myName, myContent} = obj;
        fs.writeFileSync(myName, myContent);
        response.end(JSON.stringify({
            myResult: "GOOD",
            myDate: new Date().toISOString(),
        }));
    });
});

// load file
app.post("/load", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const myName = obj["myName"];
        const myContent = fs.readFileSync(myName, "utf8");
        response.end(JSON.stringify({
            myResult: "GOOD",
            myDate: new Date().toISOString(),
            myContent: myContent,
        }));
    });
});
