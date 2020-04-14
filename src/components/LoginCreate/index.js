// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

import LoginCreateForm from './LoginCreateForm';

// == Import : local
import './style.scss';

// == Composant
const LoginCreate = () => {

  const handleInputChange = (changedInput) => {
    console.log("The value "+changedInput.name+" has changed to "+changedInput.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("The form has been submitted !");
  };

  return (
  <aside className="left__menu left__menu--login">
    <h2 className="login__title">Inscription</h2>
    <nav className="login__nav">
      <a href="/forgotten">Mot de passe oublié</a>
      <a href="/">Connexion</a>
    </nav>

    <LoginCreateForm  
      surnameValue="Matto"
      nameValue="Léo"
      emailValue="leo-matto@outlook.com"
      structureValue="O'clock"
      townValue="Paris"
      descriptionValue="Gérant du réseau chez O'clock"
      passwordValue="supermdp"
      passwordConfirmationValue="supermdp"
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
    />
  </aside>

  )};

// LoginCreate.propTypes = {
//   count: PropTypes.number,
//   increment: PropTypes.func.isRequired,
//   decrement: PropTypes.func.isRequired,
// };

// Counter.defaultProps = {
//   count: 0,
// };
// == Export
export default LoginCreate;
