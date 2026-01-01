import React, { useState, useEffect } from "react";
import { boardToFEN } from "./GameHelper.js";

import PGame from "./PGame.js";

function Game() {
    // states
    const [board, setBoard] = useState("rnbqkbnrppppppppxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxPPPPPPPPRNBQKBNR");
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
