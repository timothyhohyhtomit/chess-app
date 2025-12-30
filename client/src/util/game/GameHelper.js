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

const FENToBoard = (fen) => {};

export { boardToFEN, FENToBoard };
