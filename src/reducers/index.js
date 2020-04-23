import { combineReducers } from 'redux';
import newUser from './newUser';
import forgottenPassword from './forgottenPassword';
import login from './login';
import userData from './userData';
import readInterview from './readInterview';
import writeInterview from './writeInterview';
import search from './search';

export default combineReducers({
  newUser,
  forgottenPassword,
  login,
  userData,
  readInterview,
  writeInterview,
  search,
});
