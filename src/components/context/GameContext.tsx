import React, { createContext, useState, useContext } from "react";
import {GameContextType, Props} from "../../types"


const GameContext = createContext<GameContextType | undefined >(undefined)


export const GameWrapper =({ children }: Props) =>{
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [level, setLevel] = useState("beginner")
 

  return (
    <GameContext.Provider value={{isMenuVisible, setIsMenuVisible, level, setLevel}}>
      {children}
    </GameContext.Provider>
  );
}

//Creating a custom hook for consuming the context
export const useGameContext = () => useContext(GameContext);
