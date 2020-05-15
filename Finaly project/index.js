const express = require('express');
let app = express(); //creatung server
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//---------------------------------------------------------
const options = require('./modules/options');
//---------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));
let db;
const url = 'mongodb://localhost:27017';
const dbname = "myDB";
const client = new MongoClient(url, { useUnifiedTopology: true });
app.get('/loadDB', (req, res) => {
    db.collection('servis').find().toArray((err, records) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(JSON.stringify(records));
    })
})
app.get('/insTasks', (req, res) => {
    res.send(JSON.stringify(options))
})
app.post('/insDB', (req, res) => {
    let task = {
        _id: req.body._id,
        task: req.body.task,
        prop: req.body.prop,
        date: req.body.date,
        comment: req.body.comment
    }
    db.collection('servis').insertOne(task, err => {
        if (err) { return res.sendStatus(500); }
        res.sendStatus(200);
    })
})

// app.put('/students/:id', (req, res) => {
//     db.collection('students').updateOne({ _id: ObjectID(req.params.id) }, { $set: { name: req.body.name } }, err => {
//         { console.error(err) }
//         res.sendStatus(200);
//     });
// });
app.delete('/del/:id', (req, res) => {
    console.log(typeof req.params.id);
    db.collection('servis').deleteOne({ _id: parseInt(req.params.id) }, (err) => {
        if (err) { res.sendStatus(500) }
        res.sendStatus(200);
    })
})

client.connect(err => {
    console.log('Connection success');
    db = client.db(dbname);
    app.listen(3333, () => console.log('Server running...'))
});
