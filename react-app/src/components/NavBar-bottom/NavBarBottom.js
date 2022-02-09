import React from 'react';
import { Link } from 'react-router-dom';
import './NavBarBottom.css';

const NavBarBottom = () => {
    return (
        <ul className='navbar-bottom'>
            <div className='navbar-bottom-left'>
                <li><Link to='/' style={{color: 'black'}}>teachables</Link></li>
            </div>
            <div className='navbar-bottom-right'>
                <li><Link to='/publish' style={{color: 'black'}}>PUBLISH</Link></li>
                <li>SEARCH BAR</li>
            </div>
        </ul>
    )
};

export default NavBarBottom;
