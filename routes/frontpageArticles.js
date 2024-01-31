const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror')

router.get('/frontpageArticlesCMS', auth, async (req, res) => {
    try {
        const articles = await Article
            .find({
                position: {$gt: 0, $lt: 21},
                published: true
            }) 
            .sort({position: 1}) 
        res.json({articles: articles});
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})
router.get('/frontpageArticlesFE',  async (req, res) => {
    try {
        const articles = await Article
            .find({
                position: {$gt: 0, $lt: 21},
                published: true
            })
            .sort({position: 1}) 
        res.status.json(articles); 
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;