const express = require('express');
const router = express.Router();
const db = require("../database")
const mongoClient = db.getDB();

const collection = mongoClient.collection('carparks')

router.get('/', async (req, res) => {
    collection.insertOne({'a': 1});
    res.send(await collection.find().toArray());
})


module.exports = router;
