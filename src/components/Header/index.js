// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './style.scss';

// == Composant
const Header = () => (
  <header className="header">
    <nav className="header__nav">
      <ul>
        <li className="nav__link">
          <a href="/">Inter.view</a>
        </li>
        <li className="nav__link">
          <a href="/search">Rechercher</a>
        </li>
        <li className="nav__link">
          <a href="/">Mon Espace</a>
        </li>
      </ul>
    </nav>
  </header>
);
// == Export
export default Header;
