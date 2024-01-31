const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.get('/category/:category', auth, async (req, res) => {
    try {
        const newsByCategory = await Article
            .find({
                category: req.params.category
            })
            .sort({datePublished: -1})

        res.json({newsByCategory: newsByCategory});
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;