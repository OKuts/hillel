var fs = require('fs');
fs.readFile('2.txt', function (err, data) {
    if (err) throw err;
    var arr = data.toString();
    console.log(arr);
})