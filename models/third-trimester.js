const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let third_trimester = new Schema({
    title: String,
    href: String,
    description: String,
    src: String,
}, { collection: 'third trimester' });

module.exports = mongoose.model('TPreg', second_trimester);

