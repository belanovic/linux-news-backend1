const express = require('express');
const router = express.Router();
const { UserFrontend, validateUserAuth } = require('../models/UserFrontend');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/authOneUserFE', async (req, res) => {

    const { error } = validateUserAuth(_.pick(req.body, ['username', 'password']));
    if (error) res.status(400).send({ validate_error: error.details[0].message });

    const result1 = await UserFrontend.findOne({ username: req.body.username });
    if (!result) res.status(400).send(`Invalid username or password`);
    
    const result2 = await UserFrontend.findOne({ password: req.body.password });
    if (!result) res.status(400).send(`Invalid username or password`);

    try {
        let msg = ['logged in', true]
        res.json(msg);
    }
    catch (err) {
        let msg = ['error', err]
        res.json(msg);
    }
})



module.exports = router;