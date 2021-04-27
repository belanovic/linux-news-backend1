const express = require('express');
const router = express.Router();
const { UserFrontend, validateUserAuth } = require('../models/UserFrontend');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/authOneUserFE', async (req, res) => {

    const { error } = validateUserAuth(_.pick(req.body, ['username', 'password']));
    if (error) res.status(400).send({ validate_error: error.details[0].message });

    const resultUsername = await UserFrontend.findOne({ username: req.body.username });
    if (!resultUsername) res.status(400).send({ validate_error: `Invalid username or password`});
    
   /*  const result2 = await UserFrontend.findOne({ password: req.body.password });
    if (!result2) res.status(400).send({ validate_error: `Invalid username or password`}); */

    const resultPassword = await bcrypt.compare(req.body.password, resultUsername.password);
    if (!resultPassword) res.status(400).send({ validate_error: `Invalid username or password`});

    const token = resultUsername.generateToken();

    try {
        let msg = ['logged in', token]
        res.send(msg);
    }
    catch (err) {
        let msg = ['error', err]
        res.send(msg);
    }
})



module.exports = router;