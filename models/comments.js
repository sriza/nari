const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let comment = new Schema({
    username: String,
    userid: String,
    queryid: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    like: Number,

}, {
    collection: 'comments'
});

module.exports = mongoose.model('Comment', comment);