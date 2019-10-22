const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gynos = new Schema({
    name: String,
    position: String,
    affiliated: String,
    currently_working: String,
    phone: String,
});

module.exports = mongoose.model('Gyno', gynos);

