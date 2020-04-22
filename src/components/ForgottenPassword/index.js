import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.scss';

const ForgottenPassword = ({ email, forgottenPasswordInputChange, forgottenPasswordSubmit}) => {

  // Check if the email adress is valid
  const validEmail = !(/\S+@\S+\.\S+/.test(email));

  return (
    <aside className="left__menu left__menu--login">
      <h2 className="login__title">Mot de passe oublié ?</h2>
      <nav className="login__nav">
        <NavLink exact to="/register">Inscription</NavLink>
        <NavLink exact to="/">Connexion</NavLink>
      </nav>

      <form className="login__form" onSubmit={(event) => { event.preventDefault(); forgottenPasswordSubmit()}}>
        {/* Button is first because of CSS-related reasons */}
        <button className="login__form__button login__form__button--forgotten" type="submit" disabled={validEmail || email.length < 0}>Envoyer</button>
        <input className={`login__form__input mandatory ${(email.length > 0 && validEmail) && 'invalid'}`} type="email" name="email" placeholder="Email" value={email} onChange={(event) => { forgottenPasswordInputChange(event.target.value); }}/>
      </form>
    </aside>

  )};

ForgottenPassword.propTypes = {
  email: PropTypes.string.isRequired,
  forgottenPasswordInputChange: PropTypes.func.isRequired,
  forgottenPasswordSubmit: PropTypes.func.isRequired,
};

export default ForgottenPassword;
