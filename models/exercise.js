const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let exercises = new Schema({
    title: String,
    subtitle:String,
    gif: {
        data:Buffer,
        contentType:String,
    },
    instruction: {
        normal:String,
        count: String,
    }
});

module.exports = mongoose.model('Blogs', blogs);

