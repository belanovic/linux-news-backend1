const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.post('/lastPage', auth, async (req, res) => {
console.log('evo me iz last page');
    const category = req.body.category;
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
            .sort({dateUpdated: 1})
            .limit(count % 10)
        
        res.json({articlesMsg: {
            articles: articles,
            numOfPages: Math.ceil(count/10)
        }})
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;