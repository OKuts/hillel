const http = require('http');
const request = require('request');
const show = `
<button>Users</button>
<div id='one'></div>
<script>
    const xhr = new XMLHttpRequest();
    const url = '/users';
    const div = document.getElementById('one');
    document.querySelector('button').addEventListener('click', () => {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                div.innerText = xhr.response;
            }
        }
        xhr.open('get', url, true);
        xhr.send();
    })
</script>` ;
http.createServer((req, res) => {
    switch (req.url) {
        case '/': res.end(show);
            break;
        case '/users':
            request('https://jsonplaceholder.typicode.com/users', (err, resp, body) => {
                resp.statusCode >= 400 ? res.end(`Ошибка ==> ${resp.statusCode}`) : res.end(body);
            })
            break;
        case '/favicon.ico':
            //res.writeHead(200, { 'Content-Type': 'image/x-icon' });
            res.end();
            break;
    }
}).listen(3000, () => console.log('Server RUN...'));