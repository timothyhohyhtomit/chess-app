import assert from "assert";

import { isBlackInCheck } from "../util/game/GameHelper.js";

const getBlackKingPosition = (board) => {
    const kingIndex = board.indexOf("k");
    return {
        blackKingPosition: {
            row: Math.trunc(kingIndex / 8),
            col: kingIndex % 8
        }
    };
};

// initialise chess board data
const boardBlackInCheck1 = "xxxxxxxrxxxxxRxpxxxxxRxkpxxxxxxxxpxxxxPPqxxxxxxxxxxxxxKxxxxxxxxx";
const boardBlackInCheck2 = "xxxxxxxxNxpxxxxxpxxxxrxxxxkxxxrxNxxRpxxxPxxxPxxPKPxxxqxxxxxxxxxx";
const boardBlackInCheck3 = "xxxxnxxxxbpkxNxxxpxxQxppxPxxxxxxxxxxxNPPxxpxxxxxRrqxxnxxxxxrxBKx";
const boardBlackInCheck4 = "xxxxxxxxxxxxQxkxxxxpxpxxxxpxxxxxxpxxxxxxpxxxxxxxxxxxxxxxKxxxxxxx";
const boardBlackInCheck5 = "xxrxxxxrkppNxpxxxxxxxbpqxxxxxxxxxxxxPPxxxPxxxxPxxPPxxxxPRxxxxxKx";
const boardBlackInCheck6 = "rnxkQbnrppqxxpppxxxxxNxxxxpbxxxxxxxxxxxxxxxxxNxxPPPPxxPPRxBxKxxR";
const boardBlackNotInCheck1 = "xxxxxxxxNxpxxxxxpxxxxrxxxxkxxxrxxxxRpxxxPxNxPxxPKPxxxqxxxxxxxxxx";
const boardBlackNotInCheck2 = "xxxxnxxxxbpxxpxxxpxxxkppxPxxxxNxxxxRxBPPQxpxxxxxRrqxxnNxxxxrxBKx";
const boardBlackNotInCheck3 = "xxxxxxkqxxxxpxxxxxxpPpxQxxpPxxxxxpPxxxxxxPxxxxxxPxxxxxxxKxxxxxxx";
const boardBlackNotInCheck4 = "xxrxxxkxxxxnxxpxxxxxxpNxppxpxxxpxxxPxxxPbPxxNPxbPxxxxBxxxKxRxxxx";
const boardBlackNotInCheck5 = "xkrxxxxrpppxxpxxxxxxxbpqxxxxNxxxxxxxPPxxxbxxxxPxPPPxxQxPRxxxxxKx";
const boardBlackNotInCheck6 = "rnxxkbnrppqxxpppxxxxxxxxxxpbxxxxxxxxNxxxxxxxxNxxPPPPQxPPRxBxKxxR";

describe("GameHelper.isBlackInCheck()", () => {
    it("black in check scenarios", () => {
        assert.strictEqual(isBlackInCheck(boardBlackInCheck1, getBlackKingPosition(boardBlackInCheck1)), true);
        assert.strictEqual(isBlackInCheck(boardBlackInCheck2, getBlackKingPosition(boardBlackInCheck2)), true);
        assert.strictEqual(isBlackInCheck(boardBlackInCheck3, getBlackKingPosition(boardBlackInCheck3)), true);
        assert.strictEqual(isBlackInCheck(boardBlackInCheck4, getBlackKingPosition(boardBlackInCheck4)), true);
        assert.strictEqual(isBlackInCheck(boardBlackInCheck5, getBlackKingPosition(boardBlackInCheck5)), true);
        assert.strictEqual(isBlackInCheck(boardBlackInCheck6, getBlackKingPosition(boardBlackInCheck6)), true);
    });
    it("black not in check scenarios", () => {
        assert.strictEqual(isBlackInCheck(boardBlackNotInCheck1, getBlackKingPosition(boardBlackNotInCheck1)), false);
        assert.strictEqual(isBlackInCheck(boardBlackNotInCheck2, getBlackKingPosition(boardBlackNotInCheck2)), false);
        assert.strictEqual(isBlackInCheck(boardBlackNotInCheck3, getBlackKingPosition(boardBlackNotInCheck3)), false);
        assert.strictEqual(isBlackInCheck(boardBlackNotInCheck4, getBlackKingPosition(boardBlackNotInCheck4)), false);
        assert.strictEqual(isBlackInCheck(boardBlackNotInCheck5, getBlackKingPosition(boardBlackNotInCheck5)), false);
        assert.strictEqual(isBlackInCheck(boardBlackNotInCheck6, getBlackKingPosition(boardBlackNotInCheck6)), false);
    });
});
