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
    if (req.url === '/') {
        res.end(show);
    } else if (req.url === '/users') {
        console.log(req.url);
        request('https://jsonplaceholder.typicode.com/users', (err, resp, body) => {
            console.log(resp.statusMessage);
            console.log(resp.statusCode);
            resp.statusCode >= 400 ? res.end(`Ошибка ==> ${resp.statusCode}`) : res.end(body);
        })

    } else if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
    }
}).listen(3000, () => console.log('Run...'));