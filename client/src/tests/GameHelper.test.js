import assert from "assert";

import { boardToFEN } from "../util/game/GameHelper.js";

describe("GameHelper", () => {
    describe("boardToFEN", () => {
        it("initial chess board", () => {
            const board1 = "rnbqkbnrppppppppxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxPPPPPPPPRNBQKBNR";
            const fen1 = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
            assert.strictEqual(boardToFEN(board1), fen1);
        });
        it("empty board", () => {
            const board2 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            const fen2 = "8/8/8/8/8/8/8/8";
            assert.strictEqual(boardToFEN(board2), fen2);
        });
        it("random early games", () => {
            const boardEnd1 = "rnbqkxnrpppxxxppxxxbxpxxxxxpNxxxxxPPpxxxxxxxPxxxPPxxxPPPRNBQKBxR";
            const fenEnd1 = "rnbqk1nr/ppp3pp/3b1p2/3pN3/2PPp3/4P3/PP3PPP/RNBQKB1R";
            assert.strictEqual(boardToFEN(boardEnd1), fenEnd1);
            const boardEnd2 = "rnbqkxxrppppxpppxxxxxxxxxxbxPxxxxxxxnpxxxxNxxxxxPPPPxxPPRxBQKBNR";
            const fenEnd2 = "rnbqk2r/pppp1ppp/8/2b1P3/4np2/2N5/PPPP2PP/R1BQKBNR";
            assert.strictEqual(boardToFEN(boardEnd2), fenEnd2);
            const boardEnd3 = "rxbqkxxrpppnppbpxxxpxxpnxxxxxxNxxxBxPxxxxxxxxxxxPPPPxPPPRNBQKxxR";
            const fenEnd3 = "r1bqk2r/pppnppbp/3p2pn/6N1/2B1P3/8/PPPP1PPP/RNBQK2R";
            assert.strictEqual(boardToFEN(boardEnd3), fenEnd3);
            const boardEnd4 = "rnxqkbxrppxxxppxxxxxpnxpxxppxxBxxxxxxxbxxxPPxNxxPPxNPPPPRxxQKBxR";
            const fenEnd4 = "rn1qkb1r/pp3pp1/4pn1p/2pp2B1/6b1/2PP1N2/PP1NPPPP/R2QKB1R";
            assert.strictEqual(boardToFEN(boardEnd4), fenEnd4);
            const boardEnd5 = "rxbxkxxrpppxxpppxxnpxnxxxxbxpxxxxxxxPxxqxxxPxQxPPPPxBPPxRNBxKxNR";
            const fenEnd5 = "r1b1k2r/ppp2ppp/2np1n2/2b1p3/4P2q/3P1Q1P/PPP1BPP1/RNB1K1NR";
            assert.strictEqual(boardToFEN(boardEnd5), fenEnd5);
            const boardEnd6 = "rnxqkbxrppxxppppxxxxxxxxxxpnxbxxxxxxxxxxPxxxxNxxxPxPPPPPRNBQKBxR";
            const fenEnd6 = "rn1qkb1r/pp2pppp/8/2pn1b2/8/P4N2/1P1PPPPP/RNBQKB1R";
            assert.strictEqual(boardToFEN(boardEnd6), fenEnd6);
        });
        it("random mid games", () => {
            const boardMid1 = "rxxxxrkxppxqxpppxxnxpxxxxxxnxxxbxxNPxxxxxxxxxNxPPPxQBPPxRxxRxxKx";
            const fenMid1 = "r4rk1/pp1q1ppp/2n1p3/3n3b/2NP4/5N1P/PP1QBPP1/R2R2K1";
            assert.strictEqual(boardToFEN(boardMid1), fenMid1);
            const boardMid2 = "rxbxxrkxbppxxxpppxxpxnxxxxxxxxxqxxxnPpxxxPxxxxxPPBQNRPPNRxxxxBxK";
            const fenMid2 = "r1b2rk1/bpp3pp/p2p1n2/7q/3nPp2/1P5P/PBQNRPPN/R4B1K";
            assert.strictEqual(boardToFEN(boardMid2), fenMid2);
            const boardMid3 = "xxxrxxkxpxRbqrbpxpxxxxpxxxxQPpxxxxxxxxxxxxxxxNxxPxxxxPPPxxxRxxKx";
            const fenMid3 = "3r2k1/p1Rbqrbp/1p4p1/3QPp2/8/5N2/P4PPP/3R2K1";
            assert.strictEqual(boardToFEN(boardMid3), fenMid3);
            const boardMid4 = "rxxxqxxkppxxxppBxxpxbxxxxxxpxxNxPbxPxxxxxxnxxxxxRxxxxPPPxxBQxxKx";
            const fenMid4 = "r3q2k/pp3ppB/2p1b3/3p2N1/Pb1P4/2n5/R4PPP/2BQ2K1";
            assert.strictEqual(boardToFEN(boardMid4), fenMid4);
            const boardMid5 = "xrxxxrkxpxpxqpppxxxpbnxxxxxxxxxxxxBNxxxxxQxxPxxxPPxxxPPPRxxxxRKx";
            const fenMid5 = "1r3rk1/p1p1qppp/3pbn2/8/2BN4/1Q2P3/PP3PPP/R4RK1";
            assert.strictEqual(boardToFEN(boardMid5), fenMid5);
            const boardMid6 = "rxxxkxxxppxqbppxxxxxxxxxxxxpxxxxxxxxxxPrxxxxxPnxPPxxQxxxRNBxRxKx";
            const fenMid6 = "r3k3/pp1qbpp1/8/3p4/6Pr/5Pn1/PP2Q3/RNB1R1K1";
            assert.strictEqual(boardToFEN(boardMid6), fenMid6);
        });
        it("random end games", () => {
            const boardEarly1 = "xxxxxxxxxxxxxxxxxxxxkpxpxxKxpxpxxxxxPxPxxxxxxPxPxxxxxxxxxxxxxxxx";
            const fenEarly1 = "8/8/4kp1p/2K1p1p1/4P1P1/5P1P/8/8";
            assert.strictEqual(boardToFEN(boardEarly1), fenEarly1);
            const boardEarly2 = "xxxxxxxxxxxxxxxxxxxxkxxppxpxpxxxPxPxKpPxxxxxxxxxxxxxxPxxxxxxxxxx";
            const fenEarly2 = "8/8/4k2p/p1p1p3/P1P1KpP1/8/5P2/8";
            assert.strictEqual(boardToFEN(boardEarly2), fenEarly2);
            const boardEarly3 = "xxxxxxxxxxxxxxxxxxpxxxxxxpxpxxxppxxPxxxxPxPxxxPkxPxxxKxxxxxxxxxx";
            const fenEarly3 = "8/8/2p5/1p1p3p/p2P4/P1P3Pk/1P3K2/8";
            assert.strictEqual(boardToFEN(boardEarly3), fenEarly3);
            const boardEarly4 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxkxxxxxxxpxpxxxxxxxPxxxxKxPxxxxxxxxx";
            const fenEarly4 = "8/8/8/5k2/5p1p/7P/4K1P1/8";
            assert.strictEqual(boardToFEN(boardEarly4), fenEarly4);
            const boardEarly5 = "xxxxxxxxpxxxxxxxxpxxkxxxxxxxPpxxPPxKxxxpxxxxxxxPxxxxxxxxxxxxxxxx";
            const fenEarly5 = "8/p7/1p2k3/4Pp2/PP1K3p/7P/8/8";
            assert.strictEqual(boardToFEN(boardEarly5), fenEarly5);
            const boardEarly6 = "xxxxxxxxxxxxxxxxxxxxxkxxpxpxpxxpPpxpPxxPxPxxxxPxxxPxKxxxxxxxxxxx";
            const fenEarly6 = "8/8/5k2/p1p1p2p/Pp1pP2P/1P4P1/2P1K3/8";
            assert.strictEqual(boardToFEN(boardEarly6), fenEarly6);
        });
    });
});