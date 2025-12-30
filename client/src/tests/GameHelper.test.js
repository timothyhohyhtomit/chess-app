import assert from "assert";

import { boardToFEN, FENToBoard } from "../util/game/GameHelper.js";

// initialise chess board data
const boardInit = "rnbqkbnrppppppppxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxPPPPPPPPRNBQKBNR";
const fenInit = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const boardEmpty = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const fenEmpty = "8/8/8/8/8/8/8/8";
const boardEarly1 = "rnbqkxnrpppxxxppxxxbxpxxxxxpNxxxxxPPpxxxxxxxPxxxPPxxxPPPRNBQKBxR";
const fenEarly1 = "rnbqk1nr/ppp3pp/3b1p2/3pN3/2PPp3/4P3/PP3PPP/RNBQKB1R";
const boardEarly2 = "rnbqkxxrppppxpppxxxxxxxxxxbxPxxxxxxxnpxxxxNxxxxxPPPPxxPPRxBQKBNR";
const fenEarly2 = "rnbqk2r/pppp1ppp/8/2b1P3/4np2/2N5/PPPP2PP/R1BQKBNR";
const boardEarly3 = "rxbqkxxrpppnppbpxxxpxxpnxxxxxxNxxxBxPxxxxxxxxxxxPPPPxPPPRNBQKxxR";
const fenEarly3 = "r1bqk2r/pppnppbp/3p2pn/6N1/2B1P3/8/PPPP1PPP/RNBQK2R";
const boardEarly4 = "rnxqkbxrppxxxppxxxxxpnxpxxppxxBxxxxxxxbxxxPPxNxxPPxNPPPPRxxQKBxR";
const fenEarly4 = "rn1qkb1r/pp3pp1/4pn1p/2pp2B1/6b1/2PP1N2/PP1NPPPP/R2QKB1R";
const boardEarly5 = "rxbxkxxrpppxxpppxxnpxnxxxxbxpxxxxxxxPxxqxxxPxQxPPPPxBPPxRNBxKxNR";
const fenEarly5 = "r1b1k2r/ppp2ppp/2np1n2/2b1p3/4P2q/3P1Q1P/PPP1BPP1/RNB1K1NR";
const boardEarly6 = "rnxqkbxrppxxppppxxxxxxxxxxpnxbxxxxxxxxxxPxxxxNxxxPxPPPPPRNBQKBxR";
const fenEarly6 = "rn1qkb1r/pp2pppp/8/2pn1b2/8/P4N2/1P1PPPPP/RNBQKB1R";
const boardMid1 = "rxxxxrkxppxqxpppxxnxpxxxxxxnxxxbxxNPxxxxxxxxxNxPPPxQBPPxRxxRxxKx";
const fenMid1 = "r4rk1/pp1q1ppp/2n1p3/3n3b/2NP4/5N1P/PP1QBPP1/R2R2K1";
const boardMid2 = "rxbxxrkxbppxxxpppxxpxnxxxxxxxxxqxxxnPpxxxPxxxxxPPBQNRPPNRxxxxBxK";
const fenMid2 = "r1b2rk1/bpp3pp/p2p1n2/7q/3nPp2/1P5P/PBQNRPPN/R4B1K";
const boardMid3 = "xxxrxxkxpxRbqrbpxpxxxxpxxxxQPpxxxxxxxxxxxxxxxNxxPxxxxPPPxxxRxxKx";
const fenMid3 = "3r2k1/p1Rbqrbp/1p4p1/3QPp2/8/5N2/P4PPP/3R2K1";
const boardMid4 = "rxxxqxxkppxxxppBxxpxbxxxxxxpxxNxPbxPxxxxxxnxxxxxRxxxxPPPxxBQxxKx";
const fenMid4 = "r3q2k/pp3ppB/2p1b3/3p2N1/Pb1P4/2n5/R4PPP/2BQ2K1";
const boardMid5 = "xrxxxrkxpxpxqpppxxxpbnxxxxxxxxxxxxBNxxxxxQxxPxxxPPxxxPPPRxxxxRKx";
const fenMid5 = "1r3rk1/p1p1qppp/3pbn2/8/2BN4/1Q2P3/PP3PPP/R4RK1";
const boardMid6 = "rxxxkxxxppxqbppxxxxxxxxxxxxpxxxxxxxxxxPrxxxxxPnxPPxxQxxxRNBxRxKx";
const fenMid6 = "r3k3/pp1qbpp1/8/3p4/6Pr/5Pn1/PP2Q3/RNB1R1K1";
const boardEnd1 = "xxxxxxxxxxxxxxxxxxxxkpxpxxKxpxpxxxxxPxPxxxxxxPxPxxxxxxxxxxxxxxxx";
const fenEnd1 = "8/8/4kp1p/2K1p1p1/4P1P1/5P1P/8/8";
const boardEnd2 = "xxxxxxxxxxxxxxxxxxxxkxxppxpxpxxxPxPxKpPxxxxxxxxxxxxxxPxxxxxxxxxx";
const fenEnd2 = "8/8/4k2p/p1p1p3/P1P1KpP1/8/5P2/8";
const boardEnd3 = "xxxxxxxxxxxxxxxxxxpxxxxxxpxpxxxppxxPxxxxPxPxxxPkxPxxxKxxxxxxxxxx";
const fenEnd3 = "8/8/2p5/1p1p3p/p2P4/P1P3Pk/1P3K2/8";
const boardEnd4 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxkxxxxxxxpxpxxxxxxxPxxxxKxPxxxxxxxxx";
const fenEnd4 = "8/8/8/5k2/5p1p/7P/4K1P1/8";
const boardEnd5 = "xxxxxxxxpxxxxxxxxpxxkxxxxxxxPpxxPPxKxxxpxxxxxxxPxxxxxxxxxxxxxxxx";
const fenEnd5 = "8/p7/1p2k3/4Pp2/PP1K3p/7P/8/8";
const boardEnd6 = "xxxxxxxxxxxxxxxxxxxxxkxxpxpxpxxpPpxpPxxPxPxxxxPxxxPxKxxxxxxxxxxx";
const fenEnd6 = "8/8/5k2/p1p1p2p/Pp1pP2P/1P4P1/2P1K3/8";

