import assert from "assert";

import { isWhiteInCheck } from "../util/game/GameHelper.js";

const getWhiteKingPosition = (board) => {
    const kingIndex = board.indexOf("K");
    return {
        whiteKingPosition: {
            row: Math.trunc(kingIndex / 8),
            col: kingIndex % 8
        }
    };
};

// initialise chess board data
const boardWhiteInCheck1 = "xxkxxxrbpppxnpxxxxxxxqxxxxxpxxxxxxxxxxbxNPPnPxxxPxxPNPPPRxxQKBxR";
const boardWhiteInCheck2 = "xxxxxxxxRxxxxQbkxxxpxxxpxxpxxpxxxxBxxxqPxxxxxxxKxxxxxBxPxxxxxxxx";
const boardWhiteInCheck3 = "xxxxxrxkpQxxRxppxxxxxxpxxxxxxxxxxxxxPPxxxxxxxxxxPxxBxxPPxxxxxqxK";
const boardWhiteInCheck4 = "xkxrxxxrxppxbxxxxpxxpxxxxPxxPnppxxPxxxKxxxNPxBxPRxxNxPxxxxRxxxxx";
const boardWhiteInCheck5 = "xxQxrxkxxpxxxppppxxxxxxxxxxpxxxxxPxNxxnxPxxxnxxxxBxxxPBqxxRxRxKx";
const boardWhiteInCheck6 = "xxxxxxkxppxxxppxxxxBpxxxxxxpPbPQxxxxxPxxPxxxxNxxxPqxxxxxxxKxxxxR";
const boardWhiteNotInCheck1 = "xxxxxxxxRxxxxQbkxxxpxxxpxxpxxpxxxxBxqxrxxxxxxxPKxxxxxBxPxxxxxxxx";
const boardWhiteNotInCheck2 = "xxxrxrxkpQxxRxppxxxxxxpxxxxxxxxxxxxxPPxxxxxxBRxxPxxxqxPPxxxxxxxK";
const boardWhiteNotInCheck3 = "xxxrxxxxxRxxxxxRxxxxpxxxpxkxpxxPxxrxBxxxPxxxPPxxxPPxnBxxxKxxxxxx";
const boardWhiteNotInCheck4 = "xkxrxxxrxppxbxpxxpxxpxxpxPxxPnxxxxPxxKxxxxNPxBxPRxxNxPxxxxRxxxxx";
const boardWhiteNotInCheck5 = "xbQxrxkxxpxxxppppxxxxxxxxxxpxxxqxPxNxxnxPxxxnNxxxBxxxPBxxxRxRxKx";
const boardWhiteNotInCheck6 = "xxxxkxxxxpxxxxxxxxxxxxxBxpxpxxxPxxxPxPxxxxnxPxxxxxxxxxPxxxxxxKxx";

describe("GameHelper.isWhiteInCheck()", () => {
    it("white in check scenarios", () => {
        assert.strictEqual(isWhiteInCheck(boardWhiteInCheck1, getWhiteKingPosition(boardWhiteInCheck1)), true);
        assert.strictEqual(isWhiteInCheck(boardWhiteInCheck2, getWhiteKingPosition(boardWhiteInCheck2)), true);
        assert.strictEqual(isWhiteInCheck(boardWhiteInCheck3, getWhiteKingPosition(boardWhiteInCheck3)), true);
        assert.strictEqual(isWhiteInCheck(boardWhiteInCheck4, getWhiteKingPosition(boardWhiteInCheck4)), true);
        assert.strictEqual(isWhiteInCheck(boardWhiteInCheck5, getWhiteKingPosition(boardWhiteInCheck5)), true);
        assert.strictEqual(isWhiteInCheck(boardWhiteInCheck6, getWhiteKingPosition(boardWhiteInCheck6)), true);
    });
    it("white not in check scenarios", () => {
        assert.strictEqual(isWhiteInCheck(boardWhiteNotInCheck1, getWhiteKingPosition(boardWhiteNotInCheck1)), false);
        assert.strictEqual(isWhiteInCheck(boardWhiteNotInCheck2, getWhiteKingPosition(boardWhiteNotInCheck2)), false);
        assert.strictEqual(isWhiteInCheck(boardWhiteNotInCheck3, getWhiteKingPosition(boardWhiteNotInCheck3)), false);
        assert.strictEqual(isWhiteInCheck(boardWhiteNotInCheck4, getWhiteKingPosition(boardWhiteNotInCheck4)), false);
        assert.strictEqual(isWhiteInCheck(boardWhiteNotInCheck5, getWhiteKingPosition(boardWhiteNotInCheck5)), false);
        assert.strictEqual(isWhiteInCheck(boardWhiteNotInCheck6, getWhiteKingPosition(boardWhiteNotInCheck6)), false);
    });
});
