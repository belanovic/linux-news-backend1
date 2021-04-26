const mongoose = require('mongoose');
const Joi = require('joi');

const userFrontendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        default: 'firstName'
    },
    lastName: {
        type: String,
        required: true,
        default: "lastName"
    },
    username: {
        type: String,
        required: true,
        default: 'username'
    },
    password: {
        type: String,
        required: true,
        default: 'password'
    },
    email: {
        type: String,
        required: true,
        default: 'email adress'
    }
})

const UserFrontend = mongoose.model('UserFrontend', userFrontendSchema);

function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(3).max(50).required(),
        lastName:  Joi.string().min(3).max(50).required(),
        username:  Joi.string().min(3).max(50).required(),
        password:  Joi.string().min(6).max(255).required(),
        email:  Joi.string().min(3).max(60).email().required()
    }
    Joi.validate(user, schema);
}

module.exports.UserFrontend = UserFrontend;
module.exports.validateUser = validateUser;