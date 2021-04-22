const mongoose = require('mongoose');
const Joi = require('joi');

const userFrontendSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    }
})

const UserFrontend = mongoose.model('UserFrontend', userFrontendSchema);

module.exports = UserFrontend;