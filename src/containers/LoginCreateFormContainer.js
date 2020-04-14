// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import LoginCreateForm from 'src/components/LoginCreate/LoginCreateForm';

// Action Creators
import { handleNewUserInputChange, handleNewUserFormSubmit } from '../actions';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state) => ({
  surnameValue: state.loginCreateForm.newUser.user.lastname,
  nameValue: state.loginCreateForm.newUser.user.firstname,
  emailValue: state.loginCreateForm.newUser.user.email,
  structureValue: state.loginCreateForm.newUser.structure.name,
  townValue: state.loginCreateForm.newUser.structure.city,
  descriptionValue: state.loginCreateForm.newUser.user.biography,
  passwordValue: state.loginCreateForm.newUser.user.password,
  passwordConfirmationValue: state.loginCreateForm.passwordConfirmation,
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (changedInput) => {
    dispatch(handleNewUserInputChange(changedInput));
  },
  handleFormSubmit: () => {
    dispatch(handleNewUserFormSubmit());
  },
});

// Container
const LoginCreateFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginCreateForm);

// == Export
export default LoginCreateFormContainer;
