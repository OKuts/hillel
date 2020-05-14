const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//---------------------------------------------------------
const config = require('./modules/config');
const options = require('./modules/options');
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
    console.log('get', req.path);
    let way = '/index.html';
    if (req.path != '/') way = req.path;
    switch (req.path) {
        case '/loadDB': {
            db.collection('tasks').find().toArray((err, records) => {
                if (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
                res.send(JSON.stringify(records));
            })
        }
            break;
        case '/ins': {
            res.send(JSON.stringify(options))
        }
            break;
        default:
            fs.readFile(way, (err, data) => res.send(data))
            break;
    }
})
app.post('/insDB', (req, res) => {
    //req.params.id;
    let task = {
        _id: req.body.id,
        task: req.body.name,
        prop: req.body.prop,
        time: req.body.time,
        status: req.body.status,
        comment: req.body.comment
    }
    db.collection('tasks').insertOne(task, err => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(task);
    })
});

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