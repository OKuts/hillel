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
    db.collection('servises').find().toArray((err, records) => {
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
        comment: req.body.comment,
        location: req.body.location
    }
    db.collection('servises').insertOne(task, err => {
        if (err) { return res.sendStatus(500); }
        res.sendStatus(200);
    })
})

app.put('/put/:id', (req, res) => {
    db.collection('servises').updateOne({ _id: parseInt(req.params.id) },
        {
            $set: {
                task: req.body.task, prop: req.body.prop, date: req.body.date,
                comment: req.body.comment, location: req.body.location
            }
        }, err => {
            if (err) return res.sendStatus(500);
        });
    res.sendStatus(200);
});

app.delete('/del/:id', (req, res) => {
    db.collection('servises').deleteOne({ _id: parseInt(req.params.id) }, (err) => {
        if (err) { res.sendStatus(500) }
    })
})

client.connect(err => {
    if (err) console.log(err)
    else {
        console.log('Connection success');
        db = client.db(dbname);
    }
    app.listen(3333, () => console.log('Server running...'))
});
