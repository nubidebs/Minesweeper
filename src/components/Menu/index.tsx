import React from "react";
import { useGameContext } from "../context/GameContext";

import "./Menu.scss";

const Menu: React.FC = () => {
    const {isMenuVisible}= useGameContext()!

    return (
        <div>
            {isMenuVisible &&
             <div className="Menu">
                 <p>NOT IN USE</p>
                            <form>
                <div className="radio">
                    <input type="radio" name="level" value="beginner" />
                  <label>
                    Option 1
                  </label>
                </div>
                <div className="radio">
                    <input type="radio" name="level" value="intermediate" checked/>
                  <label>
                    Option 2
                  </label>
                </div>
                <div className="radio">
                    <input type="radio" name="level" value="advanced" />
                  <label>
                    Option 3
                  </label>
                </div>
              </form>
               </div>}
            </div>
    )
}

export default Menu