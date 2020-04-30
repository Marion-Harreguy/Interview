import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './style.scss';

const Footer = ({ logOut, isConnected }) => {

  const toggleOpened = () => {
    $('.right__contact').animate({ marginTop: '10px' }, 500);
  };

  return (
  // TODO : Handle logout
  <footer className="left__footer">
    {
      isConnected && (
        <p className="footer__legal" onClick={() => logOut()}>Déconnexion <span>&bull;</span></p>
      )
    }
    <p className="footer__legal-mentions" onClick={toggleOpened}>Contact & Mentions légales</p>
  </footer>
)};

Footer.propTypes = {
  logOut: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

export default Footer;
