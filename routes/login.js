const express = require('express');
const router = express.Router();
const { User, validateData } = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
    function LoginMsg(isSuccess, result) {
        this.isSuccess = isSuccess; 
        if(isSuccess) {
            this.userLoggedIn = result;
        }
        if(!isSuccess) {
            this.failureMsg = result;
        }
    }

    try {
        const userData = req.body;
        
        const {error} = validateData('login', userData);
        if(error) return res.json({loginMsg: new LoginMsg(false, error.message)});

        const userRegistered = await User.findOne({username: userData.username});
        if(!userRegistered) return res.json({loginMsg: new LoginMsg(false, `User with username ${userData.username} doesn't exist`)});

        const passwordCorrect = await bcrypt.compare(userData.password, userRegistered.password);
        if(!passwordCorrect) return res.json({loginMsg: new LoginMsg(false, `Username or password are incorrect`)});
  
        /* const token = jwt.sign(userData, config.get('jwtPrivateKey'), {expiresIn: '55m'}); */
        const token = userRegistered.generateToken();
        
        return res.cookie('token', token, {/* httpOnly: true, */ sameSite: 'none', secure: true}).json({loginMsg: new LoginMsg(true, userRegistered)})

    } catch (error) {
        return res.json({error: modifyError(error)});
    }
})

/* router.post('/login', async (req, res) => {  

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
}) */

module.exports = router;

function modifyError(err) {
    if(err.name =='MongooseError'
    || err.name =='CastError'
    || err.name =='DivergentArrayError'
    || err.name =='MissingSchemaError'
    || err.name =='DocumentNotFoundError'
    || err.name =='ValidatorError'
    || err.name =='ValidationError'
    || err.name =='MissingSchemaError'
    || err.name =='ObjectExpectedError'
    || err.name =='ObjectParameterError'
    || err.name =='OverwriteModelError'
    || err.name =='ParallelSaveError'
    || err.name =='StrictModeError'
    || err.name =='VersionError') {
        err.message = `Problem with the database. ${err.name}`;
    }
    const stringified_error = JSON.stringify(err, Object.getOwnPropertyNames(err));
    return JSON.parse(stringified_error)
}
