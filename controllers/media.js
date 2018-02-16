'use strict'

const backgroundFolder = __dirname + '/../media/background/';
const musicFolder = __dirname + '/../media/music/';
const characterFolder = __dirname + '/../media/characters/';
const fs = require('fs');
var path = require('path');

var media = {
    getBackgroundPaths: function() {
        var background = {
            forest: [],
            city: [],
            dangeoun: [],
            room: [],
            battle: [],
            desert: [],
            darkForest: []
        };

        var forest = fs.readdirSync(backgroundFolder + 'forest/');
        forest.forEach(function (value) {
            background.forest.push(path.resolve(backgroundFolder + 'forest/' + value));
        });

        var city = fs.readdirSync(backgroundFolder + 'city/');
        city.forEach(function (value) {
            background.city.push(path.resolve(backgroundFolder + 'city/' + value));
        });

        var dangeoun = fs.readdirSync(backgroundFolder + 'dangeoun/');
        dangeoun.forEach(function (value) {
            background.dangeoun.push(path.resolve(backgroundFolder + 'dangeoun/' + value));
        });
        
        var room = fs.readdirSync(backgroundFolder + 'room/');
        room.forEach(function (value) {
            background.room.push(path.resolve(backgroundFolder + 'room/' + value));
        });

        var battle = fs.readdirSync(backgroundFolder + 'battle/');
        battle.forEach(function (value) {
            background.battle.push(path.resolve(backgroundFolder + 'battle' + value));
        });

        var desert = fs.readdirSync(backgroundFolder + 'desert/');
        desert.forEach(function (value) {
            background.desert.push(path.resolve(backgroundFolder + 'desert/' + value));
        });

        var darkForest = fs.readdirSync(backgroundFolder + 'darkForest/');
        darkForest.forEach(function (value) {
            background.darkForest.push(path.resolve(backgroundFolder + 'darkForest/' + value));
        });

        return background;
    },

    getMusicPaths: function() {
        var music = {
            adventure: [],
            mistery: [],
            battle: [],
            doungonery: [],
            party: []
          }

        var adventure = fs.readdirSync(musicFolder + 'adventure/');
        adventure.forEach(function (value) {
            music.adventure.push(path.resolve(musicFolder + 'adventure/' + value));
        });

        var mistery = fs.readdirSync(musicFolder + 'mistery/');
        mistery.forEach(function (value) {
            music.mistery.push(path.resolve(musicFolder + 'mistery/' + value));
        });

        var battle = fs.readdirSync(musicFolder + 'battle/');
        battle.forEach(function (value) {
            music.battle.push(path.resolve(musicFolder + 'battle/' + value));
        });
        return music;

    },

    getCharacterImage: function(name) {
        return path.resolve(characterFolder + name + '.png');
    }
}

module.exports = media;