const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let query = new Schema({
    name: String,
    title: String,
    description: String,
}, {
    collection: 'queries'
});

module.exports = mongoose.model('Query', queries);