const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    genre: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
    },
    image_url: {
        type: String,
        trim: true,
    },
    buy_url: {
        type: String,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);