const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.post('/allArticles', auth, async (req, res) => {
    
    const pageNum = parseInt(req.params.pageNum);
    const title = req.body.title;
    const tag = req.body.tag;
    const reg = new RegExp(`${title}`, 'gi');

    try {
        const articles = await Article
            .find({
                title: {$regex: reg}
            })
            .skip((pageNum - 1) * 10)
            .limit(10)
            .sort({dateUpdated: -1})
        res.json(articles);
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;