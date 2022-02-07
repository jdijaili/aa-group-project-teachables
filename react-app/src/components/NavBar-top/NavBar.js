
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginSignup from '../auth/LoginSignup';
import './NavBar.css';
import NavBarBottom from '../NavBar-bottom/NavBarBottom';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <div>
      <nav>
        <ul className='site-options'>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              <i class="fas fa-home" />
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact={true}>
              Chess Openings
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact={true}>
              Game Development
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact={true}>
              Jewellery Design
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact={true}>
              Knitting
            </NavLink>
          </li>
        </ul>
        <ul className='user-options'>
          {(user)? <LogoutButton /> : <LoginSignup />}
        </ul>
      </nav>
      <NavBarBottom />
    </div>
  );
}

export default NavBar;
