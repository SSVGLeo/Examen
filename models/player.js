const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema( {
    name: String,
    surname: String,
    age: Number,
    team: String,
    game: String,
    role: String,
    nationatility: String
})

var Player = mongoose.model('Player', playerSchema);

model.exports = Player;
