const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');

router.post('/articlesByDate', auth, async (req, res) => {
    try {
        const articles = await Article
            .find({
                published: true
            })
        let arr = articles.filter((prom) => {
            const day = prom.datePublished.getDate();
            const month = prom.datePublished.getMonth();
            const year = prom.datePublished.getFullYear();

          /*   console.log('day: ' + day, 'month: ' + month, 'year: ' + year); */

            return (day === req.body.day) && (month === req.body.month) && (year === req.body.year)
        })
        if(arr.length === 0) {
            arr = ['nema vesti sa tim datumom3']
        }
        res.status(200).json(arr);
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;