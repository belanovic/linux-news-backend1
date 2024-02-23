const express = require('express');
const router = express.Router();
const { User, validateUserAuth } = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { result } = require('lodash'); 
const auth = require('../middleware/auth');
const modifyError = require('modifyerror');

router.post('/updateProfilePhotoURL/:size', auth, async (req, res) => { 

    function UpdateMsg(isSuccess, result) {
        this.isSuccess = isSuccess; 
        if(isSuccess) {
            this.userUpdated = result;
        }
        if(!isSuccess) {
            this.failureMsg = result;
        }
    }

    try {
        
        
    } catch (error) {
        
    }

    let resultUser = await User.findOne({ username: req.body.username });

    if (!resultUser) res.status(400).send([false, 'username_error', `Invalid username or password`]);

    resultUser = await User.findOne({ email: req.body.email });

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

    let updatedUser = await User.findOneAndUpdate(
            {username: req.body.username}, 
            update, 
            {
                new: true
            }
        );

    try {
        const msg = [true, updatedUser];
        res.json(msg);
    }
    catch (error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;