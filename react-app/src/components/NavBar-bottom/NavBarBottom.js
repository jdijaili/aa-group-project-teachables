import React from 'react';
import { Link } from 'react-router-dom';
import './NavBarBottom.css';

const NavBarBottom = () => {
    return (
        <ul className='navbar-bottom'>
            <div className='navbar-bottom-left'>
                <li><img src='https://res.cloudinary.com/jenn/image/upload/v1644443029/teachables/teachable-logo_vaflfj.png' alt='teachable-logo' style={{ height: '50px', padding: '0 10px 0 0'}} /></li>
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
