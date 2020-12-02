import React, {useState} from "react";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";
import {generateCells} from "../../utils";
import "./App.scss";

const App: React.FC = () => {
const [cells, setCells] = useState(generateCells());

console.log('cells', cells)
const renderCells = (): React.ReactNode => {
return cells.map((row, rowIndex) => row.map((cell, colIndex)=>   <Button
col={colIndex}
key={`${rowIndex}-${colIndex}`}
row={rowIndex}
state={cell.state}
value={cell.value}
/>))
}
    return (
        <div className="App">
             <div className="Header">
                 <NumberDisplay value={0}/>
                 <div className='face'><span role="img" aria-label='face'>🤓</span></div>
                 <NumberDisplay value={23}/>
                 </div>
             <div className="Body">
                 {renderCells()}
             </div>
        </div>
    )
}

export default App