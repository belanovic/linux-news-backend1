const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');

router.put('/articlePosition/:id', auth, async (req, res) => {
    try {
        console.log('evo ga')
        const article = await Article.findByIdAndUpdate(req.params.id, {position: req.body.position}, {new: true});
        res.status(200).send(article);
    }
    catch(error){
        res.json({error: modifyError(error)});
    }
})

module.exports = router; 