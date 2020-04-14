import React from 'react';

import NewUserFormContainer from '../../containers/NewUserFormContainer';

import './style.scss';

const NewUser = () => (
  // TODO : Put the right urls
  <aside className="left__menu left__menu--login">
    <h2 className="login__title">Inscription</h2>
    <nav className="login__nav">
      <a href="/forgotten">Mot de passe oublié</a>
      <a href="/">Connexion</a>
    </nav>

    <NewUserFormContainer />
  </aside>

);

export default NewUser;
