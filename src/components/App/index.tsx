import React, { useEffect } from "react";
import { GameWrapper } from "../context/GameContext";
import GameBoard from "../GameBoard";
import Menu from "../Menu";
import Navbar from "../Navbar";

import "./App.scss";


const App: React.FC = () => {

    return (
        <div className="App">
            <GameWrapper>
            <Navbar/>
            <h1 className='Title'>Minesweeper</h1>
           
             <GameBoard/>
             <Menu/>
             </GameWrapper>
        </div>
    )
}

export default App