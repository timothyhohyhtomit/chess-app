import { computeLegalMoves } from "../util/game/GameHelper.js";

const getKingPositions = (board) => {
    const whiteKingIndex = board.indexOf("K");
    const blackKingIndex = board.indexOf("k");
    return {
        whiteKingPosition: {
            row: Math.trunc(whiteKingIndex / 8),
            col: whiteKingIndex % 8
        },
        blackKingPosition: {
            row: Math.trunc(blackKingIndex / 8),
            col: blackKingIndex % 8
        }
    };
};

// initialise chess board data
const boardInit = "rnbqkbnrppppppppxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxPPPPPPPPRNBQKBNR";
const boardEarly1 = "rnbqkxnrpppxxxppxxxbxpxxxxxpNxxxxxPPpxxxxxxxPxxxPPxxxPPPRNBQKBxR";
const boardEarly2 = "rnbqkxxrppppxpppxxxxxxxxxxbxPxxxxxxxnpxxxxNxxxxxPPPPxxPPRxBQKBNR";
const boardEarly3 = "rxbqkxxrpppnppbpxxxpxxpnxxxxxxNxxxBxPxxxxxxxxxxxPPPPxPPPRNBQKxxR";
const boardEarly4 = "rnxqkbxrppxxxppxxxxxpnxpxxppxxBxxxxxxxbxxxPPxNxxPPxNPPPPRxxQKBxR";
const boardEarly5 = "rxbxkxxrpppxxpppxxnpxnxxxxbxpxxxxxxxPxxqxxxPxQxPPPPxBPPxRNBxKxNR";
const boardEarly6 = "rnxqkbxrppxxppppxxxxxxxxxxpnxbxxxxxxxxxxPxxxxNxxxPxPPPPPRNBQKBxR";

