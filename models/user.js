const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let user = new Schema({
    username: String,
    email: String,
    age: Number,
    password: String,
}, {
    collection: 'users'
});


module.exports = mongoose.model('User', user);