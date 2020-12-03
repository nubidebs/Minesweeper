import React, {useState, useEffect} from "react";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";
import {generateCells} from "../../utils";
import {Cell, CellState, CellValue, Face} from '../../types';

import "./App.scss";

const App: React.FC = () => {
const [cells, setCells] = useState<Cell[][]>(generateCells());
const [face, setFace] = useState<Face>(Face.smile);
const [time, setTime] = useState<number>(0);
const [live, setLive] = useState<boolean>(false);
const [bombCounter, setBombCounter] = useState<number>(10);
const [hasLost, setHasLost] = useState<boolean>(false);
const [hasWon, setHasWon] = useState<boolean>(false);

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
    let newCells = cells.slice();
    
    //start game
    if (!live){
        setLive(true)
    }


    const currentCell = newCells[rowParam][colParam];

    // 1. if a flagged cell or already revealed cell is clicked -> do nothing
    if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
      return;
    }

    // 2. if cell with  bomb is clicked -> game over
    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      //newCells = showAllBombs();
      setCells(newCells);
      return;

    // 3. if empty is clicked -> reveal all empty cells
    } else if (currentCell.value === CellValue.none) {
      //newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
    
    // 4. if a number is clicked -> reveal the number
      newCells[rowParam][colParam].state = CellState.visible;
    }
  }

  





  
  
// handle RIGHT CLICK -> set flags 🚩 
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

    

    // 1. if content cell revealed, do nothing
    if (currentCell.state === CellState.visible) {
        return;

    // 2. if content cell still hidden, add a flag
    } else if (currentCell.state === CellState.open) {

        if (bombCounter > 0){
            setBombCounter(bombCounter - 1);
            currentCells[rowParam][colParam].state = CellState.flagged;
            setCells(currentCells);
            setBombCounter(bombCounter - 1);
        }
        return

    // 3. if cell is flagged, the flag is removed
    } else if (currentCell.state === CellState.flagged) {
        if (bombCounter < 10){
            currentCells[rowParam][colParam].state = CellState.open;
            setCells(currentCells);
            setBombCounter(bombCounter + 1);
        }
        return
        
      }
}

  // Reset Game -> 🤓
  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells());
    // setHasLost(false);
    // setHasWon(false);
  };

  // Create matrix
const renderCells = (): React.ReactNode => {
return cells.map((row, rowIndex) => row.map((cell, colIndex)=> <Button
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