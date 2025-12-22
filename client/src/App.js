import React from 'react';

import GameBoard from "./util/gameboard/GameBoard.js";

import './App.css';

function App() {
    return (
        <div className="App">
            <GameBoard
                board="RNBQKBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbqkbnr"
                state=""
            />
        </div>
    );
}

export default App;
