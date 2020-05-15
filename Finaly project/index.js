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
        res.send(records);
    })
})
app.get('/insTasks', (req, res) => {
    res.send(JSON.stringify(options))
})
app.post('/insDB', (req, res) => {
    console.log('done', req.body);
    // let task = {
    //     idOrder: req.body.orderId,
    //     task: req.body.task,
    //     prop: req.body.prop,
    //     time: req.body.date,
    //     comment: req.body.comment
    // }
    //console.log('obj', req.body.task)
    // db.collection('servis').insertOne(task, err => {
    //     if (err) {
    //         console.error(err);
    //         return res.sendStatus(500);
    //     }
    //     console.log(task);
    res.send("task");
    // })
})

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
