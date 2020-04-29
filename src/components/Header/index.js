import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.scss';

const Header = ({ isConnected }) => (
  <header className="header">
    {/* <nav className="header__nav">
      <ul>
        <li className="nav__link">Inter.view</li>
        <NavLink exact to="/" className="nav__link">Mon espace</NavLink>
        <NavLink exact to="/search" className="nav__link" style={{ opacity: isConnected ? '1' : '0', pointerEvents: isConnected ? 'all' : 'none' }}>Rechercher</NavLink>
      </ul>
    </nav>
  </header> */}

    <nav class="header__nav sticky-top navbar-expand-sm">
    <div class="nav-container">

        <li class="nav__link nav-item nav-item--bar-hidden active">
            <p>Inter.view</p>
        </li>

        <button class="navbar-toggler first-button" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <div class="animated-icon1"><span></span><span></span><span></span></div>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav__link nav-item active nav-item--collapse-hidden">
                    <p class="nav-link">Inter.view</p>
                </li>
                <li class="nav__link nav-item">
                  <NavLink exact to="/" className="nav__link">Mon espace</NavLink>
                </li>
                <li class="nav__link nav-item">
                    <NavLink exact to="/search" className="nav__link" style={{ opacity: isConnected ? '1' : '0', pointerEvents: isConnected ? 'all' : 'none' }}>Rechercher</NavLink>
                </li>
            </ul>
        </div>
    </div>
    </nav>
    </header>
);

Header.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default Header;
