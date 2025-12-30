import React from "react";

import PGamePiece from "../gamepieces/PGamePiece.js";

import "./PGameBoard.css";

function PGameBoard({ board, status, legalMovesMask, setBoard, setStatus }) {
    return (
        <div className="chessboard">
            {[...Array(8)].map((_, row) => {
                return (
                    <>
                        {[...Array(8)].map((_, col) => {
                            const isDark = (row + col) % 2 === 1;
                            const isLegalMove = legalMovesMask[8 * row + col];
                            const piece = board[8 * row + col];
                            return (
                                <div
                                    key={`rank${row}file${col}`}
                                    className={`square ${isDark ? "dark" : "light"} ${isLegalMove ? "legal-move" : ""}`}
                                >
                                    { piece !== 'x' ? (
                                        <PGamePiece code={piece} turn={status.turn} />
                                    ) : (
                                        <div className="placeholder">&nbsp;</div>
                                    )}
                                </div>
                            );
                        })}
                    </>
                );
        })}
        </div>
    );
}

export default PGameBoard;
