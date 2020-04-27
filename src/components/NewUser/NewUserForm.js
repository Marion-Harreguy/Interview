// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './style.scss';

// == Composant
const NewUserForm = ({
  firstname,
  lastname,
  email,
  structure,
  city,
  sector,
  status,
  password,
  passwordConfirmation,
  newUserInputChange,
  newUserSubmit,
}) => {
  const structureFill = structure.length < 0 ? true : (structure.length > 0 && city.length > 0 && sector.length < 0) ;
  // Check if all the mandatory inputs are filled to be able to submit form
  // And that the password matches the confirmation-password
  const canSubmitForm = (lastname.length > 0 && firstname.length > 0 && email.length > 0 && password.length > 0 && passwordConfirmation.length > 0 && password === passwordConfirmation && structureFill === true);

  // + Individual checks for mandatory inputs : adds an "invalid" class, for the user to know why they can't submit
  return (

    <form className="login__form" onSubmit={(evt) => { evt.preventDefault(); newUserSubmit(); }}>

      {/* Button is first because of CSS-related reasons */}
      <button className="login__form__button login__form__button--create" type="submit" disabled={!canSubmitForm}>S'inscrire</button>
        
      <input className="login__form__input mandatory" data-type="user" onChange={(evt) => { newUserInputChange(evt.target); }} value={lastname} type="text" name="lastname" placeholder="Nom *" />
      <input className="login__form__input mandatory" data-type="user" onChange={(evt) => { newUserInputChange(evt.target); }} value={firstname} type="text" name="firstname" placeholder="Prénom *" />
      {/* /\S+@\S+\.\S+/.test(emailValue)) = check if the string is an email */}
      <input className={`login__form__input mandatory ${(email.length > 0 && !(/\S+@\S+\.\S+/.test(email))) && 'invalid'}`} data-type="user" onChange={(evt) => { newUserInputChange(evt.target); }} value={email} type="email" name="email" placeholder="Email *" />
      <input className="login__form__input" data-type="structure" onChange={(evt) => { newUserInputChange(evt.target); }} value={structure} type="text" name="name" placeholder="Structure(s)" />
      <input className={`login__form__input ${structure.length > 0 && 'mandatory'}`} data-type="structure" onChange={(evt) => { newUserInputChange(evt.target); }} value={city} type="text" name="city" placeholder="Ville de la structure" />
      <input className={`login__form__input ${structure.length > 0 && 'mandatory'}`} data-type="structure" onChange={(evt) => { newUserInputChange(evt.target); }} value={sector} type="text" name="sector" placeholder="Secteur de la structure" />
      <input className="login__form__input" data-type="user" onChange={(evt) => { newUserInputChange(evt.target); }} value={status} type="text" name="status" placeholder="Statut" />

      <input className={`login__form__input mandatory ${(password.length > 0 && password.length < 3) && 'invalid'}`} data-type="user" onChange={(evt) => { newUserInputChange(evt.target); }} value={password} type="password" name="password" placeholder="Mot de passe *" />
      <input className={`login__form__input mandatory ${(passwordConfirmation.length > 0 && password !== passwordConfirmation) && 'invalid'}`} onChange={(evt) => { newUserInputChange(evt.target); }} value={passwordConfirmation} type="password" data-type="front" name="passwordConfirmation" placeholder="Confirmation du mot de passe *" />
      
    </form>

)};

// Checking all the props received
NewUserForm.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  structure: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  sector: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  newUserInputChange: PropTypes.func.isRequired,
  newUserSubmit: PropTypes.func.isRequired,
};

export default NewUserForm;
