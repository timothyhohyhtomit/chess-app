import React from "react";

import "./GamePiece.css";

function GamePiece({ code, turn }) {
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
    // variables
    const type = getType(code);
    const colour = getColour(code);
    return (
        <div className={`gamepiece ${colour} ${((colour === "white" && turn === 1) || (colour === "black" && turn === -1)) ? "active" : "inactive"}`}>
            <img src={`/assets/gamepieces/${type}-${colour}.png`} alt="" />
        </div>
    );
}

export default GamePiece;