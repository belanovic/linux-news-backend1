const mongoose = require('mongoose');
const Joi = require('joi');

const userFrontendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const UserFrontend = mongoose.model('UserFrontend', userFrontendSchema);

module.exports = UserFrontend;