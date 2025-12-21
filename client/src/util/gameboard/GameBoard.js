import React from "react";

import "./GameBoard.css";

function GameBoard() {
    return (
        <div className="chessboard">
            {[...Array(8)].map((_, row) => (
                <div key={8 - row} className="row">
                    {[...Array(8)].map((_, col) => {
                        const isDark = (row + col) % 2 === 1;
                        return (
                            <div
                                key={`{row}{col}`}
                                className={`square ${isDark ? "dark" : "light"}`}
                            >&nbsp;O&nbsp;</div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default GameBoard;
