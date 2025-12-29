import React from "react";

import PGamePiece from "../gamepieces/PGamePiece.js";

import "./PGameBoard.css";

function PGameBoard({ board, status, legalMovesMask, setBoard, setStatus }) {
    const ranks = board.split("/");
    return (
        <div className="chessboard">
            {[...Array(8)].map((_, row) => {
                const rank = ranks[row];
                let newRank = "";
                for (const char of rank) {
                    if (isNaN(char)) newRank += char;
                    else for (let i = 0; i < parseInt(char, 10); i++) newRank += 'x';
                }
                return (
                    <>
                        {[...Array(8)].map((_, col) => {
                            const isDark = (row + col) % 2 === 1;
                            const isLegalMove = legalMovesMask[8 * row + col];
                            const piece = newRank[col];
                            return (
                                <div
                                    key={`${row}${col}`}
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
