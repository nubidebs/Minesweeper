import React from "react";
import GameBoard from "../GameBoard";
import Navbar from "../Navbar";

import "./App.scss";


const App: React.FC = () => {

    return (
        <div className="App">
            <Navbar/>
             <GameBoard/>
        </div>
    )
}

export default App