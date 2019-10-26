const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let weightloss = new Schema({
    title: String,
    href: String,
    description: String,
    src: String,
}, { collection: 'weight_losses' });

module.exports = mongoose.model('Weightl', weightloss);

