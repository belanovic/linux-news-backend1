const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.post('/getLatestNews', async (req, res) => {
    /* res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); */

    const count = parseInt(req.body.count);

    try {
        const latestNews = await Article
            .find({
                published: true
            })
            .sort({datePublished: -1})
            .limit(count)

        res.json({latestNews: latestNews}); 
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;