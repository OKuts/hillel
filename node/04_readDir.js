var fs = require('fs');
fs.readdir('.', function (err, files) {
    files.forEach(file => {
        console.log(file);
    })
})