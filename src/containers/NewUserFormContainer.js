import { connect } from 'react-redux';

import NewUserForm from 'src/components/NewUser/NewUserForm';
import { newUserInputChange, newUserSubmit } from '../actions';

const mapStateToProps = (state) => ({
  lastname: state.newUser.user.lastname,
  firstname: state.newUser.user.firstname,
  email: state.newUser.user.email,
  structure: state.newUser.structure.name,
  city: state.newUser.structure.city,
  sector: state.newUser.structure.sector,
  status: state.newUser.user.status,
  password: state.newUser.user.password,
  passwordConfirmation: state.newUser.front.passwordConfirmation,
});

const mapDispatchToProps = (dispatch) => ({
  // Changed input = input that triggered the event
  newUserInputChange: (changedInput) => {
    dispatch(newUserInputChange(changedInput));
  },
  newUserSubmit: () => {
    dispatch(newUserSubmit());
  },
});

const NewUserFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewUserForm);

export default NewUserFormContainer;
