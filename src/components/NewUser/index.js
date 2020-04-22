import React from 'react';
import { NavLink } from 'react-router-dom';

import NewUserFormContainer from '../../containers/NewUserFormContainer';

import './style.scss';

const NewUser = () => (
  <aside className="left__menu left__menu--login">
    <h2 className="login__title">Inscription</h2>
    <nav className="login__nav">
      <NavLink exact to="/">Connexion</NavLink>
      <NavLink exact to="/forgotten">Mot de passe oublié</NavLink>
    </nav>

    <NewUserFormContainer />
  </aside>

);

export default NewUser;
