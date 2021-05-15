const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.put('/updateFrontpage', async (req, res) => {
    try {
        console.log('evo ga');
        console.log(req.body.idAndPositionArr)
        const allArticles = await Article.find();
        const modifiedAllArticles = allArticles.map((prom) => {
            const idAndPositionMatch = req.body.idAndPositionArr.filter((idAndPosition) => {
                console.log(idAndPosition.id + " i " + prom._id)
                
                return idAndPosition.id === prom._id
            });
            console.log(idAndPositionMatch)
            const newArticlePosition = idAndPositionMatch.length > 0? idAndPositionMatch[0] : 0;
            prom.position = newArticlePosition;
            return prom;
        })

        /* const article = await Article.findByIdAndUpdate(req.params.id, {position: req.body.position}, {new: true}); */
        res.status(200).send(modifiedAllArticles);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;