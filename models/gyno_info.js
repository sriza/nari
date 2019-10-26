const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gynos = new Schema({
    name: String,
    position: String,
    affiliated: String,
    currently: String,
    phone: String,
});

module.exports = mongoose.model('Gyno', gynos);

