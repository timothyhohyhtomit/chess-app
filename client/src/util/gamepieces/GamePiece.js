import React from "react";

import "./GamePiece.css";

function GamePiece({ code }) {
    // helper functions
    const getType = (code) => {
        const pieceMap = {
            'p': 'pawn',
            'r': 'rook',
            'n': 'knight',
            'b': 'bishop',
            'q': 'queen',
            'k': 'king'
        };
        return pieceMap[code.toLowerCase()];
    };
    const getColour = (code) => {
        return code === code.toUpperCase() ? "white" : "black";
    };
    return (
        <div className={`gamepiece ${getColour(code)}`}>
            <img src={`/assets/gamepieces/${getType(code)}-${getColour(code)}.png`} alt="" />
        </div>
    );
}

export default GamePiece;