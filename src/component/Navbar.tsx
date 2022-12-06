import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__nav">
        <ul className="navbar__nav__ul">
          <li className="navbar__nav__ul__li">
            <NavLink to="/families" className="navbar__nav__ul__li__a">
              Families
            </NavLink>
          </li>
          <li className="navbar__nav__ul__li">
            <NavLink to="/houses" className="navbar__nav__ul__li__a">
              Houses
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
