const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.post('/lastPageFE', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const category = req.body.category;

    try {
        const count = await Article
            .find({category: category})
            .countDocuments()

        const newsByCategory = await Article
            .find({category: category})
            .sort({dateUpdated: 1})
            .limit(count % 10)
        
        res.json({newsMsg: {
            newsByCategory: newsByCategory,
            numOfPages: Math.ceil(count/10)
        }})
    }
    catch(error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;