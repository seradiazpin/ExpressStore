var fs = require("fs");
var path = require('path');

var filePath = path.join(__dirname, 'hola.txt');
// Asynchronous read
fs.readFile(filePath, function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
});