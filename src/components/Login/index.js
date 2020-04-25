import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.scss';

const Login = ({ login, password, loginInputChange, loginSubmit}) => {

  // Check if the login adress is valid
  const validEmail = !(/\S+@\S+\.\S+/.test(login));

  return (
    <aside className="left__menu left__menu--login">
      <h2 className="login__title">Connexion</h2>
      <nav className="login__nav">
        <NavLink exact to="/register">Inscription</NavLink>
        <NavLink exact to="/forgotten">Mot de passe oublié</NavLink>
      </nav>

      <form className="login__form" onSubmit={(event) => { event.preventDefault(); loginSubmit()}}>
        {/* Button is first because of CSS-related reasons */}
        <button className="login__form__button" type="submit" disabled={validEmail || login.length < 0}>Entrer</button>
        <input className={`login__form__input mandatory ${(login.length > 0 && validEmail) && 'invalid'}`} type="email" name="login" placeholder="Email" value={login} onChange={(event) => { loginInputChange(event.target); }}/>
        <input className={`login__form__input mandatory ${(password.length > 0 && password.length < 8) && 'invalid'}`} type="password" name="password" placeholder="Mot de passe" onChange={(event) => { loginInputChange(event.target); }} value={password}/>
      </form>
    </aside>

  )};

Login.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginInputChange: PropTypes.func.isRequired,
  loginSubmit: PropTypes.func.isRequired,
};

export default Login;
