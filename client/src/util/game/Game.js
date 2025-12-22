import React, { useState } from "react";

import GameBoard from "../gameboard/GameBoard.js";

function Game() {
    // states
    const [board, setBoard] = useState("RNBQKBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbqkbnr");
    const [status, setStatus] = useState({
        turn: 1,  // 1: white's turn, -1: black's turn
        pieceCount: {
            "Pawn": 8,
            "Rook": 2,
            "Knight": 2,
            "Bishop": 2,
            "Queen": 1,
            "pawn": 8,
            "rook": 2,
            "knight": 2,
            "bishop": 2,
            "queen": 2
        },
        whiteCanCastle: true,
        blackCanCastle: true,
        isChecked: 0,  // 0: neither in check, 1: white in check, -1: black in check
        isStalemate: false,
        isCheckmate: false
    });
    return (
        <GameBoard
            board={board}
            status={status}
            setBoard={setBoard}
            setStatus={setStatus}
        />
    );
}

export default Game;
