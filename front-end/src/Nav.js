import React, {useEffect, useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import TileMap from "./TileMap.js";
import User from "./User.js";
//import game from "./game"; // Gets the script from game !!!

const Nav=()=>{

    useEffect(()=> { 
        require("./game");
        getStarters();
    }, [])
    
    const[names, setNames] = useState(["a","b","c"]);
    const [b,setB] = useState(true);
    const [startingPok, setStartingPok] = useState([]);
    const [chosenPok, setChosenPok] = useState({});
    const [tile, setTile] = useState(0);
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [x, setX] = useState(224); // 160 0 
    const [y, setY] = useState(256); 
    const [map, setMap]= useState([ 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);

    useEffect(()=> { // Works !!! We get the values when they are updated 
        console.log(x);
        console.log(y);
        console.log(tile);
    })

    useEffect(()=> { // Works !!! We get the values when they are updated 
        console.log(chosenPok.name);
    }, [chosenPok]);

    const navigate = useNavigate();

    const getStarters = async()=> {
        let result = await fetch("http://localhost:5000/pokemonDepart")
        result = await result.json();
        if(result.length>0){
            setStartingPok(result);
            //choosePokemon();
        }
    }

    function coord(){
        console.log(x);
        console.log(y);
        console.log(tile);
    }

    console.log(startingPok);
   /* const choosePokemon = ()=> {

        alert(`Choisissez votre pokemon : \n
        b - Bulbizarre \n
        s - Salamèche \n
        c - Carapuce `)
        document.addEventListener("keydown", (event) => { 
            if(event.keycode == 66){
                setChosenPok(startingPok[2]);
                console.log(chosenPok);
            }
            if(event.keycode == 83){
                setChosenPok(startingPok[1]);
            }
            if(event.keycode == 67){
                setChosenPok(startingPok[0]);
            }
        })
    }*/

    
        document.addEventListener("keydown", (event) => { 
           // if (event.repeat) {return;}
            if(event.keyCode == 69){     
                        setX(x-32);                        
                        setTile(map[x/32][y/32]);
                }
                //down
                if(event.keyCode == 68){
                        setX(x+32);
                        setTile(map[x/32][y/32]);
                }
                //left
                if(event.keyCode == 83) {
                        let a = y - 32;
                        setY(a); 
                        //console.log(y); // Ne prend pas la valeur tout de suite 
                            setTile(map[x/32][a/32]);
                }
                //right
                if(event.keyCode == 70) { 
                        let a = y + 32; // Sa marche mieux que initialiser setY comme ça
                        setY(a);
                        if(y==0 || y==32 || y===64 ){
                            setTile(map[x/32][3]);
                        } else {
                            setTile(map[x/32][a/32]);
                        }
                }
                if(tile === 2){
                        let random = Math.random() * 100;
                        if(random < 30){
                            console.log("Un pokemon sauvage apparaît !");
                            navigate("/Combat");
                        }
                }
                //encounter();  
                
              }, {once:true});

    return <>
        <div className="carreJeu">
       {(startingPok.length>0 && b) ? <div className="choixPokemon">
              {startingPok.map((choice, index)=> { 
                  return (<button key={index} onClick={ ()=> {
                    setChosenPok(choice);
                    localStorage.setItem("starter", JSON.stringify(choice));
                    setB(false);
                  }}>{choice.name}</button>
              )})}


       </div> : <p></p>} 
        <canvas id="game"></canvas>
        </div>   
    </>
}
export default  Nav;
