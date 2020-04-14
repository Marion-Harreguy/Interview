import axios from 'axios';

import {
  NEW_USER_SUBMIT,
  // Put the function we want to trigger after request
  // newUserError,
  // newUserSuccess,
} from '../actions';

export default (store) => (next) => (action) => {

  const newUser = {
    // Ajax will send all the user & structure info to the API (but not the "form" key)
    user: { ...store.getState().newUser.user },
    structure: { ...store.getState().newUser.structure },
  };

  switch (action.type) {
    case NEW_USER_SUBMIT:

      // MAYBE : Put a loading state when waiting for request response :
      // store.dispatch(toggleLoading());

      axios.post('http://184.73.143.2/register', JSON.stringify(newUser))
        .then((response) => {

          // Get user informations (id)
          console.log("New user succesfully created!");
          const newUserData = JSON.parse(response);

          // Change state from this user informations
          // store.dispatch(newUserSuccess(newUserData));
        })
        .catch((error) => {
          console.log(error);
          // Possible errors that we could get from api: connecting error, email already exists

          // Make an error function
          // Store.dispatch(newUserError(error));
        });
      break;
    default:
      next(action);
  }
};
