'use strict';

var mongoose = require('mongoose');
var characterSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    ac: {
        type: String
    },
    hp: {
        type: String
    }, 
    details: {
        type: String
    }
});

var character = mongoose.model('character', characterSchema);

module.exports = character;