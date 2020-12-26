import React from "react";
import { useGameContext } from "../context/GameContext";

import "./Menu.scss";

const Menu: React.FC = () => {
    const {isMenuVisible, level, setLevel}= useGameContext()!

   
    console.log(level)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

      setLevel((event.target as HTMLInputElement).value);
     
    };

    return (
        <div>
            {isMenuVisible &&
             <div className="Menu">
                            <form>
                <div className="radio">
                    <input type="radio" name="level" value="beginner" 
                   onChange={handleChange} />
                  <label>
                    Beginner
                  </label>
                </div>
                <div className="radio">
                    <input type="radio" name="level" value="intermediate" onChange={handleChange} />
                  <label>
                    Intermediate
                  </label>
                </div>
                {/* <div className="radio">
                    <input type="radio" name="level" value="advanced" onChange={handleChange} />
                  <label>
                    Advanced
                  </label>
                </div> */}
              </form>
               </div>}
            </div>
    )
}

export default Menu