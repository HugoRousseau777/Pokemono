const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    baseStats: {
        maxHp: Number,
        attaque: Number,
        attaqueSpeciale: Number,
        defense: Number,
        defenseSpeciale: Number,
        vitesse: Number
    }
});

module.exports = mongoose.model("pokemons",pokemonSchema);