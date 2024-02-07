const mongoose = require('mongoose');

const pokemonFinalSchema = new mongoose.Schema({
    pokemonId : String,
    name: String,
    hp: Number,
    type: String,
    baseStats: {
        maxHp: Number,
        attaque: Number,
        attaqueSpeciale: Number,
        defense: Number,
        defenseSpeciale: Number,
        vitesse: Number
    },
    stats: {
        maxHp: Number,
        attaque: Number,
        attaqueSpeciale: Number,
        defense: Number,
        defenseSpeciale: Number,
        vitesse: Number
    },
    niveau: Number,
    ev: [Number, Number, Number, Number, Number, Number],
    iv: [Number, Number, Number, Number, Number, Number],
    attaques: {name: String, basePower: Number, effect: {stat: String, nb: Number}},
    paliersExp: [Number],
    pokDepart: Boolean
});

module.exports = mongoose.model("pokemonsFinaux",pokemonFinalSchema);