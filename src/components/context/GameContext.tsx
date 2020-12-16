import React, { createContext, useState, useContext, useEffect } from "react";
import {GameContextType, Props} from "../../types"


const GameContext = createContext<GameContextType | undefined >(undefined)


export const GameWrapper =({ children }: Props) =>{
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [level, setLevel] = useState('intermediate')

  useEffect(() => {
    console.log('yoooooo', isMenuVisible)
  }, []);

  //add levels here
  //async function for picking level

  return (
    <GameContext.Provider value={{isMenuVisible, setIsMenuVisible, level, setLevel}}>
      {children}
    </GameContext.Provider>
  );
}

//Creating a custom hook for consuming the context
export const useGameContext = () => useContext(GameContext);
