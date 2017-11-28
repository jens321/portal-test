let mongoose = require('mongoose'); 

let boardSchema = mongoose.Schema({
    key: String,
    colors: Object,
    col: Number,
    row: Number
});

let Board = mongoose.model('Board', boardSchema);

module.exports = Board; 