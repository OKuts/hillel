const http = require('http');
const request = require('request');
const show = `<h1>What do you want?</h1> 
                <form method = "post" action ="/users">
                    <fieldset> 
                        <button>Users</button> 
                    </fieldset> 
                </form>`;
http.createServer((req, res) => {
    if (req.url === '/') {
        res.end(show);
    } else if (req.url === '/users') {
        res.write(show);
        request('https://jsonplaceholder.typicode.com/users', (err, resp, body) => {
            resp.statusCode = 200 ? res.end(`<div>${body}</div>`) : res.end('<div>Ошибка</div>');
        })
    } else if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
    }
}).listen(3000, () => console.log('Run...'));