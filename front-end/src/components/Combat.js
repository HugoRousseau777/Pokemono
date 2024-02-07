import React, {useEffect, useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";

const Combat=()=>{

    const [ennemy, setEnnemy] = useState({});
    const [starter, setStarter] = useState(JSON.parse(localStorage.getItem("starter")));
    const [showAttacks, setShowAttacks] = useState(false);
    const [chosenMove, setChosenMove] = useState({});
    const [firstChoiceBVisib, setFirstChoiceBVisib] = useState(true);


    const showTheAttacks = ()=> {
        setShowAttacks(true);
        setFirstChoiceBVisib(false);
    }
    const chooseTheAttacks = ()=> {
        setChosenMove({...chosenMove, 
           basePower: starter.attaques.basePower,
        });

        setShowAttacks(false);
        setFirstChoiceBVisib(true);
    }

    useEffect(()=> {
        fetchEnnemy();
    }, [])

    const damage = ()=> { // Penser au if/else + Boolean 
       setEnnemy({
           ...ennemy,
           hp: ennemy.hp - (starter.baseStats.attaque * chosenMove.basePower)
       })
    }

    const debuff = ()=> {
    if(chosenMove.effect && chosenMove.effect.stat && ennemy.baseStats){
        if(chosenMove.effect.stat == "attaque"){ // => Recherche avec regex 
            console.log("tuezfhdlzkhfz");
            setEnnemy(ennemy => ({ // https://www.js-craft.io/blog/react-update-nested-state-object-prop/
                ...ennemy,
                baseStats: {
                    ...ennemy.baseStats,
                    attaque: 100
                }
            })
                
            )
        } 
    }          
    }
   
    useEffect(()=> {
        damage();
        debuff();
        
    }, [chosenMove])


    const fetchEnnemy = async()=> {
        let result = await fetch('http://localhost:5000/pokemonFinaux') 
        .then(response => response.json())
        .then(result =>  {
           if(result){
            let finalResult = result[result.length-1];
            setEnnemy(ennemy => ({
                ...ennemy,
                ...finalResult
            })
            );
        }
        })
    }

    return (
        <>
        <div className="container">
        <div className="pokemonA">
            {
                starter ? 
                <>
                <p>{starter.name}</p>
                <p>{starter.niveau}</p>
                <p>{starter.hp}</p>
                </> : <p></p>
            }
            <div className="bandeauBas">
                <div>
                    <p>What will you do ?</p>
                </div>
                <div className="firstChoice">
                { showAttacks && 
                  <button onClick={chooseTheAttacks}>{starter.attaques.name}</button>  
                }
                { firstChoiceBVisib &&
                  <>
                    <button onClick={showTheAttacks}>FIGHT</button>
                    <button>BAG</button>
                    <button>POKEMON</button>
                    <button>RUN</button>
                  </>
                }
                    
                </div>
            </div>
            </div>
            <div className="pokemonE">
            { ennemy && ennemy.baseStats ?
                <>
                <p>{ennemy.name}</p>
                <p>{ennemy.baseStats.attaque}</p>
                
                <p>{ennemy.niveau}</p>
                <p>{ennemy.hp}</p>
                </>
                : <p></p>
    
              // l'opérateur ternaire permet de récupérer facilement le ennemies
            }
            </div>
        </div>
        </>
    )
}

export default Combat;