 import React from "react";
import { SetUpGame } from "../../hooks/setUpGame";
// import Button from "../Button";
 import NumberDisplay from "../NumberDisplay";
// import {generateCells, openMultipleCells} from "../../utils";
// import {Cell, CellState, CellValue, Face} from '../../types';

import "./App.scss";
// import { MAX_ROWS, MAX_COLS } from "../../constants";

const App: React.FC = () => {

  const {  bombCounter,
    handleFaceClick,
    face,
    time,
    renderCells} = SetUpGame()


    return (
        <div className="App">
             <div className="Header">
                 {/* number of bombs display */}
                 <NumberDisplay value={bombCounter}/>

                  {/* Face button */}
                 <div className='face' onClick={handleFaceClick}><span role="img" aria-label='face'>{face}</span></div>

                 {/* timer display*/}
                 <NumberDisplay value={time}/>
                 </div>

             <div className="Body">
                  {/* matrix */}
                 {renderCells()}
             </div>
        </div>
    )
}

export default App