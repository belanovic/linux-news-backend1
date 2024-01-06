const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');

router.put('/updateFrontpage', auth, async (req, res) => {
    try {
        console.log('updateFrontpage');
        const allArticles = await Article.find();
        const modifiedAllArticles = allArticles.map((prom) => {
            console.log(prom);
            const idAndPositionMatch = req.body.idAndPositionArr.filter((idAndPosition) => {
                return idAndPosition.id === prom._id.toString()
            });
            console.log('poklapanje');
            console.log(idAndPositionMatch);
            const newArticlePosition = idAndPositionMatch.length > 0? parseInt(idAndPositionMatch[0].newPosition) : 0;
           /*  const modifiedArticle = Object.assign({}, prom);
            modifiedArticle.position = newArticlePosition;
            return modifiedArticle; */
            const modifiedArticle = prom;
            modifiedArticle.position = newArticlePosition;
            return modifiedArticle
        })
        /* modifiedAllArticles.sort((a, b) => a.position - b.position) */

        modifiedAllArticles.forEach(async (prom) => {
            const article = await Article.findByIdAndUpdate(prom._id, {position: prom.position}, {new: true});
        })

        /* const article = await Article.findByIdAndUpdate(req.params.id, {position: req.body.position}, {new: true}); */
        res.status(200).send(modifiedAllArticles);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;