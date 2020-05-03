const fs = require('fs');
const path = require('path');
fs.readdir('.', (err, data) => {

    data.forEach(file => console.log(file,
        path.extname(file),
        fs.statSync(file).size))
})

// let express = require('express');

// let app = express(); //creatung server

// let students = [{
//     id:1,
//     name: 'Max',
//     surname: 'Petrov',
//     age: 100
// },{
//     id:2,
//     name: 'Serg',
//     surname: 'Ivanov',
//     age: 50
// }];

// app.get('/', (req, res) => res.send('Hello Express'));

// app.get('/students', (req, res) => res.send(students));

// app.get('/students/:id', (req, res) => {
//     let student = students.find(student => student.id === Number(req.params.id));
//     res.send(student);
// })

// app.listen(3333, () => console.log('Server running...'));
