import { isNullishCoalesce } from "typescript";
import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";
// interface Game{
//     id: number;
//     name: String;
//     player1:WebSocket;
//     player2: WebSocket;
// }

export class GameManager{
    private games: Game[];
    private pendingUser: WebSocket | null; 
    private users: WebSocket[];
        
    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addhandler(socket)
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket);
        // stop the game because 
    }

    private addhandler(socket: WebSocket){
        socket.on("message",(data) => {
            const message = JSON.parse(data.toString());


            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    // start a game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }else{
                    this.pendingUser = socket;
                }
            }

            if(message.type === MOVE){
                console.log("inside move");
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    console.log("inside makemove")
                    game.makeMove(socket, message.payload.move);
                }
            }
        })
    }
}



