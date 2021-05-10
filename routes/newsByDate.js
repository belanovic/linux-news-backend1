const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.post('/articlesByDate', async (req, res) => {
    console.log('evo ga zahtev sa datumom');
    try {
        const articles = await Article
            .find({
                published: true
            })
        let arr = articles.filter((prom) => {
            return prom.datePublished.getMonth() == req.body.month /* prom.datePublished.getDay() == req.body.day &&
                   prom.datePublished.getMonth() == req.body.month &&
                   prom.datePublished.getFullYear() == req.body.year */
        })
        if(arr.length === 0) {
            arr = ['nema vesti sa tim datumom2']
        }
        res.status(200).json(arr);
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router;