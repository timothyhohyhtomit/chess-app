import React from "react";

import PGamePiece from "../gamepieces/PGamePiece.js";

import "./PGameBoard.css";

function PGameBoard({ board, status, setBoard, setStatus }) {
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
                                { piece !== 'x' ? (
                                    <PGamePiece code={piece} turn={status.turn} />
                                ) : (
                                    <div className="placeholder">&nbsp;</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default PGameBoard;
