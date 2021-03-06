const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let query = new Schema({
    userId: String,
    username: String,
    description: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    like: Number,
    comment: Number,
}, {
    collection: 'query'
});

module.exports = mongoose.model('Query', query);