const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.put('/publishArticle/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, {published: true}, {new: true});
        res.status(200).send(article);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;