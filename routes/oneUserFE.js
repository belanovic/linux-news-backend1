const express = require('express');
const router = express.Router();
const { UserFrontend, validateUser } = require('../models/UserFrontend');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/oneUserFE', async (req, res) => {

    async function hash(password) {
            const salt = await bcrypt.genSalt(5);
            const hashed = await bcrypt.hash(password, salt);
            return hashed
        }

    const { error } = validateUser(req.body);
    if (error) res.status(400).send([false, 'validation_error', error.details[0].message]);

    const resultEmail = await UserFrontend.findOne({ email: req.body.email });

    if (resultEmail) res.status(400).send([false, 'email_error', `User with email address ${req.body.email} is already registered`])

    const resultUsername = await UserFrontend.findOne({ username: req.body.username });

    if (resultUsername) res.status(400).send([false, 'username_error', `User with username ${req.body.username} is already registered`])

    const hashedPassword = await hash(req.body.password);

    const oneUser = new UserFrontend({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        profileImgNameLarge: req.body.profileImgNameLarge,
        profileImgURLLarge: req.body.profileImgURLLarge,
        profileImgURLSmall: req.body.profileImgURLSmall,
        profileImgNameSmall: req.body.profileImgNameSmall

    })

    const token = oneUser.generateToken();

    try {
        const savedOneUser = await oneUser.save();
        let msg = [true, 'registration_successfull', savedOneUser, token];
        res.json(msg);
    }
    catch (error) {
        let msg = [false, 'registration_error', error]
        res.json(msg);
    }
})
module.exports = router;