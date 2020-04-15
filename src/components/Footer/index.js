import React from 'react';

import './style.scss';

const Footer = () => (
  // TODO : Put the right urls
  <footer className="left__footer">
    <a className="footer__logout" href="/logout">Déconnexion</a>
    <span>&bull;</span>
    <a className="footer__legal-mentions" href="/legal">Mentions légales</a>
  </footer>
);

export default Footer;
