import { movePiece } from "../util/game/GameHelper.js";

// initialise chess board data
const boardInit = "rnbqkbnrppppppppxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxPPPPPPPPRNBQKBNR";
const boardEarly1 = "rnbqkxnrpppxxxppxxxbxpxxxxxpNxxxxxPPpxxxxxxxPxxxPPxxxPPPRNBQKBxR";
const boardEarly2 = "rnbqkxxrppppxpppxxxxxxxxxxbxPxxxxxxxnpxxxxNxxxxxPPPPxxPPRxBQKBNR";
const boardEarly3 = "rxbqkxxrpppnppbpxxxpxxpnxxxxxxNxxxBxPxxxxxxxxxxxPPPPxPPPRNBQKxxR";
const boardMid1 = "rxxxxrkxppxqxpppxxnxpxxxxxxnxxxbxxNPxxxxxxxxxNxPPPxQBPPxRxxRxxKx";
const boardMid2 = "rxbxxrkxbppxxxpppxxpxnxxxxxxxxxqxxxnPpxxxPxxxxxPPBQNRPPNRxxxxBxK";
const boardMid3 = "xxxrxxkxpxRbqrbpxpxxxxpxxxxQPpxxxxxxxxxxxxxxxNxxPxxxxPPPxxxRxxKx";
const boardEnd1 = "xxxxxxxxxxxxxxxxxxxxkpxpxxKxpxpxxxxxPxPxxxxxxPxPxxxxxxxxxxxxxxxx";
const boardEnd2 = "xxxxxxxxxxxxxxxxxxxxkxxppxpxpxxxPxPxKpPxxxxxxxxxxxxxxPxxxxxxxxxx";
const boardEnd3 = "xxxxxxxxxxxxxxxxxxpxxxxxxpxpxxxppxxPxxxxPxPxxxPkxPxxxKxxxxxxxxxx";

describe("GameHelper.movePiece()", () => {
    it("initial chess board", () => {
        const actualBoardInit = movePiece(boardInit, 2, 3, 5, 6);
        expect(actualBoardInit).toEqual(boardInit);
    });
    it("random early game 1", () => {
        const actualBoardEarly1 = movePiece(boardEarly1, 4, 2, 3, 3);
        const expectedBoardEarly1 = "rnbqkxnrpppxxxppxxxbxpxxxxxPNxxxxxxPpxxxxxxxPxxxPPxxxPPPRNBQKBxR";
        expect(actualBoardEarly1).toEqual(expectedBoardEarly1);
    });
    it("random early game 2", () => {
        const actualBoardEarly2 = movePiece(boardEarly2, 5, 2, 4, 4);
        const expectedBoardEarly2 = "rnbqkxxrppppxpppxxxxxxxxxxbxPxxxxxxxNpxxxxxxxxxxPPPPxxPPRxBQKBNR";
        expect(actualBoardEarly2).toEqual(expectedBoardEarly2);
    });
    it("random early game 3", () => {
        const actualBoardEarly3 = movePiece(movePiece(boardEarly3, 7, 4, 7, 6), 7, 7, 7, 5);
        const expectedBoardEarly3 = "rxbqkxxrpppnppbpxxxpxxpnxxxxxxNxxxBxPxxxxxxxxxxxPPPPxPPPRNBQxRKx";
        expect(actualBoardEarly3).toEqual(expectedBoardEarly3);
    });
    it("random mid game 1", () => {
        const actualBoardMid1 = movePiece(boardMid1, 6, 3, 3, 6);
        const expectedBoardMid1 = "rxxxxrkxppxqxpppxxnxpxxxxxxnxxQbxxNPxxxxxxxxxNxPPPxxBPPxRxxRxxKx";
        expect(actualBoardMid1).toEqual(expectedBoardMid1);
    });
    it("random mid game 2", () => {
        const actualBoardMid2 = movePiece(boardMid2, 6, 2, 4, 2);
        const expectedBoardMid2 = "rxbxxrkxbppxxxpppxxpxnxxxxxxxxxqxxQnPpxxxPxxxxxPPBxNRPPNRxxxxBxK";
        expect(actualBoardMid2).toEqual(expectedBoardMid2);
    });
    it("random mid game 3", () => {
        const actualBoardMid3 = movePiece(boardMid3, 1, 3, 2, 2);
        const expectedBoardMid3 = "xxxrxxkxpxRxqrbpxpbxxxpxxxxQPpxxxxxxxxxxxxxxxNxxPxxxxPPPxxxRxxKx";
        expect(actualBoardMid3).toEqual(expectedBoardMid3);
    });
    it("random end game 1", () => {
        const actualBoardEnd1 = movePiece(boardEnd1, 3, 2, 2, 2);
        const expectedBoardEnd1 = "xxxxxxxxxxxxxxxxxxKxkpxpxxxxpxpxxxxxPxPxxxxxxPxPxxxxxxxxxxxxxxxx";
        expect(actualBoardEnd1).toEqual(expectedBoardEnd1);
    });
    it("random end game 2", () => {
        const actualBoardEnd2 = movePiece(boardEnd2, 6, 5, 5, 5);
        const expectedBoardEnd2 = "xxxxxxxxxxxxxxxxxxxxkxxppxpxpxxxPxPxKpPxxxxxxPxxxxxxxxxxxxxxxxxx";
        expect(actualBoardEnd2).toEqual(expectedBoardEnd2);
    });
    it("random end game 3", () => {
        const actualBoardEnd3 = movePiece(boardEnd3, 6, 5, 5, 5);
        const expectedBoardEnd3 = "xxxxxxxxxxxxxxxxxxpxxxxxxpxpxxxppxxPxxxxPxPxxKPkxPxxxxxxxxxxxxxx";
        expect(actualBoardEnd3).toEqual(expectedBoardEnd3);
    });
});

