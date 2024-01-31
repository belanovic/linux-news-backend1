const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.get('/allArticles', auth, async (req, res) => { 
    try {
        const articles = await Article
            .find()
            .sort({dateUpdated: -1})
        res.json(articles);
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;