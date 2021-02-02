const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/allArticles', async (req, res) => {
    try {
        const articles = await Article
            .find()
            .sort({dateUpdated: -1}) 
        res.status(200).json(articles);
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router;