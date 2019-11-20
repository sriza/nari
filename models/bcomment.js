const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bcomment = new Schema({
    username: String,
    userid: String,
    blogid: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    like: Number,

}, {
    collection: 'bcomments'
});

module.exports = mongoose.model('BComment', bcomment);