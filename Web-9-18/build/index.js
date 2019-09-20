"use strict";
function getElement(id) {
    var element = document.getElementById(id);
    if (element) {
        return element;
    }
    throw new Error("Element with id " + id + " was not found.");
}
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
var myFunction = function () {
};
function compute() {
}
//# sourceMappingURL=index.js.map