const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/oneArticle/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        /* res.setHeader('Access-Control-Allow-Origin', '*' 'http://localhost:3001') */
        res.status(200).send(article);
    }
    catch(err){
        res.send(err);
    }
})

router.post('/oneArticle', async (req, res) => {
    console.log('evo me');
    const oneArticle = new Article({
        category: req.body.category,
        published: req.body.published,
        position: req.body.position,
        title: req.body.title,
        subtitle: req.body.subtitle,
        text: req.body.text,
        paragraphs: req.body.paragraphs,
        imgURL: req.body.imgURL,
        imgName: req.body.imgName,
        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated,
        datePublished: req.body.datePublished, 
        imgDescription: req.body.imgDescription, 
        source: req.body.source,
        author: req.body.author
    })
    try{
        const savedArticle = await oneArticle.save();
        res.send(`Succesfully deployed article ${savedArticle}`)
        console.log('evo me opett')
    }catch(err) {
        res.send(err);
    }

})

router.put('/oneArticle/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).send(article);
    }
    catch(err){
        res.send(err);
    }
})

router.delete('/oneArticle/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        res.status(200).send(article);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;