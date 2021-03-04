const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/category/:category', async (req, res) => {
    try {
        const articles = await Article
            .find({
                category: req.params.category
            })
            .sort({dateUpdated: -1})
        res.status(200).json(articles);
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router;