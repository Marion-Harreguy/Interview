import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

const Footer = ({ logOut }) => (
  // TODO : Handle logout
  <footer className="left__footer">
    <a className="footer__legal" onClick={() => logOut()}>Déconnexion</a>
    <span>&bull;</span>
    <NavLink exact to="/legal-mentions" className="footer__legal-mentions">Mentions légales</NavLink>
  </footer>
);

export default Footer;
