import React, { lazy, useEffect } from 'react';
import {Link} from 'react-router-dom';

//import game from "./game"; // Gets the script from game !!!


const Nav=()=>{

    useEffect(()=> {
        require("./game");
    }, [])

    const game = lazy(() => import(/* webpackPrefetch: true */ './game')); // this will load after everything is completed in short at the end of everything it will load
    return <>
        <div className="carreJeu">
        <canvas id="game"></canvas>
        </div>   
       
    </>
}
// <img src={require('./img/chat.jpeg')}/>
export default  Nav;
