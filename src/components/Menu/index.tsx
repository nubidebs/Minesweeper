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
      <label>
        <input type="radio" value="option1" checked={true} />
        Option 1
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="option2" />
        Option 2
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="option3" />
        Option 3
      </label>
    </div>
  </form>
               </div>}
            </div>
    )
}

export default Menu