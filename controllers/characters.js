'use strict';

var characterModel = require('../models/character');
function saveFile(name, file) {

}
var character = {
    createCharacter: function(newCharacter, callback) {
        var character = new characterModel(newCharacter)
        character.save(function(err, character) {
            if (err) return console.log(err);
            callback();
        });
    },

    changeCharacter: function(name, changedCharacter, callback) {
        var characters = characterModel.findOne({name: name}, function(err, docs){
            if (err || !docs) {
                callback(err);
                return;
            }
            characterModel.findById(docs._id, function(err, doc) {
                if (err || !doc) {
                    callback(false);
                    return;
                }
                doc.name = changedCharacter.name;
                doc.ac = changedCharacter.ac;
                doc.hp = changedCharacter.hp;
                doc.details = changedCharacter.details;
                doc.save(function(err) {
                    if (err) {
                        callback(false);
                        return;
                    }
                    callback(true);
                })
            });
        });
    },

    getCharacter: function(name, callback) {
        var characters = characterModel.find({name: name}, function(err, docs){
            if (err || !docs[0]) {
                callback(null);
                return;
            }
            if (docs) callback(docs[0]);            
        });
    },

    saveFile: function(name, file) {
        console.log(file);
    },

    getAllCharacters: function(callback) {
        var characters = characterModel.find({}, function(err, docs){
            if (err || !docs) {
                callback(null);
                return;
            }
            if (docs) callback(docs);            
        });
    }
}
module.exports = character;