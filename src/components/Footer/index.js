import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const Footer = ({ logOut, isConnected }) => (
  // TODO : Handle logout
  <footer className="left__footer">
    {
      isConnected && (
        <div className="footer__legal" onClick={() => logOut()}>Déconnexion <span>&bull;</span></div>
      )
    }
    <NavLink exact to="/legal-mentions" className="footer__legal-mentions">Mentions légales</NavLink>
  </footer>
);

Footer.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default Footer;
