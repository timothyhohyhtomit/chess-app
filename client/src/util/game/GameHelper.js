const boardToFEN = (board) => {
    if (board.length !== 64) return "";
    const boardRanks = [];
    for (let i = 0; i < board.length; i += 8) {
        let rank = "";
        for (let j = 0; j < 8; j++) {
            if (board[i + j] !== 'x') rank += board[i + j];
            else {
                let empty = 0;
                while (j < 8 && board[i + j] === 'x') {
                    empty++;
                    j++;
                }
                j--;
                rank += empty;
            }
        }
        boardRanks.push(rank);
    }
    return boardRanks.join("/");
};

const FENToBoard = (fen) => {
    const ranks = fen.split("/");
    if (ranks.length !== 8) return "";
    let board = "";
    for (const rank of ranks) {
        for (const square of rank) {
            if (isNaN(square)) {
                board += square;
            } else {
                board += 'x'.repeat(parseInt(square));
            }
        }
    }
    return board;
};

const movePiece = (board, fromRow, fromCol, toRow, toCol) => {
    // verify parameters: if invalid, return original board
    if (typeof board !== "string" || board.length !== 64 || !Number.isInteger(fromRow) || fromRow < 0 || fromRow >= 8 || !Number.isInteger(fromCol) || fromCol < 0 || fromCol >= 8 || !Number.isInteger(toRow) || toRow < 0 || toRow >= 8 || !Number.isInteger(toCol) || toCol < 0 || toCol >= 8) return board;
    const fromIndex = 8 * fromRow + fromCol;
    const toIndex = 8 * toRow + toCol;
    const piece = board[fromIndex];
    if (piece === 'x') return board;  // no piece to move
    let newBoard = board.split("");
    newBoard[toIndex] = piece;
    newBoard[fromIndex] = 'x';
    return newBoard.join("");
};

const isWhiteInCheck = (board, status) => {
    // for every black piece, check if it attacks the white king
    const kingRow = status.whiteKingPosition.row;
    const kingCol = status.whiteKingPosition.col;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[8 * i + j];
            // empty square or white piece
            if (piece === 'x' || piece.toUpperCase() === piece) continue;
            // at this point, piece is a black piece
            switch (piece) {
                case 'p': {
                    // black pawn attacks diagonally down-left and down-right
                    if ((i + 1 === kingRow && j - 1 === kingCol) || (i + 1 === kingRow && j + 1 === kingCol)) {
                        return true;
                    }
                    break;
                }
                case 'r': {
                    if (i === kingRow) {
                        // same row
                        const step = j < kingCol ? 1 : -1;
                        let col;
                        for (col = j + step; col !== kingCol; col += step) {
                            if (board[8 * i + col] !== 'x') break;
                        }
                        if (col === kingCol) return true;
                    } else if (j === kingCol) {
                        // same column
                        const step = i < kingRow ? 1 : -1;
                        let row;
                        for (row = i + step; row !== kingRow; row += step) {
                            if (board[8 * row + j] !== 'x') break;
                        }
                        if (row === kingRow) return true;
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
                case 'k': {
                    const distRow = Math.abs(i - kingRow);
                    const distCol = Math.abs(j - kingCol);
                    if (distRow <= 1 && distCol <= 1) return true;
                    break;
                }
                default: break;
            }
        }
    }
    return false;
};

