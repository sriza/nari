const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let second_trimester = new Schema({
    title: String,
    href: String,
    description: String,
    src: String,
}, { collection: 'second trimester' });

module.exports = mongoose.model('SPreg', second_trimester);

