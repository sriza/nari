const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pregnancy = new Schema({
    title: String,
    href: String,
    description: String,
    src: String,
}, { collection: 'pregnancy' });

module.exports = mongoose.model('FPreg', pregnancy);

