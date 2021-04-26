const express = require('express');
const router = express.Router();
const { UserFrontend, validateUser } = require('../models/UserFrontend');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/oneUserFE', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) res.status(400).send({ validate_error: error.details[0].message });

    const result = await UserFrontend.findOne({ email: req.body.email });

    if (result) res.status(400).send({ error_msg: `User with email address ${req.body.email} is already registered` })



    async function hash(password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)
        console.log(hashed);
        return hashed
    }
    hash('1234');

    const oneUser = new UserFrontend({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    try {
        const savedOneUser = await oneUser.save();
        let msg = ['success', savedOneUser]
        res.json(msg);
    }
    catch (err) {
        let msg = ['error', err]
        res.json(msg);
        /* let msg = [
            {oneUser: ''},
            {greska: err}
        ]
        if(err.code === 11000) {
            msg.greska = `${JSON.stringify(err.keyPattern)} ${JSON.stringify(err.keyValue)} already exists`;
        }
        res.send(msg); */
    }
})

/* router.get('/oneArticle/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.setHeader('Access-Control-Allow-Origin', '*' 'http://localhost:3001')
        res.status(200).send(article);
    }
    catch(err){
        res.send(err);
    }
})

router.post('/oneArticle', async (req, res) => {
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
        videoURL: req.body.videoURL,
        videoName: req.body.videoName,
        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated,
        datePublished: req.body.datePublished, 
        imgDescription: req.body.imgDescription, 
        videoDescription: req.body.videoDescription, 
        source: req.body.source,
        author: req.body.author,
        tagsArr: req.body.tagsArr
    })
    try{
        const savedArticle = await oneArticle.save();
        res.send(`Succesfully deployed article ${savedArticle}`)
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
}) */

module.exports = router;