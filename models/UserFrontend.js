const mongoose = require('mongoose');
const Joi = require('joi');

const userFrontendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    username: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    password: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true
    },
    email: {
        type: String,
        minLength: 3,
        maxLength: 60,
        required: true
    }
})

const UserFrontend = mongoose.model('UserFrontend', userFrontendSchema);

function validateUser(user) {
    const schema = Joi.object( {
        firstName: Joi.string().min(3).max(50).required(),
        lastName:  Joi.string().min(3).max(50).required(),
        username:  Joi.string().min(3).max(50).required(),
        password:  Joi.string().min(6).max(255).required(),
        email:  Joi.string().min(3).max(60).email().required()
    })
    return schema.validate(user);
}

module.exports.UserFrontend = UserFrontend;
module.exports.validateUser = validateUser;

/* const schema = Joi.object({ name: Joi.string() .min(6) .required(),
    email: Joi.string() .min(6) .required() .email(),
    password: Joi.string() .min(6) .required() });
    
    const validation = schema.validate(req.body);
    res.send(validation); */