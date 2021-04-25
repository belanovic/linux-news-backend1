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
        unique: true,
        default: 'email adress'
    }
})

const UserFrontend = mongoose.model('UserFrontend', userFrontendSchema);

module.exports = UserFrontend;