import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ForgottenPassword = ({ email, forgottenPasswordInputChange, forgottenPasswordSubmit}) => {

  // Check if the email adress is valid
  const validEmail = !(/\S+@\S+\.\S+/.test(email));

  return (
  // TODO : Put the right urls
    <aside className="left__menu left__menu--login">
      <h2 className="login__title">Inscription</h2>
      <nav className="login__nav">
        <a href="/forgotten">Mot de passe oublié</a>
        <a href="/">Connexion</a>
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
}

export default ForgottenPassword;
