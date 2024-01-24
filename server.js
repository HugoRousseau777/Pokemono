const express = require("express");
const cors = require("cors");

const Pokemon = require("./db/Pokemon")
const PokemonFinal = require("./db/PokemonFinal")
//const cors = require("cors");
//require("./db/config");

//const Product = require("./db/Pokemon");

const app = express();
app.use(express.json());
app.use(cors());
const uri = "mongodb+srv://hugo:megaman00@cluster0.7qqwlqk.mongodb.net/Pokemon?retryWrites=true&w=majority"; // Attention à mettre lebon nom de la db apprès .net/
const mongoose = require('mongoose');


async function connect() {
    try {
      await mongoose.connect(uri);
    console.log("connected to mongodb");
    } catch (error) {
      console.log(error)
    }
  }


connect();
//app.use(express.json()); // Middleware
//app.use(cors()); // Middleware
//app.disable('etag');

app.post("/pokemonBase", async (req, res) => {
  let pokemon = new Pokemon(req.body);
  let result = await pokemon.save(); 
  res.send(result);
})
app.post("/pokemonFinal/:id", async (req, res) => {
  const pokemon = await Pokemon.findOne({_id: req.params.id});
  if(pokemon){
    let pokemonFinal = new PokemonFinal({
      name: pokemon.name,
      type: pokemon.type,
      baseStats: {
        maxHp: pokemon.baseStats.maxHp,
        attaque: pokemon.baseStats.attaque,
        attaqueSpeciale: pokemon.baseStats.attaqueSpeciale,
        defense: pokemon.baseStats.defense,
        defenseSpeciale: pokemon.baseStats.defenseSpeciale,
        vitesse: pokemon.baseStats.vitesse
      },
      niveau: 5,
      ev: [0,0,0,0,0,0],
      iv: [Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31))],
      attaques: ["-", "-", "-", "-"],
      palierExp: [1]
    }
    );
    let result = await pokemonFinal.save();
    res.send(result);
  } else {
    res.send("ohoh");
  }
})

app.listen(5000);

