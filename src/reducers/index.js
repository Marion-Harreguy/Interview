import { combineReducers } from 'redux';
import newUser from './newUser';
import forgottenPassword from './forgottenPassword';
import login from './login';

export default combineReducers({
  newUser,
  forgottenPassword,
  login,
});
