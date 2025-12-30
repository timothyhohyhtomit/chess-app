import React from "react";

import PGamePiece from "./PGamePiece";

import "./GamePiece.css";

function GamePiece({ board, status, code, turn, position }) {
    return (
        <PGamePiece
            code={code}
            turn={turn}
            position={position}
        />
    )
}

export default GamePiece;