const http = require('http');
const request = require('request');
const show = `<button>Users</button>
              <div id='one'></div>
                <script>
                    const xhr = new XMLHttpRequest();
                    const url = 'http://localhost:3000/users';
                    document.querySelector('button').addEventListener('click', () => {
                        xhr.open('get', url, true);
                        xhr.send();
                    })
                </script>` ;
http.createServer((req, res) => {
    if (req.url === '/') {
        res.write(show);
    } else if (req.url === '/users') {
        console.log(req.url);
        request('https://jsonplaceholder.typicode.com/users', (err, resp, body) => {
            res.end(`${body}`);
        })
    } else if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.write();
    }
}).listen(3000, () => console.log('Run...'));

