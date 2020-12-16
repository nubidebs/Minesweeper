import React from 'react';
import { useGameContext } from "../context/GameContext";

import "./Navbar.scss";

const Navbar: React.FC = () => {
    const {isMenuVisible, setIsMenuVisible} = useGameContext()!

    return (<nav className='Nav'>
       <button className='Start' onClick={(): void => setIsMenuVisible(!isMenuVisible) }>Start</button> 
        </nav>)
}

export default Navbar;