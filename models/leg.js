const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let legs = new Schema({
    title: String,
    href: String,
    description: String,
    src: String,
}, { collection: 'leg' });

module.exports = mongoose.model('Legs', legs);

