import React from "react";

import GamePiece from "../gamepieces/GamePiece.js";

import "./GameBoard.css";

function GameBoard({ board, status, setBoard, setStatus }) {
    // helper functions
    return (
        <div className="chessboard">
            {[...Array(8)].map((_, col) => (
                <div key={8 - col} className="row">
                    {[...Array(8)].map((_, row) => {
                        const isDark = (row + col) % 2 === 1;
                        const piece = board[8 * (7 - row) + col];
                        return (
                            <div
                                key={`${row}${col}`}
                                className={`square ${isDark ? "dark" : "light"}`}
                            >
                                { piece !== 'x' && (
                                    <GamePiece code={piece} turn={status.turn} />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default GameBoard;
