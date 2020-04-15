import axios from 'axios';

import {
  NEW_USER_SUBMIT,
  FORGOTTEN_PASSWORD_SUBMIT,
  LOGIN_SUBMIT,
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

  const userConnect = { credentials: {...store.getState().login }};

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

    case FORGOTTEN_PASSWORD_SUBMIT:
      // If the user forgets his password

      const phrase = store.getState().forgottenPassword.email;
      console.log("L'utilisateur "+phrase+" a oublié son mot de passe");
      break;

    case LOGIN_SUBMIT:
      // User trying to connect
<<<<<<< HEAD
      console.log(userConnect);
=======
      console.log(JSON.stringify(userConnect));
      // axios.post('http://184.73.143.2/login', JSON.stringify(userConnect))
>>>>>>> 1c98edb7b0216cac11e35cb7d43a565308abb86d
      axios.post('http://184.73.143.2/login', JSON.stringify(userConnect) , {headers:{"Content-Type" : "application/json"}})
        .then((response) => {
          // User succesfully connect
          // Fill the state with his datas

          console.log("Succesfully connected !");
          console.log(response);
        })
        .catch((error) => {
          // Tell the user what's wrong
          console.log(error);
        });
      break;
    default:
      next(action);
  }
};
