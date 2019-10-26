const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let user = new Schema({
    username: String,
    email: String,
    age: Number,
    height: String,
    weight: String,
    password: String,
});


module.exports = mongoose.model('User', user);

