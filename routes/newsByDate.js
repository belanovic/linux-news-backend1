const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/articlesByDate', async (req, res) => {
    try {
        const articles = await Article
            .find({
                published: true
            })
        const arr = articles.filter((prom) => {prom.datePublished.getMonth() === req.body.month})
        res.status(200).json(arr);
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router;