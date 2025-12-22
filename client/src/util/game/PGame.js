import React from "react";

import PGameBoard from "../gameboard/PGameBoard.js";
import PGamePanel from "../gamepanel/PGamePanel.js";

import "./PGame.css";

function PGame({ board, status, setBoard, setStatus }) {
    return (
        <div className="game">
            <PGameBoard
                board={board}
                status={status}
                setBoard={setBoard}
                setStatus={setStatus}
            />
            <PGamePanel
                status={status}
                setStatus={setStatus}
            />
        </div>
    );
}

export default PGame;
