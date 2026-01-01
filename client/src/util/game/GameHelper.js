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
                            console.log("checking col ", col);
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

export { boardToFEN, FENToBoard, isWhiteInCheck, isBlackInCheck };
