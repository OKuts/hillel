const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//---------------------------------------------------------
const config = require('./modules/config');
//---------------------------------------------------------
let app = express(); //creatung server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));
let db;
const url = 'mongodb://localhost:27017';
const dbname = "myDB";
const client = new MongoClient(url, { useUnifiedTopology: true }); //conection
app.get(/\//, (req, res) => {
    let way = '/index.html';
    let header = 'text/html';
    if (req.path != '/') {
        way = req.path;
        header = config[req.path.slice(-3)];
    }
    if (way != '/ins') {
        fs.readFile('./src' + way, 'utf-8', (err, data) => {
            res.set('Content-Type', header);
            res.send(data);
        })
    } else {
        console.log('3', header)
        fs.readdir('./src/svg', (err, list) => {
            res.send(list);
        })
    }
});
// app.get('/students', (req, res) => {
//     db.collection('students').find().toArray((err, docs) => {
//         if (err) {
//             console.error(err);
//             return res.sendStatus(500);
//         }
//         res.send(docs);
//     })
// });

// app.get('/students/:id', (req, res) => {
//     db.collection('students').findOne({ _id: ObjectID(req.params.id) }, (err, docs) => {
//         if (err) {
//             console.error(err);
//             return res.sendStatus(500);
//         }
//         res.send(docs);
//     })
// })

// app.post('/students', (req, res) => {
//     req.params.id;
//     let student = {
//         _id: req.body.id,
//         name: req.body.name
//     }
//     db.collection('students').insertOne(student, err => {
//         if (err) {
//             console.error(err);
//             return res.sendStatus(500);
//         }
//         res.send(student);
//     })
// });

// app.put('/students/:id', (req, res) => {
//     db.collection('students').updateOne({ _id: ObjectID(req.params.id) }, { $set: { name: req.body.name } }, err => {
//         { console.error(err) }
//         res.sendStatus(200);
//     });
// });

// app.delete('/students/:id', (req, res) => {
//     db.collection('students').deleteOne({ _id: ObjectID(req.params.id) }, (err) => {
//         if (err) {
//             console.error(err);
//             return res.sendStatus(500);
//         }
//         res.sendStatus(200);
//     })
// })

client.connect(err => {
    console.log('Connection success');
    db = client.db(dbname);
    app.listen(3333, () => console.log('Server running...'))
});