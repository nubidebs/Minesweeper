import React, {useState, useEffect} from "react";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";
import {generateCells} from "../../utils";
import {Cell, CellState, Face} from '../../types';

import "./App.scss";

const App: React.FC = () => {
const [cells, setCells] = useState<Cell[][]>(generateCells());
const [face, setFace] = useState<Face>(Face.smile);
const [time, setTime] = useState<number>(0);
const [live, setLive] = useState<boolean>(false);
const [bombCounter, setBombCounter] = useState<number>(10);

// Controls EventListeners 
useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.oh);
    };

    const handleMouseUp = (): void => {
      setFace(Face.smile);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // to avoid wasting memory I clean the eventListeners
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

    };
  }, []);


  // Set timer (start, increase)
  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const handleClick = (rowParam: number, colParam: number) =>(): void =>{

    //start game
    if (!live){
        setLive(true)
    }
  }

  // handle right click -> set flag if cell is not revealed (visible)
const handleCellContext = (
    rowParam: number,
    colParam: number
) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => { 
    e.preventDefault() //to stop the rightclick menu from opening 

    // if the game is not started it doesn't allow to put flags
    if (!live){
        return
    }
    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    // content cell revealed
    if (currentCell.state === CellState.visible) {
        return;
    // content cell still hidden
    } else if (currentCell.state === CellState.open) {

        if (bombCounter > 0){
            setBombCounter(bombCounter - 1);
            currentCells[rowParam][colParam].state = CellState.flagged;
            setCells(currentCells);
            setBombCounter(bombCounter - 1);
        }
        return
    // if cell is flagged
      } else if (currentCell.state === CellState.flagged) {
        if (bombCounter < 10){
            currentCells[rowParam][colParam].state = CellState.open;
            setCells(currentCells);
            setBombCounter(bombCounter + 1);
        }
        return
        
      }
}

  // Reset Game
  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells());
    // setHasLost(false);
    // setHasWon(false);
  };

const renderCells = (): React.ReactNode => {
return cells.map((row, rowIndex) => row.map((cell, colIndex)=>   <Button
    col={colIndex}
    key={`${rowIndex}-${colIndex}`}
    row={rowIndex}
    state={cell.state}
    value={cell.value}
    onClick={handleClick}
    onContext={handleCellContext}
/>))
}
    return (
        <div className="App">
             <div className="Header">
                 {/* number of bombs */}
                 <NumberDisplay value={bombCounter}/>
                 <div className='face' onClick={handleFaceClick}><span role="img" aria-label='face'>{face}</span></div>
                 {/* timer */}
                 <NumberDisplay value={time}/>
                 </div>
             <div className="Body">
                 {renderCells()}
             </div>
        </div>
    )
}

export default App