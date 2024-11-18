// // import { Routes } from "react-router-dom"

import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({board,chess, socket,setBoard}: {
    chess: Chess;
    setBoard: React.Dispatch<React.SetStateAction<({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>>;
    board: ({
        square : Square;
        type: PieceSymbol;
        color: Color;
    } | null) [][];
    socket: WebSocket;
}) => {
    const [from, setFrom] = useState<null | Square>(null);
    // const [to, setTo] = useState<null | Squ000000000

    return <div className="text-white-200">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8-i) as Square;
                    // console.log(squareRepresentation);
                    return <div onClick={() => {
                        if (!from) {
                            setFrom(squareRepresentation);
                        } else {
                            // console.log(square)
                            socket.send(JSON.stringify({
                                type: MOVE,
                                payload: {
                                    move: {
                                        from :square,
                                        to: squareRepresentation
                                    }
                                }
                            }))

                            setFrom(null);
                            chess.move({
                                from ,
                                to: squareRepresentation
                            });
                            setBoard(chess.board());
                            console.log({
                                from,
                                to: squareRepresentation
                            })
                        }
                    }} key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-green-500' :'bg-slate-400'}`}>
                        <div className="w-full justify-center flex h-full">
                           <div className="h-full justify-center flex flex-col">
                            {square ? <img className="w-4" src={`/${square?.color === "b" ?
                                square?.type: `${square?.type?.toUpperCase()} copy`}.png`} />:
                                null}
                           </div>
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}



