'use strict';

var mongoose = require('mongoose');
var characterSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    ac: {
        type: Number
    },
    hp: {
        type: Number
    }, 
    details: {
        type: String
    }
});

var character = mongoose.model('character', characterSchema);

module.exports = character;