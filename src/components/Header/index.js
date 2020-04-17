import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.scss';

const Header = ({ isConnected }) => (
  <header className="header">
    <nav className="header__nav">
      <ul>
        <li className="nav__link">Inter.view</li>
        <NavLink exact to="/" className="nav__link">Mon espace</NavLink>
        <NavLink exact to="/search" className="nav__link" style={{ opacity: isConnected ? '1' : '0', pointerEvents: isConnected ? 'all' : 'none' }}>Rechercher</NavLink>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default Header;
