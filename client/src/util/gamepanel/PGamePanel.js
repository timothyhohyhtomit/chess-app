import React from "react";

import "./PGamePanel.css";

function PGamePanel({ status, setStatus }) {
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
        </div>
    );
}

export default PGamePanel;
