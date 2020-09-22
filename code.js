"use strict";

const assert = chai.assert;

function getRandInt(n) {
    return parseInt(parseInt(1000 * Math.random() * 1000) % n);
}

function getRandString() {
    const arr = [
        "爲為为",
        "ёжй",
        "線綫线",
        "привет",
        "ӨӘ",
    ];
    const n = arr.length;
    const r = getRandInt(n);
    return arr[r];
}

function getHugeString() {
    let content = "";
    for(let i = 0; i < 2 * 1000 * 1000; i++) content += getRandString();
    return content;
}

function f(networkFunction) {
    const s = getHugeString();
    //////
    const oldLength = s.length;
    const oldSize = new Blob([s]).size;
    //////
    console.log(oldLength);
    console.log(oldSize);
    //////
    networkFunction("/save", JSON.stringify({myName: "file.json", myContent: s}), () => {
        networkFunction("/load", JSON.stringify({myName: "file.json"}), (second) => {
            const myContent = JSON.parse(second).myContent;
            //////
            const newLength = myContent.length;
            const newSize = new Blob([myContent]).size;
            //////
            console.log(newLength);
            console.log(newSize);
            //////
            assert.deepStrictEqual(oldLength, newLength);
            assert.deepStrictEqual(oldSize, newSize);
            assert.deepStrictEqual(s, myContent);
        });
    });
}

function ajaxSendPost(urlString, bodyString, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", urlString, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    r.send(bodyString);
    r.onreadystatechange = function() {
        if(r.readyState === 4 && r.status === 200) {
            const content = r.responseText + "";
            r = null;
            callback(content + "");
        }
    }
}

function fetchSendPost(urlString, bodyString, callback) {
    fetch(urlString, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: bodyString,
    })
    .then(response => response.text())
    .then(result => callback(result));
}
