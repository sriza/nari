const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let highbp = new Schema({
    title: String,
    href: String,
    description: String,
    src: String,
}, { collection: 'high bp' });

module.exports = mongoose.model('Bp', highbp);

