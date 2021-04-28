const jwt = require('jsonwebtoken');
const config = require('config');


function auth(req, res, next) {
    console.log('ovo je pre procitanog hedera');
    console.log('ovo je procitan heder' + req.header('x-auth-token'));
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({token_error: 'Access denied. No token provided'});

    try {
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        next();
    } catch(err){
        res.status(400).json({token_error: 'Invalid token'});
    }
}
module.exports = auth;