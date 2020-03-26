var fs = require('fs');
fs.mkdir('testKuts1', function (err) {
    if (err && err.code === 'EEXIST') {
        console.log('file already exists')
    } else
        console.log('All rights');
})