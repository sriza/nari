const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let periods = new Schema({
    name: String,
    hre: String,
    description: String,
    src: String,
});

module.exports = mongoose.model('Period', periods);

