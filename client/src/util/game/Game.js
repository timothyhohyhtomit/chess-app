import React, { useState, useEffect } from "react";
import { boardToFEN } from "./GameHelper.js";

import PGame from "./PGame.js";

function Game() {
    // states
    const [board, setBoard] = useState("xxxxxxxxxxxxxxxxxxxxkpxpxxKxpxpxxxxxPxPxxxxxxPxPxxxxxxxxxxxxxxxx");
    const [status, setStatus] = useState({
        turn: 1,  // 1: white's turn, -1: black's turn
        pieceCount: {
            "Pawn": 8,
            "Rook": 2,
            "Knight": 2,
            "Bishop": 2,
            "Queen": 1,
            "pawn": 8,
            "rook": 2,
            "knight": 2,
            "bishop": 2,
            "queen": 2
        },
        whiteKingPosition: {
            row: 0,
            col: 4
        },
        blackKingPosition: {
            row: 7,
            col: 4
        },
        whiteCanCastleKingside: true,
        whiteCanCastleQueenside: true,
        blackCanCastleKingside: true,
        blackCanCastleQueenside: true,
        isChecked: 0,  // 0: neither in check, 1: white in check, -1: black in check
        isStalemate: false,
        isCheckmate: false,
        enPassantTarget: -1,
        halfmove: 0,  // halfmove count since last capture or last pawn advance
        fullmove: 1  // increments after black's move
    });
    const [FEN, setFEN] = useState("");
    // size 64 array, indicating sqaures of legal move upon clicking on a piece
    const [legalMovesMask] = useState(new Array(64).fill(false));
    // side effects
    useEffect(() => {
        // FEN board configuration
        const boardFEN = boardToFEN(board);
        // FEN active colour field
        const activeColour = status.turn === 1 ? "w" : "b";
        // FEN castling availability field
        let castlingAvailability = (status.whiteCanCastleKingside ? "K" : "") + (status.whiteCanCastleQueenside ? "Q" : "") + (status.blackCanCastleKingside ? "k" : "") + (status.blackCanCastleQueenside ? "q" : "");
        if (!castlingAvailability) castlingAvailability = "-";
        // FEN en passant target square
        const rank = 8 - Math.trunc(status.enPassantTarget / 8);
        const file = String.fromCharCode(status.enPassantTarget % 8 + 97);
        const enPassant = rank + file;
        const fen = [boardFEN, activeColour, castlingAvailability, enPassant, status.halfmove, status.fullmove].join(" ");
        setFEN(fen);
    }, [board, status]);
    // functionalities
    const isWhiteInCheck = () => {
        // for every black piece, check if it attacks the white king
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board[8 * i + j];
                // empty square or white piece
                if (piece === 'x' || piece.toUpperCase() === piece) continue;
                // at this point, piece is a black piece
                const kingRow = status.whiteKingPosition.row;
                const kingCol = status.whiteKingPosition.col;
                switch (piece) {
                    case 'p': {
                        // black pawn attacks diagonally down-left and down-right
                        if ((i - 1 === kingRow && j - 1 === kingCol) || (i - 1 === kingRow && j + 1 === kingCol)) {
                            return true;
                        }
                        break;
                    }
                    case 'r': {
                        if (i === kingRow) {
                            // same row
                            const step = j < kingCol ? 1 : -1;
                            for (let col = j + step; col !== kingCol; col += step) {
                                if (board[8 * i + col] !== 'x') break;
                                if (col === kingCol) return true;
                            }
                        } else if (j === kingCol) {
                            // same column
                            const step = i < kingRow ? 1 : -1;
                            for (let row = i + step; row !== kingRow; row += step) {
                                if (board[8 * row + j] !== 'x') break;
                                if (row === kingRow) return true;
                            }
                        }
                        break;
                    }
                    case 'n': {
                        // knight moves
                        const knightMoves = [
                            [i + 2, j + 1],
                            [i + 2, j - 1],
                            [i - 2, j + 1],
                            [i - 2, j - 1],
                            [i + 1, j + 2],
                            [i + 1, j - 2],
                            [i - 1, j + 2],
                            [i - 1, j - 2]
                        ];
                        for (const [row, col] of knightMoves) {
                            if (row === kingRow && col === kingCol) {
                                return true;
                            }
                        }
                        break;
                    }
                    case 'b': {
                        // bishop moves
                        const directions = [
                            [1, 1],
                            [1, -1],
                            [-1, 1],
                            [-1, -1]
                        ];
                        for (const [dRow, dCol] of directions) {
                            let row = i + dRow;
                            let col = j + dCol;
                            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                                if (board[8 * row + col] !== 'x') {
                                    if (row === kingRow && col === kingCol) {
                                        return true;
                                    }
                                    break;
                                }
                                if (row === kingRow && col === kingCol) {
                                    return true;
                                }
                                row += dRow;
                                col += dCol;
                            }
                        }
                        break;
                    }
                    case 'q': {
                        // queen moves (combination of rook and bishop)
                        const directions = [
                            [1, 0],
                            [-1, 0],
                            [0, 1],
                            [0, -1],
                            [1, 1],
                            [1, -1],
                            [-1, 1],
                            [-1, -1]
                        ];
                        for (const [dRow, dCol] of directions) {
                            let row = i + dRow;
                            let col = j + dCol;
                            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                                if (board[8 * row + col] !== 'x') {
                                    if (row === kingRow && col === kingCol) {
                                        return true;
                                    }
                                    break;
                                }
                                if (row === kingRow && col === kingCol) {
                                    return true;
                                }
                                row += dRow;
                                col += dCol;
                            }
                        }
                        break;
                    }
                    default: break;
                }
            }
        }
        return false;
    };
    const isBlackInCheck = () => {
        // for every white piece, check if it attacks the black king
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board[8 * i + j];
                // empty square or black piece
                if (piece === 'x' || piece.toLowerCase() === piece) continue;
                // at this point, piece is a white piece
                const kingRow = status.blackKingPosition.row;
                const kingCol = status.blackKingPosition.col;
                switch (piece) {
                    case 'P': {
                        // white pawn attacks diagonally up-left and up-right
                        if ((i + 1 === kingRow && j - 1 === kingCol) || (i + 1 === kingRow && j + 1 === kingCol)) {
                            return true;
                        }
                        break;
                    }
                    case 'R': {
                        if (i === kingRow) {
                            // same row
                            const step = j < kingCol ? 1 : -1;
                            for (let col = j + step; col !== kingCol; col += step) {
                                if (board[8 * i + col] !== 'x') break;
                                if (col === kingCol) return true;
                            }
                        } else if (j === kingCol) {
                            // same column
                            const step = i < kingRow ? 1 : -1;
                            for (let row = i + step; row !== kingRow; row += step) {
                                if (board[8 * row + j] !== 'x') break;
                                if (row === kingRow) return true;
                            }
                        }
                        break;
                    }
                    case 'N': {
                        // knight moves
                        const knightMoves = [
                            [i + 2, j + 1],
                            [i + 2, j - 1],
                            [i - 2, j + 1],
                            [i - 2, j - 1],
                            [i + 1, j + 2],
                            [i + 1, j - 2],
                            [i - 1, j + 2],
                            [i - 1, j - 2]
                        ];
                        for (const [row, col] of knightMoves) {
                            if (row === kingRow && col === kingCol) {
                                return true;
                            }
                        }
                        break;
                    }
                    case 'B': {
                        // bishop moves
                        const directions = [
                            [1, 1],
                            [1, -1],
                            [-1, 1],
                            [-1, -1]
                        ];
                        for (const [dRow, dCol] of directions) {
                            let row = i + dRow;
                            let col = j + dCol;
                            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                                if (board[8 * row + col] !== 'x') {
                                    if (row === kingRow && col === kingCol) {
                                        return true;
                                    }
                                    break;
                                }
                                if (row === kingRow && col === kingCol) {
                                    return true;
                                }
                                row += dRow;
                                col += dCol;
                            }
                        }
                        break;
                    }
                    case 'Q': {
                        // queen moves (combination of rook and bishop)
                        const directions = [
                            [1, 0],
                            [-1, 0],
                            [0, 1],
                            [0, -1],
                            [1, 1],
                            [1, -1],
                            [-1, 1],
                            [-1, -1]
                        ];
                        for (const [dRow, dCol] of directions) {
                            let row = i + dRow;
                            let col = j + dCol;
                            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                                if (board[8 * row + col] !== 'x') {
                                    if (row === kingRow && col === kingCol) {
                                        return true;
                                    }
                                    break;
                                }
                                if (row === kingRow && col === kingCol) {
                                    return true;
                                }
                                row += dRow;
                                col += dCol;
                            }
                        }
                        break;
                    }
                    default: break;
                }
            }
        }
        return false;
    };
    const computeLegalMoves = (board, status, code, position) => {
        // compute legal moves according to piece type
        if (code === 'x') return [];
        // colour
        const isWhite = code === code.toUpperCase();
        // piece type
        const pieceType = code.toLowerCase();
        let legalMoves = [];
        
    };
    return (
        <PGame
            board={board}
            status={status}
            legalMovesMask={legalMovesMask}
            setBoard={setBoard}
            setStatus={setStatus}
        />
    );
}

export default Game;
