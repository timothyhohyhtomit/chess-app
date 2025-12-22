import React from "react";

import "./PGamePanel.css";

function PGamePanel({ status, setStatus }) {
    return (
        <div className="panel">
            <div className={`panel-turn ${status.turn === 1 ? "white" : "black"}`}>{status.turn === 1 ? "♔ White" : "♚ Black"}'s Turn</div>
            {/* FOR TESTING ONLY */}
            <div>TESTING</div>
            {/*
            <button onClick={setStatus(prevStatus => ({
                ...prevStatus,
                turn: -prevStatus.turn
            }))}>Change Turn</button>
            */}
        </div>
    );
}

export default PGamePanel;
