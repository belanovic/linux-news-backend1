/* const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const modifyError = require('modifyerror')

router.get('/category/:category', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    try {
        const newsByCategory = await Article
        .find({
            category: req.params.category
        })
        .sort({datePublished: -1})
        
        return res.json({newsByCategory: newsByCategory});
    }
    catch(error) {
        return res.json({error: modifyError(error)});
    }
})

module.exports = router; */


const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const modifyError = require('modifyerror');

router.post('/category', async (req, res) => {
    /* res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); */


    const category = req.body.category;
    const pageNum = parseInt(req.body.pageNum.number);

    try {
        const count = await Article
            .find({category: category})
            .countDocuments()

        let newsByCategory = await Article
            .find({category: category})
            .skip((pageNum - 1) * 10)
            .limit(10)
            .sort({dateUpdated: -1})

        res.json({newsMsg: {
            newsByCategory: newsByCategory
        }})
    }
    catch(error) {
        return res.json({error: modifyError(error)});
    }
})

module.exports = router;
