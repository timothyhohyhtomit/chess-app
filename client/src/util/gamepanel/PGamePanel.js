import React, { useState } from "react";

import "./PGamePanel.css";

function PGamePanel({ board, setBoard, status, setStatus }) {
    const [boardInput, setBoardInput] = useState(board);
    // event handlers
    const handleClickChangeTurn = (e) => {
        setStatus(prevStatus => {
            return {
                ...prevStatus,
                turn: -prevStatus.turn
            };
        });
    };
    return (
        <div className="panel">
            <div className={`panel-turn ${status.turn === 1 ? "white" : "black"}`}>{status.turn === 1 ? "♔ White" : "♚ Black"}'s Turn</div>
            {/* FOR TESTING ONLY */}
            <div>TESTING</div>
            <button onClick={handleClickChangeTurn}>Change Turn</button>
            <input className="panel-board-input" type="text" value={boardInput} onChange={(e) => setBoardInput(e.currentTarget.value)} />
            <button onClick={(e) => setBoard(boardInput)}>Set</button>
        </div>
    );
}

export default PGamePanel;
