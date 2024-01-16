const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');

router.put('/publishArticle/:id', auth, async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id, 
            {published: req.body.published, 
                datePublished: req.body.datePublished, 
                dateUpdated: req.body.dateUpdated
            },
            {new: true}
        );
        res.status(200).send(article);
    }
    catch(error){
        res.json({error: modifyError(error)});
    }
})

module.exports = router;