xdescribe("GameHelper.computeLegalMoves()", () => {
    it("initial chess board", () => {
        const status = getKingPositions(boardInit);
        // black rook
        const actual_r00 = computeLegalMoves(boardInit, status, 'r', { row: 0, col: 0 });
        expect(actual_r00).toHaveLength(0);
        // black knight
        const actual_n01 = computeLegalMoves(boardInit, status, 'n', { row: 0, col: 1 });
        const expected_n01 = [{ row: 2, col: 0 }, { row: 2, col: 2 }];
        expect(actual_n01).toEqual(expect.arrayContaining(expected_n01));
        expect(actual_n01).toHaveLength(expected_n01.length);
        // black bishop
        const actual_b02 = computeLegalMoves(boardInit, status, 'b', { row: 0, col: 2 });
        expect(actual_b02).toHaveLength(0);
        // black queen
        const actual_q03 = computeLegalMoves(boardInit, status, 'q', { row: 0, col: 3 });
        expect(actual_q03).toHaveLength(0);
        // black king
        const actual_k04 = computeLegalMoves(boardInit, status, 'k', { row: 0, col: 4 });
        expect(actual_k04).toHaveLength(0);
        // black bishop
        const actual_b05 = computeLegalMoves(boardInit, status, 'b', { row: 0, col: 5 });
        expect(actual_b05).toHaveLength(0);
        // black knight
        const actual_n06 = computeLegalMoves(boardInit, status, 'n', { row: 0, col: 6 });
        const expected_n06 = [{ row: 2, col: 5 }, { row: 2, col: 7 }];
        expect(actual_n06).toEqual(expect.arrayContaining(expected_n06));
        expect(actual_n06).toHaveLength(expected_n06.length);
        // black rook
        const actual_r07 = computeLegalMoves(boardInit, status, 'r', { row: 0, col: 7 });
        expect(actual_r07).toHaveLength(0);
        // black pawns
        const actual_p10 = computeLegalMoves(boardInit, status, 'p', { row: 1, col: 0 });
        const expected_p10 = [{ row: 2, col: 0 }, { row: 3, col: 0 }];
        expect(actual_p10).toEqual(expect.arrayContaining(expected_p10));
        expect(actual_p10).toHaveLength(expected_p10.length);
        const actual_p11 = computeLegalMoves(boardInit, status, 'p', { row: 1, col: 1 });
        const expected_p11 = [{ row: 2, col: 1 }, { row: 3, col: 1 }];
        expect(actual_p11).toEqual(expect.arrayContaining(expected_p11));
        expect(actual_p11).toHaveLength(expected_p11.length);
        const actual_p12 = computeLegalMoves(boardInit, status, 'p', { row: 1, col: 2 });
        const expected_p12 = [{ row: 2, col: 2 }, { row: 3, col: 2 }];
        expect(actual_p12).toEqual(expect.arrayContaining(expected_p12));
        expect(actual_p12).toHaveLength(expected_p12.length);
        const actual_p13 = computeLegalMoves(boardInit, status, 'p', { row: 1, col: 3 });
        const expected_p13 = [{ row: 2, col: 3 }, { row: 3, col: 3 }];
        expect(actual_p13).toEqual(expect.arrayContaining(expected_p13));
        expect(actual_p13).toHaveLength(expected_p13.length);
        const actual_p14 = computeLegalMoves(boardInit, status, 'p', { row: 1, col: 4 });
        const expected_p14 = [{ row: 2, col: 4 }, { row: 3, col: 4 }];
        expect(actual_p14).toEqual(expect.arrayContaining(expected_p14));
        expect(actual_p14).toHaveLength(expected_p14.length);
        const actual_p15 = computeLegalMoves(boardInit, status, 'p', { row: 1, col: 5 });
        const expected_p15 = [{ row: 2, col: 5 }, { row: 3, col: 5 }];
        expect(actual_p15).toEqual(expect.arrayContaining(expected_p15));
        expect(actual_p15).toHaveLength(expected_p15.length);
        const actual_p16 = computeLegalMoves(boardInit, status, 'p', { row: 1, col: 6 });
        const expected_p16 = [{ row: 2, col: 6 }, { row: 3, col: 6 }];
        expect(actual_p16).toEqual(expect.arrayContaining(expected_p16));
        expect(actual_p16).toHaveLength(expected_p16.length);
        const actual_p17 = computeLegalMoves(boardInit, status, 'p', { row: 1, col: 7 });
        const expected_p17 = [{ row: 2, col: 7 }, { row: 3, col: 7 }];
        expect(actual_p17).toEqual(expect.arrayContaining(expected_p17));
        expect(actual_p17).toHaveLength(expected_p17.length);
        // white pawns
        const actual_p60 = computeLegalMoves(boardInit, status, 'P', { row: 6, col: 0 });
        const expected_p60 = [{ row: 5, col: 0 }, { row: 4, col: 0 }];
        expect(actual_p60).toEqual(expect.arrayContaining(expected_p60));
        expect(actual_p60).toHaveLength(expected_p60.length);
        const actual_p61 = computeLegalMoves(boardInit, status, 'P', { row: 6, col: 1 });
        const expected_p61 = [{ row: 5, col: 1 }, { row: 4, col: 1 }];
        expect(actual_p61).toEqual(expect.arrayContaining(expected_p61));
        expect(actual_p61).toHaveLength(expected_p61.length);
        const actual_p62 = computeLegalMoves(boardInit, status, 'P', { row: 6, col: 2 });
        const expected_p62 = [{ row: 5, col: 2 }, { row: 4, col: 2 }];
        expect(actual_p62).toEqual(expect.arrayContaining(expected_p62));
        expect(actual_p62).toHaveLength(expected_p62.length);
        const actual_p63 = computeLegalMoves(boardInit, status, 'P', { row: 6, col: 3 });
        const expected_p63 = [{ row: 5, col: 3 }, { row: 4, col: 3 }];
        expect(actual_p63).toEqual(expect.arrayContaining(expected_p63));
        expect(actual_p63).toHaveLength(expected_p63.length);
        const actual_p64 = computeLegalMoves(boardInit, status, 'P', { row: 6, col: 4 });
        const expected_p64 = [{ row: 5, col: 4 }, { row: 4, col: 4 }];
        expect(actual_p64).toEqual(expect.arrayContaining(expected_p64));
        expect(actual_p64).toHaveLength(expected_p64.length);
        const actual_p65 = computeLegalMoves(boardInit, status, 'P', { row: 6, col: 5 });
        const expected_p65 = [{ row: 5, col: 5 }, { row: 4, col: 5 }];
        expect(actual_p65).toEqual(expect.arrayContaining(expected_p65));
        expect(actual_p65).toHaveLength(expected_p65.length);
        const actual_p66 = computeLegalMoves(boardInit, status, 'P', { row: 6, col: 6 });
        const expected_p66 = [{ row: 5, col: 6 }, { row: 4, col: 6 }];
        expect(actual_p66).toEqual(expect.arrayContaining(expected_p66));
        expect(actual_p66).toHaveLength(expected_p66.length);
        const actual_p67 = computeLegalMoves(boardInit, status, 'P', { row: 6, col: 7 });
        const expected_p67 = [{ row: 5, col: 7 }, { row: 4, col: 7 }];
        expect(actual_p67).toEqual(expect.arrayContaining(expected_p67));
        expect(actual_p67).toHaveLength(expected_p67.length);
        // white rook
        const actual_R70 = computeLegalMoves(boardInit, status, 'R', { row: 7, col: 0 });
        expect(actual_R70).toHaveLength(0);
        // white knight
        const actual_N71 = computeLegalMoves(boardInit, status, 'N', { row: 7, col: 1 });
        const expected_N71 = [{ row: 5, col: 0 }, { row: 5, col: 2 }];
        expect(actual_N71).toEqual(expect.arrayContaining(expected_N71));
        expect(actual_N71).toHaveLength(expected_N71.length);
        // white bishop
        const actual_B72 = computeLegalMoves(boardInit, status, 'B', { row: 7, col: 2 });
        expect(actual_B72).toHaveLength(0);
        // white queen
        const actual_Q73 = computeLegalMoves(boardInit, status, 'Q', { row: 7, col: 3 });
        expect(actual_Q73).toHaveLength(0);
        // white king
        const actual_K74 = computeLegalMoves(boardInit, status, 'K', { row: 7, col: 4 });
        expect(actual_K74).toHaveLength(0);
        // white bishop
        const actual_B75 = computeLegalMoves(boardInit, status, 'B', { row: 7, col: 5 });
        expect(actual_B75).toHaveLength(0);
        // white knight
        const actual_N76 = computeLegalMoves(boardInit, status, 'N', { row: 7, col: 6 });
        const expected_N76 = [{ row: 5, col: 5 }, { row: 5, col: 7 }];
        expect(actual_N76).toEqual(expect.arrayContaining(expected_N76));
        expect(actual_N76).toHaveLength(expected_N76.length);
        // white rook
        const actual_R77 = computeLegalMoves(boardInit, status, 'R', { row: 7, col: 7 });
        expect(actual_R77).toHaveLength(0);
    });
    it("random early game 1", () => {});
    it("random early game 2", () => {});
    it("random early game 3", () => {});
    it("random early game 4", () => {});
    it("random early game 5", () => {});
    it("random early game 6", () => {});
});
