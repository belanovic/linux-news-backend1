const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.post('/allArticles', auth, async (req, res) => {
    console.log('evo meeeeee');
    const category = req.body.category;
    const pageNum = parseInt(req.body.pageNum.number);
    const title = req.body.title;
    const tag = req.body.tag;
    const regTitle = new RegExp(`${title}`, 'gi');
    const regTag = new RegExp(`${tag}`, 'gi');

    try {
        let count = await Article.find(category == 'allArticles'? 
        {
            title: {$regex: regTitle}
        }
        : 
        {
            title: {$regex: regTitle},
            category: category
        })
        .countDocuments()

        const articles = await Article
            .find(category == 'allArticles'? 
                {
                    title: {$regex: regTitle}
                }
                : 
                {
                    title: {$regex: regTitle},
                    category: category
                }
            )
            .skip((pageNum - 1) * 10)
            .limit(10)
            .sort({dateUpdated: -1})
        res.json({articlesMsg: {
            articles: articles
        }});
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;