describe("GameHelper", () => {
    describe("boardToFEN()", () => {
        beforeAll(() => {
        });
        it("initial chess board", () => {
            assert.strictEqual(boardToFEN(boardInit), fenInit);
        });
        it("empty board", () => {
            assert.strictEqual(boardToFEN(boardEmpty), fenEmpty);
        });
        it("random early games", () => {
            assert.strictEqual(boardToFEN(boardEarly1), fenEarly1);
            assert.strictEqual(boardToFEN(boardEarly2), fenEarly2);
            assert.strictEqual(boardToFEN(boardEarly3), fenEarly3);
            assert.strictEqual(boardToFEN(boardEarly4), fenEarly4);
            assert.strictEqual(boardToFEN(boardEarly5), fenEarly5);
            assert.strictEqual(boardToFEN(boardEarly6), fenEarly6);

        });
        it("random mid games", () => {
            assert.strictEqual(boardToFEN(boardMid1), fenMid1);
            assert.strictEqual(boardToFEN(boardMid2), fenMid2);
            assert.strictEqual(boardToFEN(boardMid3), fenMid3);
            assert.strictEqual(boardToFEN(boardMid4), fenMid4);
            assert.strictEqual(boardToFEN(boardMid5), fenMid5);
            assert.strictEqual(boardToFEN(boardMid6), fenMid6);
        });
        it("random end games", () => {
            assert.strictEqual(boardToFEN(boardEnd1), fenEnd1);
            assert.strictEqual(boardToFEN(boardEnd2), fenEnd2);
            assert.strictEqual(boardToFEN(boardEnd3), fenEnd3);
            assert.strictEqual(boardToFEN(boardEnd4), fenEnd4);
            assert.strictEqual(boardToFEN(boardEnd5), fenEnd5);
            assert.strictEqual(boardToFEN(boardEnd6), fenEnd6);
        });
    });
    describe("FENToBoard()", () => {
        it("initial chess board", () => {
            assert.strictEqual(FENToBoard(fenInit), boardInit);
        });
        it("empty board", () => {
            assert.strictEqual(FENToBoard(fenEmpty), boardEmpty);
        });
        it("random early games", () => {
            assert.strictEqual(FENToBoard(fenEarly1), boardEarly1);
            assert.strictEqual(FENToBoard(fenEarly2), boardEarly2);
            assert.strictEqual(FENToBoard(fenEarly3), boardEarly3);
            assert.strictEqual(FENToBoard(fenEarly4), boardEarly4);
            assert.strictEqual(FENToBoard(fenEarly5), boardEarly5);
            assert.strictEqual(FENToBoard(fenEarly6), boardEarly6);
        });
        it("random mid games", () => {
            assert.strictEqual(FENToBoard(fenMid1), boardMid1);
            assert.strictEqual(FENToBoard(fenMid2), boardMid2);
            assert.strictEqual(FENToBoard(fenMid3), boardMid3);
            assert.strictEqual(FENToBoard(fenMid4), boardMid4);
            assert.strictEqual(FENToBoard(fenMid5), boardMid5);
            assert.strictEqual(FENToBoard(fenMid6), boardMid6);
        });
        it("random end games", () => {
            assert.strictEqual(FENToBoard(fenEnd1), boardEnd1);
            assert.strictEqual(FENToBoard(fenEnd2), boardEnd2);
            assert.strictEqual(FENToBoard(fenEnd3), boardEnd3);
            assert.strictEqual(FENToBoard(fenEnd4), boardEnd4);
            assert.strictEqual(FENToBoard(fenEnd5), boardEnd5);
            assert.strictEqual(FENToBoard(fenEnd6), boardEnd6);
        });
    });
});