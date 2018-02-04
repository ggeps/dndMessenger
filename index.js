var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mediaController = require('./controllers/media');
var characterController = require('./controllers/characters');
var db = require('./db');
var bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var backgrounds = mediaController.getBackgroundPaths();

var music = mediaController.getMusicPaths();

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('newSettings', function(settings) {
    io.emit('newSettings', settings);
    console.log(settings);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/background/forest/:randomToken', function(req, res) {
  res.sendFile(backgrounds.forest[Math.floor(Math.random() * backgrounds.forest.length)]);
});

app.get('/background/city/:randomToken', function(req, res) {
  res.sendFile(backgrounds.city[Math.floor(Math.random() * backgrounds.city.length)]);
});

app.get('/background/dangeoun/:randomToken', function(req, res) {
  res.sendFile(backgrounds.dangeoun[Math.floor(Math.random() * backgrounds.dangeoun.length)]);
});

app.get('/background/room/:randomToken', function(req, res) {
  res.sendFile(backgrounds.room[Math.floor(Math.random() * backgrounds.room.length)]);
});

app.get('/music/adventure/:randomToken', function(req, res) {
  var toPlay = music.adventure[Math.floor(Math.random() * music.adventure.length)];
  res.sendFile(toPlay);
}); 

app.get('/music/mistery/:randomToken', function(req, res) {
  var toPlay = music.mistery[Math.floor(Math.random() * music.mistery.length)];
  res.sendFile(toPlay);
});

app.get('/music/battle/:randomToken', function(req, res) {
  res.sendFile(music.battle[Math.floor(Math.random() * music.battle.length)]);
});

app.get('/character/:name', function(req, res) {
  characterController.getCharacter(req.params.name, function(character) {
      res.json(character);
  });
});

app.post('/character', function(req, res) {
  characterController.createCharacter(req.body, function() {
    res.json({status: 'success'});
  });
});

app.put('/character/:name', function(req, res) {
  characterController.changeCharacter(req.body.name, req.body, function(result) {
    if (result) {
      res.json({status: 'success'});
    } else {
      res.send(result);
    }    
  });
});

app.post('/character/picture/:name', function(req, res) {
  characterController.savePicture(req.params.name, req.files);
});

app.get('/character/picture/:name', function(req, res) {
  var path = mediaController.getCharacterImage(req.params.name);
  res.sendFile(path);
});

app.get('/characters', function(req, res) {
  characterController.getAllCharacters(function(docs) {
    res.json(docs);
  });
});