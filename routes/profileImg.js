const express = require('express');
const router = express.Router();
const { UserFrontend, validateUserAuth } = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { result } = require('lodash');
const auth = require('../middleware/auth');

router.post('/updateProfilePhotoURL/:size', auth, async (req, res) => { 

    console.log('evo me')

    /* const { error } = validateUserAuth(_.pick(req.body, ['username', 'password']));
    if (error) res.status(400).send([false, 'validation_error', error.details[0].message]); */


    let resultUser = await UserFrontend.findOne({ username: req.body.username });

    if (!resultUser) res.status(400).send([false, 'username_error', `Invalid username or password`]);

    resultUser = await UserFrontend.findOne({ email: req.body.email });

    if (!resultUser) res.status(400).send([false, 'email_error', `Invalid email`]);
    
/*     const resultPassword = await bcrypt.compare(req.body.password, resultUser.password);
    if (!resultPassword) res.status(400).send([false, 'password_error', `Invalid username or password`]); */

    const size = req.params.size;
    let update;
    if(size === 'large') {
        update = {
            profileImgNameLarge: req.body.profileImgNameLarge,
            profileImgURLLarge: req.body.profileImgURLLarge
        }
    } else if(size === 'small') {
        update = {
            profileImgURLSmall: req.body.profileImgURLSmall,
            profileImgNameSmall: req.body.profileImgNameSmall
        }
    }

    let updatedUser = await UserFrontend.findOneAndUpdate(
            {username: req.body.username}, 
            update, 
            {
                new: true
            }
        );

    try {
        const msg = [true, updatedUser];
        res.send(msg);
    }
    catch (err) {
        const msg = [false, err]
        res.send(msg);
    }
})

module.exports = router;