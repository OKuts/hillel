var fs = require('fs');
fs.rmdir('testKuts1', function (err) {
    if (err) {
        console.log('что-то пошло не так')
    } else
        console.log('Папка удалена');
})