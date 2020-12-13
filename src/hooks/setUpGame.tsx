import React, {useState, useEffect} from "react";
import Button from "../components/Button";
import {generateCells, openMultipleCells} from "../utils";
import {Cell, CellState, CellValue, Face} from '../types';

import { MAX_ROWS, MAX_COLS, NO_OF_BOMBS } from "../constants";


export const SetUpGame = ()=> {
const [cells, setCells] = useState<Cell[][]>(generateCells());
const [face, setFace] = useState<Face>(Face.smile);
const [time, setTime] = useState<number>(0);
const [live, setLive] = useState<boolean>(false);
const [bombCounter, setBombCounter] = useState<number>(NO_OF_BOMBS);
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

  // useEffects to check the status of the game, timer, has win and has lost
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

  useEffect(() => {
    if (hasLost) {
      setLive(false);
      setFace(Face.lost);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setLive(false);
      setFace(Face.won);
    }
  }, [hasWon]);


  const handleClick = (rowParam: number, colParam: number) =>(): void =>{
    let newCells = cells.slice();
    //start game
    if (!live){
        setLive(true)
    }

    const currentCell = newCells[rowParam][colParam];

    // 1. if a flagged cell or already revealed cell is clicked -> do nothing
    if ([CellState.flagged, CellState.visible].includes(currentCell.state) || hasLost ) {
      return;
    }


    // 2. if cell with  bomb is clicked -> game over
    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;

    // 3. if empty is clicked -> reveal all empty cells
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
    
    // 4. if a number is clicked -> reveal the number
      newCells[rowParam][colParam].state = CellState.visible;
    }

    // Check if you have won (no more open empty/number cells to click)
    let safeOpenCellsExist = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = newCells[row][col];

        if (
          currentCell.value !== CellValue.bomb &&
          currentCell.state === CellState.open
        ) {
          safeOpenCellsExist = true;
          break;
        }
      }
    }

    if (!safeOpenCellsExist) {
      // fill up all the left cells with flag to show victory
      newCells = newCells.map(row =>
        row.map(cell => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }

    setCells(newCells);
  };

  
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
            currentCells[rowParam][colParam].state = CellState.flagged;
            setCells(currentCells);
            setBombCounter(bombCounter - 1);
        }
        return

    // 3. if cell is flagged, the flag is removed
    } else if (currentCell.state === CellState.flagged) {
        if (bombCounter < NO_OF_BOMBS){
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
    setBombCounter(NO_OF_BOMBS)
    setCells(generateCells());
    setHasLost(false);
    setHasWon(false);
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
    red={cell.red}
/>))
}

  // Show all bombs on game over mapping through cells in matrix
const showAllBombs = (): Cell[][] => {
  const currentCells = cells.slice();
  return currentCells.map(row =>
    row.map(cell => {
      if (cell.value === CellValue.bomb) {
        return {
          ...cell,
          state: CellState.visible
        };
      }

      return cell;
    })
  );
}

return {
    bombCounter,
    handleFaceClick,
    face,
    time,
    renderCells,
}
}