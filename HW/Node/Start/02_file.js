const fs = require('fs');
fs.readFile('2.txt', 'utf-8', (err, data) => {
    console.log(data);
})