const mongoose = require('mongoose');
const Joi = require('joi');
const { boolean } = require('joi');

const articleSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    imgName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        required: true
    },
    dateUpdated: {
        type: Date,
        default: Date.now(),
        required: true
    },
    datePublished: {
        type: Date, 
        default: Date.now(), 
        required: true
    }
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;