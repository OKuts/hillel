const fs = require('fs');
const path = require('path');
const os = require('os');
const EvenEmitter = require('events');
const http = require('http');

http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.end('<h1>hello client</h1>');
    }
    //res.write('<h1>hello 2 client</h1>');
    //res.end('<h1>hello client</h1>');
}).listen(3000, () => console.log('hhhhhhhhhhhhhh'));

// class Logger extends EvenEmitter {
//     log(massage) {
//         this.emit('massage', `${massage}${Date.now()}`)
//     }
// }
// const logger = new Logger();

// logger.on('massage', date => {
//     console.log(date);
// })
// logger.log(('Hello'));