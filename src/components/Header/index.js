import React from 'react';

import './style.scss';

const Header = () => (
  // TODO : Put the right urls
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

export default Header;
