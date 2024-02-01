const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash')


function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKeyy'));
        req.userData = _.pick(decodedPayload, ['username', 'password']);
        next()
    } catch (error) {
        return res.status(401).clearCookie('token').json({error: modifyError(error)});
    }
}

module.exports = auth;

/* function auth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    // const token = req.header('x-auth-token');
    
    console.log('ovo je procitan heder' + token);
    if (!token) return res.status(401).json({token_error: 'Access denied. No token provided'});

    try {
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        next();
    } catch(err){
        res.status(400).json({token_error: 'Invalid token'});
    }
}
module.exports = auth; */

function modifyError(error) {
    if(error.name =='MongooseError'
    || error.name =='CastError'
    || error.name =='DivergentArrayError'
    || error.name =='MissingSchemaError'
    || error.name =='DocumentNotFoundError'
    || error.name =='ValidatorError'
    || error.name =='ValidationError'
    || error.name =='MissingSchemaError'
    || error.name =='ObjectExpectedError'
    || error.name =='ObjectParameterError'
    || error.name =='OverwriteModelError'
    || error.name =='ParallelSaveError'
    || error.name =='StrictModeError'
    || error.name =='VersionError') {
        error.message = `Problem with the database. ${error.name}`;
    }
    const stringifiedError = JSON.stringify(error, Object.getOwnPropertyNames(error));
    return JSON.parse(stringifiedError)
}