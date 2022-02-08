import React from 'react';
import { Link } from 'react-router-dom';
import './NavBarBottom.css';

const NavBarBottom = () => {
    return (
        <ul className='navbar-bottom'>
            <div className='navbar-bottom-left'>
                <li><Link to='/' exact={true} style={{color: 'black'}}>teachables</Link></li>
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
