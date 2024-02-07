import TileMap from "./TileMap.js";
import User from "./User.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 32;

const tileMap = new TileMap(tileSize);

const velocity = 1; // => The user moves one tile at a time 
const user = tileMap.getUser(velocity);

function gameLoop() {
    tileMap.draw(canvas, ctx);
    user.draw(ctx);
}

function encounter(x,y) { 
    let column = Math.floor(x/32);
    let row = Math.floor(y/32);
    const tile = tileMap.map[row][column];
    
    
    if(tile == 2){
        for(let i=0; i<1; i++){
            let random = Math.random() * 100;
            if(random < 90){
                console.log("bouh !");
            }
        }
    }  
} 

//encounter(user.x,user.y);

setInterval(gameLoop, 1000 / 60);
//setInterval(encounter, 1000, `${user.x}`, `${user.y}`);