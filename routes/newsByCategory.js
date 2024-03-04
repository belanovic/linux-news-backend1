const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.get('/category/:category/:page', auth, async (req, res) => {
    const category = req.params.category;
    const page = parseInt(req.params.page);
    try {
        const newsByCategory = await Article
            .find({
                category: req.params.category
            })
            .skip((page - 1) * 10)
            .limit(10)
            .sort({datePublished: -1})

        res.json({newsByCategory: newsByCategory});
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;