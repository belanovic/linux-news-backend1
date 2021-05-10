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
            const day = prom.datePublished.getDay;
            const month = prom.datePublished.getMonth;
            const year = prom.datePublished.getFullYear;

            console.log('day: ' + day, 'month: ' + month, 'year: ' + year);

            return day === req.body.day && month === req.body.month && year === req.body.year
        })
        if(arr.length === 0) {
            arr = ['nema vesti sa tim datumom3']
        }
        res.status(200).json(arr);
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router;