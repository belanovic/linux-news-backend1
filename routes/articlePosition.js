const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.put('/articlePosition/:id', async (req, res) => {
    try {
        console.log('evo ga')
        const article = await Article.findByIdAndUpdate(req.params.id, {position: req.body.position}, {new: true});
        res.status(200).send(article);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router; 