"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
// interface Game{
//     id: number;
//     name: String;
//     player1:WebSocket;
//     player2: WebSocket;
// }
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUSer = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addhandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        // stop the game because 
    }
    addhandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUSer) {
                    // start a game
                    const game = new Game_1.Game(this.pendingUSer, socket);
                    this.games.push(game);
                    this.pendingUSer = null;
                }
                else {
                    this.pendingUSer = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
