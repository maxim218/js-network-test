"use strict";

// libraries
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

// run server
const app = express();
const port = 5000;
app.listen(port);
console.log("Server on port " + port);

// parse json
app.use(bodyParser.json({
    limit: '500mb',
}));

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
    const body = request.body;
    const {myName, myContent} = body;
    fs.writeFileSync(myName, myContent);
    response.end(JSON.stringify({
        myResult: "GOOD",
        myDate: new Date().toISOString(),
    }));
});

// load file
app.post("/load", function(request, response) {
    const body = request.body;
    const myName = body["myName"];
    const myContent = fs.readFileSync(myName, "utf8");
    response.end(JSON.stringify({
        myResult: "GOOD",
        myDate: new Date().toISOString(),
        myContent: myContent,
    }));
});
