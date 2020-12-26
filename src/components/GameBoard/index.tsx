import React from "react";
import { SetUpGame } from "../../hooks/setUpGame";
import NumberDisplay from "../NumberDisplay";


import "./GameBoard.scss";


const GameBoard: React.FC = () => {

  const {  bombCounter,
    handleFaceClick,
    face,
    time,
    renderCells, classBody} = SetUpGame()


    return (
        <div className="GameBoard">
             <div className="Header">
                 {/* number of bombs display */}
                 <NumberDisplay value={bombCounter}/>

                  {/* Face button */}
                 <div className='face' onClick={handleFaceClick}><span role="img" aria-label='face'>{face}</span></div>

                 {/* timer display*/}
                 <NumberDisplay value={time}/>
                 </div>

             <div className={classBody}>
                  {/* matrix */}
                 {renderCells()}
             </div>
        </div>
    )
}

export default GameBoard