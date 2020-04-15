import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

const Footer = () => (
  // TODO : Handle logout
  <footer className="left__footer">
    <NavLink exact to="/logout" className="footer__legal">Déconnexion</NavLink>
    <span>&bull;</span>
    <NavLink exact to="/legal-mentions" className="footer__legal-mentions">Mentions légales</NavLink>
  </footer>
);

export default Footer;
