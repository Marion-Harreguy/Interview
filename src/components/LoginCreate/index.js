// == Import : npm
import React from 'react';

import LoginCreateFormContainer from '../../containers/LoginCreateFormContainer';

// == Import : local
import './style.scss';

// == Composant
const LoginCreate = () => {

  // const handleInputChange = (changedInput) => {
  //   console.log("The value "+changedInput.name+" has changed to "+changedInput.value);
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("The form has been submitted !");
  // };

  return (
  <aside className="left__menu left__menu--login">
    <h2 className="login__title">Inscription</h2>
    <nav className="login__nav">
      <a href="/forgotten">Mot de passe oublié</a>
      <a href="/">Connexion</a>
    </nav>

    <LoginCreateFormContainer />
  </aside>

  )};

export default LoginCreate;
