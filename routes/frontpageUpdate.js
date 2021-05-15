const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.put('/updateFrontpage', async (req, res) => {
    try {
  
        const allArticles = await Article.find();
        const modifiedAllArticles = allArticles.map((prom) => {
            const idAndPositionMatch = req.body.idAndPositionArr.filter((idAndPosition) => {
                console.log(idAndPosition.id === prom._id.toString())
                return idAndPosition.id === prom._id.toString()
            });
            console.log(idAndPositionMatch)
            const newArticlePosition = idAndPositionMatch.length > 0? parseInt(idAndPositionMatch[1].newPosition) : 0;
           /*  const modifiedArticle = Object.assign({}, prom);
            modifiedArticle.position = newArticlePosition;
            return modifiedArticle; */
            const modifiedArticle = prom;
            modifiedArticle.position = newArticlePosition;
            return modifiedArticle;
        })

        /* const article = await Article.findByIdAndUpdate(req.params.id, {position: req.body.position}, {new: true}); */
        res.status(200).send(modifiedAllArticles);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;