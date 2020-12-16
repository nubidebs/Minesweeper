import { ReactNode } from "react";

export enum CellValue {
    none, //empty
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    bomb // contains bomb
  }

  export enum CellState {
    open, // content cell not revealed
    visible, // content cell revealed
    flagged // added flag
  }
  
  export type Cell = { value: CellValue; state: CellState; red?: boolean };
  
  export enum Face {
    smile = "🤓", 
    oh = "😮",
    lost = "😵",
    won = "😎"
  }


   // ==> Context Types <== //
  export type GameContextType = {
    isMenuVisible: boolean;
    setIsMenuVisible: (value: boolean) => void;
    level: string;
    setLevel: (value: string) => void;
  };

  export 
  type Props = {
    children: ReactNode
  }
  