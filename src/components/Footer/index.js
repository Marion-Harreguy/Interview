// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './style.scss';

// == Composant
const Footer = () => (

  <footer className="left__footer">
    <a className="footer__logout" href="/logout">Déconnexion</a>
    <span>&bull;</span>
    <a className="footer__legal-mentions" href="/legal">Mentions légales</a>
  </footer>
);
// == Export
export default Footer;
