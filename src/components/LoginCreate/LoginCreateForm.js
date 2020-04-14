// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './style.scss';

// == Composant
const LoginCreateForm = ({
  surnameValue,
  nameValue,
  emailValue,
  structureValue,
  townValue,
  descriptionValue,
  passwordValue,
  passwordConfirmationValue,
  handleInputChange,
  handleFormSubmit,
}) => {
  const canSubmitForm = (surnameValue.length > 0 && nameValue.length > 0);
  return (

  <form className="login__form" onSubmit={(evt) => { evt.preventDefault(); handleFormSubmit();}}>
    <input className="login__form__input" onChange={(evt) => { handleInputChange(evt.target); }} value={surnameValue} type="text" name="lastname" placeholder="Nom" />
    <input className="login__form__input" onChange={(evt) => { handleInputChange(evt.target); }} value={nameValue} type="text" name="firstname" placeholder="Prénom" />
    <input className="login__form__input" onChange={(evt) => { handleInputChange(evt.target); }} value={emailValue} type="email" name="email" placeholder="Email" />
    <input className="login__form__input" onChange={(evt) => { handleInputChange(evt.target); }} value={structureValue} type="text" name="structure" placeholder="Structure(s)" />
    <input className="login__form__input" onChange={(evt) => { handleInputChange(evt.target); }} value={townValue} type="text" name="town" placeholder="Ville" />
    <input className="login__form__input" onChange={(evt) => { handleInputChange(evt.target); }} value={descriptionValue} type="text" name="biography" placeholder="Description" />

    <input className="login__form__input" onChange={(evt) => { handleInputChange(evt.target); }} value={passwordValue} type="password" name="password" placeholder="Mot de passe" />
    <input className="login__form__input" onChange={(evt) => { handleInputChange(evt.target); }} value={passwordConfirmationValue} type="password" name="password-confirmation" placeholder="Confirmation du mot de passe" />

    <button className="login__form__button login__form__button--create" type="submit" disabled={!canSubmitForm}>S'inscrire</button>
  </form>

)};

LoginCreateForm.propTypes = {
  surnameValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  structureValue: PropTypes.string.isRequired,
  townValue: PropTypes.string.isRequired,
  descriptionValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  passwordConfirmationValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
}; 

// Counter.propTypes = {
//   count: PropTypes.number,
//   increment: PropTypes.func.isRequired,
//   decrement: PropTypes.func.isRequired,
// };

// Counter.defaultProps = {
//   count: 0,
// };
// == Export
export default LoginCreateForm;
