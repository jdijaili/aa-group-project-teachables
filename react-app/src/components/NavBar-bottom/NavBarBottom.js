import React from 'react';
import './NavBarBottom.css';

const NavBarBottom = () => {
    return (
        <ul className='navbar-bottom'>
            <div className='navbar-bottom-left'>
                <i class='fas fa-pencil-ruler'></i>
                <li>teachables</li>
            </div>
            <div className='navbar-bottom-right'>
                <li>
                    PUBLISH
                </li>
                <li>SEARCH BAR</li>
            </div>
        </ul>
    )
};

export default NavBarBottom;
