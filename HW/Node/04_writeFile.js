const fs = require('fs');
const path = require('path');
fs.readdir('.', (err, data) => {

    data.forEach(file => console.log(file,
        path.extname(file),
        fs.statSync(file).size))
})
fs.writeFile('1.txt', 'hellooooooooooooooooooo', (err) => {
    if (err) console.log('error');
})