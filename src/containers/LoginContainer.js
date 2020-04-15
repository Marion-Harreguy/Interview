import { connect } from 'react-redux';

import Login from 'src/components/Login';
import { loginInputChange, loginSubmit } from '../actions';

const mapStateToProps = (state) => ({
  login: state.login.login,
  password: state.login.password,
});

const mapDispatchToProps = (dispatch) => ({
  // Changed input = input that triggered the event
  loginInputChange: (changedInput) => {
    dispatch(loginInputChange(changedInput));
  },
  loginSubmit: () => {
    dispatch(loginSubmit());
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;
