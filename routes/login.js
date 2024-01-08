const express = require('express');
const router = express.Router();
const { User, validateUserAuth } = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {  

    const { error } = validateUserAuth(_.pick(req.body, ['username', 'password']));
    if (error) res.status(400).send([false, 'validation_error', error.details[0].message]);

    const resultUsername = await User.findOne({ username: req.body.username });
    if (!resultUsername) res.status(400).send([false, 'username_error', `Invalid username or password`]);
    
    const resultPassword = await bcrypt.compare(req.body.password, resultUsername.password);
    if (!resultPassword) res.status(400).send([false, 'password_error', `Invalid username or password`]);

    const token = resultUsername.generateToken();

    try {
        let msg = [true, 'login_successfull', resultUsername, token];
        res.send(msg);
    }
    catch (err) {
        let msg = ['login_error', err]
        res.send(msg);
    }
})

module.exports = router;