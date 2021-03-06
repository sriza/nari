const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogs = new Schema({
    name: String,
    title: String,
    blog: String,
    desc: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    like: Number,
    bookmark: Number,
    views: Number,
    comment: {
        com_id: Number,
        com_date: {
            type: Date,
            default: Date.now(),
        },
        com_name: String,
        comment_text: String,
    }
});

module.exports = mongoose.model('Blogs', blogs);

