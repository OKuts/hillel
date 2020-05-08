const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let app = express(); //creatung server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
let db;
const url = 'mongodb://localhost:27017';
const dbname = "myDB";
const client = new MongoClient(url); //conection
app.get('/', (req, res) => res.send('show'));
app.post('/students', (req, res) => {
    let student = {
        name: req.body.name
    }
    db.collection('students').insertOne(student, err => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(student);
    })
});

app.get('/students', (req, res) => {
    db.collection('students').find().toArray((err, docs) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});

// app.put('/students/:id', (req, res) => {
//     let student = students.find(student => student.id === Number(req.params.id));
//     student.name = req.body.name;
//     res.sendStatus(200);
// });

// app.delete('/students/:id', (req, res) => {
//     students = students.filter(student => {
//         return student.id !== Number(req.params.id)
//     })
//     res.sendStatus(200);
// })

client.connect(err => {
    console.log('Connection success');
    db = client.db(dbname);
    app.listen(3333, () => console.log('Server running...'))
});

