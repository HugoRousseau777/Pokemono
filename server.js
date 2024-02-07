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

app.get("/pokemonFinaux", async(req, res)=> {
  const pokemons = await PokemonFinal.find();
  if(pokemons.length>0){
    res.send(pokemons);
  } else {
    res.send({result:"No pokemons"});
  }
})


app.post("/pokemonFinal/:name", async (req, res) => {
  const pokemon = await Pokemon.findOne({name: req.params.name});
  if(pokemon){
    let pokemonFinal = new PokemonFinal({
      name: pokemon.name,
      type: pokemon.type,
      hp: pokemon.baseStats.maxHp,
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
      attaques: req.body.attaques,
      palierExp: [1],
      pokDepart: false
    }
    );
    let result = await pokemonFinal.save();
    res.send(result);
  } else {
    res.send("ohoh");
  }
})

app.post("/pokemonDepartB", async(req, res) => {
  let pokemonFinal = new PokemonFinal({
    name: "Bulbizarre",
    type: "Plante",
    hp: 21,
    baseStats: {
      maxHp: 21,
      attaque: 7,
      attaqueSpeciale: 12,
      defense: 15,
      defenseSpeciale: 17,
      vitesse: 10
    },
    niveau: 5,
    ev: [0,0,0,0,0,0],
    iv: [Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31))],
    attaques: {
    name: "Charge",
    basePower: 30,
    effect: {
        "stat": "attaque",
        "nb": -0.8 
    }},
    palierExp: [1],
    pokDepart: true
  }
  );
  let result = await pokemonFinal.save();
  res.send(result);
})
app.post("/pokemonDepartS", async(req, res) => {
  let pokemonFinal = new PokemonFinal({
    name: "Salameche",
    type: "Feu",
    hp: 16, 
    baseStats: {
      maxHp: 16,
      attaque: 12,
      attaqueSpeciale: 15,
      defense: 10,
      defenseSpeciale: 9,
      vitesse: 16
    },
    niveau: 5,
    ev: [0,0,0,0,0,0],
    iv: [Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31))],
    attaques: {
      name: "Charge",
      basePower: 30,
      effect: {
          "stat": "attaque",
          "nb": -0.8 
      }},
    palierExp: [1],
    pokDepart: true
  }
  );
  let result = await pokemonFinal.save();
  res.send(result);
})
app.post("/pokemonDepartC", async(req, res) => {
  let pokemonFinal = new PokemonFinal({
    name: "Carapuce",
    type: "Eau",
    hp: 25,
    baseStats: {
      maxHp: 25,
      attaque: 5,
      attaqueSpeciale: 8,
      defense: 20,
      defenseSpeciale: 16,
      vitesse: 12
    },
    niveau: 5,
    ev: [0,0,0,0,0,0],
    iv: [Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31)), Math.floor((Math.random() * 31))],
    attaques: {
      name: "Charge",
      basePower: 30,
      effect: {
          "stat": "attaque",
          "nb": -0.8 
      }},
    palierExp: [1],
    pokDepart: true
  }
  );
  let result = await pokemonFinal.save();
  res.send(result);
})

app.get("/pokemonDepart", async(req,res)=> {
  const pokemon = await PokemonFinal.find({pokDepart : true});
  res.send(pokemon);
})

app.listen(5000);

