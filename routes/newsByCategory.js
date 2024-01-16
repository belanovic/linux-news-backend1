const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');

router.get('/category/:category', auth, async (req, res) => {
    try {
        const articles = await Article
            .find({
                category: req.params.category
            })
            .sort({datePublished: -1})
        res.status(200).json(articles);
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;