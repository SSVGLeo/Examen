const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema( {
    name: String,
    surname: String,
    team: String,
    game: String,
    role: String,
    nationality: String
})

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
