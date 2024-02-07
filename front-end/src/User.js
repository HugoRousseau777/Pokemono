import MovingDirection from "./MovingDirection.js";
import TileMap from "./TileMap.js";

let up,down,left,right = false;

export default class User {

    constructor(x,y,tileSize,velocity,tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        // Moving User
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        document.addEventListener("keydown", this.#keydown);
        // Ajout pour arrêter l'user
        document.addEventListener("keyup", this.#keyup);
        //
        this.#loadUserImage();
       
    }
    draw(ctx){
        this.#move();
        ctx.drawImage(
            this.userImages[this.userImageIndex],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize
        );
    }

    #loadUserImage(){
        const userImage = new Image();
        userImage.src = "./assets/img/chat.jpeg";
        this.userImages = [
            userImage
        ];
        this.userImageIndex = 0; // Which img we are currently using
    }

    #keydown = (event)=> {
        //up // esdf
        if(event.keyCode == 69){
            this.requestedMovingDirection = MovingDirection.up;
            up = true;
        }
        //down
        if(event.keyCode == 68){
            this.requestedMovingDirection = MovingDirection.down;
            down = true;
        }
        //left
        if(event.keyCode == 83) {
            this.requestedMovingDirection = MovingDirection.left;
            left= true;
        }
        //right
        if(event.keyCode == 70) {
            this.requestedMovingDirection = MovingDirection.right;
            right = true;
        }

        this.tileMap.encounter(this.x,
            this.y
            );
    }

    #keyup = (event)=> {
        this.requestedMovingDirection = null;
        up = false;
        down = false;
        left = false;
        right = false;
    }

    #move(){
        if(this.currentMovingDirection !== this.requestedMovingDirection) {
            if (
                Number.isInteger(this.x / this.tileSize) && 
                Number.isInteger(this.y / this.tileSize)
            ) {
                // Ajout collision
                if(!this.tileMap.didCollideWithEnv(
                    this.x,
                    this.y,
                    this.requestedMovingDirection
                    )
                ) {
                    this.currentMovingDirection = this.requestedMovingDirection;
                }
                //
            }
        }
        this.currentMovingDirection = this.requestedMovingDirection; // Si la condition du haut est fausse, le statement ne s'appliquait pas et le résultat du keyup n'était pas récupéré
        // Ajout collision
        if (this.tileMap.didCollideWithEnv(
            this.x,
            this.y,
            this.currentMovingDirection
            )
        ) {
            return; // Empêche le switch en-dessous de s'activer et de faire bouger le perso
        }
        //

        switch (this.currentMovingDirection) { // Change les coordonnées de user selon la direction choisie
            case MovingDirection.up:
                if(up){
                    this.y -= this.tileSize;
                    up = false;
                }
                break;
            case MovingDirection.down:
                if(down){
                    this.y += this.tileSize;
                    down = false;
                }
                break;
            case MovingDirection.left:
                if(left){
                    this.x -= this.tileSize;
                    left = false;
                }
                break;
            case MovingDirection.right:
                if(right){
                    this.x += this.tileSize;
                    right = false;
                }
                break;
        }
    }
}



