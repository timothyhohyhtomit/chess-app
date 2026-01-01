import React from "react";

import PGameBoard from "../gameboard/PGameBoard.js";
import PGamePanel from "../gamepanel/PGamePanel.js";

import "./PGame.css";

function PGame({ board, status, legalMovesMask, setBoard, setStatus }) {
    return (
        <div className="game">
            <PGameBoard
                board={board}
                status={status}
                legalMovesMask={legalMovesMask}
                setBoard={setBoard}
                setStatus={setStatus}
            />
            <PGamePanel
                board={board}
                setBoard={setBoard}
                status={status}
                setStatus={setStatus}
            />
        </div>
    );
}

export default PGame;