const isBlackInCheck = (board, status) => {
    const kingRow = status.blackKingPosition.row;
    const kingCol = status.blackKingPosition.col;
    // for every white piece, check if it attacks the black king
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[8 * i + j];
            // empty square or black piece
            if (piece === 'x' || piece.toLowerCase() === piece) continue;
            // at this point, piece is a white piece
            switch (piece) {
                case 'P': {
                    // white pawn attacks diagonally up-left and up-right
                    if ((i - 1 === kingRow && j - 1 === kingCol) || (i - 1 === kingRow && j + 1 === kingCol)) {
                        return true;
                    }
                    break;
                }
                case 'R': {
                    if (i === kingRow) {
                        // same row
                        const step = j < kingCol ? 1 : -1;
                        let col;
                        for (col = j + step; col !== kingCol; col += step) {
                            if (board[8 * i + col] !== 'x') break;
                        }
                        if (col === kingCol) return true;
                    } else if (j === kingCol) {
                        // same column
                        const step = i < kingRow ? 1 : -1;
                        let row;
                        for (row = i + step; row !== kingRow; row += step) {
                            if (board[8 * row + j] !== 'x') break;
                        }
                        if (row === kingRow) return true;
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
                case 'K': {
                    const distRow = Math.abs(i - kingRow);
                    const distCol = Math.abs(j - kingCol);
                    if (distRow <= 1 && distCol <= 1) return true;
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
    // current piece location
    const r = position.row;
    const c = position.col;
    const legalMoves = [];
    switch (code) {
        case 'p': {  // black pawn
            const pawnFront = board[8 * (r + 1) + c];
            const pawnFrontLeft = board[8 * (r + 1) + (c + 1)];
            const pawnFrontRight = board[8 * (r + 1) + (c - 1)];
            // if nothing blocking, pawn can advance
            if (pawnFront === 'x') {
                legalMoves.push({
                    row: r + 1,
                    col: c
                });
            } else if (pawnFrontLeft !== 'x' && pawnFrontLeft === pawnFrontLeft.toUpperCase()) {  // if front left has white piece, pawn can capture
                legalMoves.push({
                    row: r + 1,
                    col: c + 1
                });
            } else if (pawnFrontRight !== 'x' && pawnFrontRight === pawnFrontRight.toUpperCase()) {  // if front right has white piece, pawn can capture
                legalMoves.push({
                    row: r + 1,
                    col: c - 1
                });
            } else if (r === 1 && pawnFront === 'x') {  // if at starting position and two squares ahead is free, pawn can advance two squares
                const pawnFront2 = board[8 * (r + 2) + c];
                if (pawnFront2 === 'x') {
                    legalMoves.push({
                        row: r + 2,
                        col: c
                    });
                }
            }
            break;
        }
        case 'P': {  // white pawn
            const pawnFront = board[8 * (r - 1) + c];
            const pawnFrontLeft = board[8 * (r - 1) + (c + 1)];
            const pawnFrontRight = board[8 * (r - 1) + (c - 1)];
            // if nothing blocking, pawn can advance
            if (pawnFront === 'x') {
                legalMoves.push({
                    row: r - 1,
                    col: c
                });
            } else if (pawnFrontLeft !== 'x' && pawnFrontLeft === pawnFrontLeft.toUpperCase()) {  // if front left has white piece, pawn can capture
                legalMoves.push({
                    row: r - 1,
                    col: c + 1
                });
            } else if (pawnFrontRight !== 'x' && pawnFrontRight === pawnFrontRight.toUpperCase()) {  // if front right has white piece, pawn can capture
                legalMoves.push({
                    row: r - 1,
                    col: c - 1
                });
            } else if (r === 6 && pawnFront === 'x') {  // if at starting position and two squares ahead is free, pawn can advance two squares
                const pawnFront2 = board[8 * (r - 2) + c];
                if (pawnFront2 === 'x') {
                    legalMoves.push({
                        row: r - 2,
                        col: c
                    });
                }
            }
            break;
        }
        case 'r': {
            // northbound moves
            for (let row = r - 1; row >= 0; row--) {
                const square = board[8 * row + c];
                const isSquareWhite = square === square.toUpperCase();
                if (square === 'x') {  // empty square
                    legalMoves.push({
                        row: row,
                        col: c
                    });
                } else {  // occupied square
                    if (isWhite !== isSquareWhite) {  // piece is opposite colour, can capture
                        legalMoves.push({
                            row: row,
                            col: c
                        });
                    }
                    break;
                }
            }
            // southbound moves
            for (let row = r + 1; row < 8; row++) {
                const square = board[8 * row + c];
                const isSquareWhite = square === square.toUpperCase();
                if (square === 'x') {  // empty square
                    legalMoves.push({
                        row: row,
                        col: c
                    });
                } else {  // occupied square
                    if (isWhite !== isSquareWhite) {  // piece is opposite colour, can capture
                        legalMoves.push({
                            row: row,
                            col: c
                        });
                    }
                    break;
                }
            }
            // eastbound moves
            for (let col = c + 1; col < 8; col++) {
                const square = board[8 * r + col];
                const isSquareWhite = square === square.toUpperCase();
                if (square === 'x') {  // empty square
                    legalMoves.push({
                        row: r,
                        col: col
                    });
                } else {  // occupied square
                    if (isWhite !== isSquareWhite) {  // piece is opposite colour, can capture
                        legalMoves.push({
                            row: r,
                            col: col
                        });
                    }
                    break;
                }
            }
            // westbound moves
            for (let col = c - 1; col >= 0; col--) {
                const square = board[8 * r + col];
                const isSquareWhite = square === square.toUpperCase();
                if (square === 'x') {  // empty square
                    legalMoves.push({
                        row: r,
                        col: col
                    });
                } else {  // occupied square
                    if (isWhite !== isSquareWhite) {  // piece is opposite colour, can capture
                        legalMoves.push({
                            row: r,
                            col: col
                        });
                    }
                    break;
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
                if (row < 0 || row >= 8 || col < 0 || col >= 8) continue;
                const square = board[8 * row + col];
                const isSquareWhite = square === square.toUpperCase();
                // can move to empty square or capture opposite colour piece
                if (square === 'x' || isWhite !== isSquareWhite) {
                    legalMoves.push({
                        row: row,
                        col: col
                    });
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
                let row = r + dRow;
                let col = c + dCol;
                while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                    const square = board[8 * row + col];
                    const isSquareWhite = square === square.toUpperCase();
                    if (square === 'x') {  // empty square
                        legalMoves.push({
                            row: row,
                            col: col
                        });
                    } else {  // occupied square
                        if (isWhite !== isSquareWhite) {  // piece is opposite colour, can capture
                            legalMoves.push({
                                row: row,
                                col: col
                            });
                        }
                        break;
                    }
                    row += dRow;
                    col += dCol;
                }
            }
            break;
        }
        case 'q': {
            // queen moves
            const directions = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1]
            ];
            for (const [dRow, dCol] of directions) {
                let row = r + dRow;
                let col = c + dCol;
                while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                    const square = board[8 * row + col];
                    const isSquareWhite = square === square.toUpperCase();
                    if (square === 'x') {  // empty square
                        legalMoves.push({
                            row: row,
                            col: col
                        });
                    } else {  // occupied square
                        if (isWhite !== isSquareWhite) {  // piece is opposite colour, can capture
                            legalMoves.push({
                                row: row,
                                col: col
                            });
                        }
                        break;
                    }
                    row += dRow;
                    col += dCol;
                }
            }
            break;
        }
        case 'k': {
            // king can move one square in any direction if it's unoccupied
            const directions = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1]
            ];
            for (const [dRow, dCol] of directions) {
                const row = r + dRow;
                const col = c + dCol;
                if (row < 0 || row >= 8 || col < 0 || col >= 8) continue;
                const square = board[8 * row + col];
                const isSquareWhite = square === square.toUpperCase();
                // can move to empty square or capture opposite colour piece
                if (square === 'x' || isWhite !== isSquareWhite) {
                    legalMoves.push({
                        row: row,
                        col: col
                    });
                }
            }
            // or king can castle if (1) it has not lost his castling ability, (2) not in check, (3) no pieces are blocking his castling path
            if (status.isChecked === -1) break;  // cannot castle when black in check
            if (status.blackCanCastleKingside) {}
            else if (status.blackCanCastleQueenside) {}
            break;
        }
        default: break;
    }
    
};

export { boardToFEN, FENToBoard, isWhiteInCheck, isBlackInCheck, computeLegalMoves };
