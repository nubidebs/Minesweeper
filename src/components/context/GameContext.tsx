import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { isNullOrUndefined } from "util";

type GameContextType = {
  isMenuVisible: boolean;
  setIsMenuVisible: (value: boolean) => void;
};

const GameContext = createContext<GameContextType | undefined >(undefined)

type Props = {
  children: ReactNode
}

export const GameWrapper =({ children }: Props) =>{
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    console.log('yoooooo', isMenuVisible)
  }, []);

  //add levels here
  //async function for picking level

  return (
    <GameContext.Provider value={{isMenuVisible, setIsMenuVisible}}>
      {children}
    </GameContext.Provider>
  );
}

//Creating a custom hook for consuming the context
export const useGameContext = () => useContext(GameContext);
