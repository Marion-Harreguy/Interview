import { connect } from 'react-redux';

import ForgottenPassword from 'src/components/ForgottenPassword';
import { forgottenPasswordInputChange, forgottenPasswordSubmit } from '../actions';

const mapStateToProps = (state) => ({
  email: state.forgottenPassword.email,
});

const mapDispatchToProps = (dispatch) => ({
  forgottenPasswordInputChange: (email) => {
    dispatch(forgottenPasswordInputChange(email));
  },
  forgottenPasswordSubmit: () => {
    dispatch(forgottenPasswordSubmit());
  },
});

const ForgottenPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgottenPassword);

export default ForgottenPasswordContainer;
