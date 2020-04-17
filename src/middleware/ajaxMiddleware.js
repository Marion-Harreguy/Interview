import axios from 'axios';

import {
  NEW_USER_SUBMIT,
  FORGOTTEN_PASSWORD_SUBMIT,
  LOGIN_SUBMIT,
  MODIFY_USER_INFO_API,
} from '../actions';

import {
  connectWebsocket,
} from '../actions/socket';

export default (store) => (next) => (action) => {

  // axios.defaults.withCredentials = true;

  // FOR NEW_USER_SUBMIT
  const newUser = {
    // Ajax will send all the user & structure info to the API (but not the "form" key)
    user: { ...store.getState().newUser.user },
    structure: { ...store.getState().newUser.structure },
  };

  // FOR LOGIN_SUBMIT
  const userConnect = { credentials: { ...store.getState().login } };

  // FOR MODIFY_USER_INFO
  const userInfo = { ...store.getState().userData.dataUser};

  switch (action.type) {
    case NEW_USER_SUBMIT:

      // MAYBE : Put a loading state when waiting for request response :
      // store.dispatch(toggleLoading());

      axios.post('http://184.73.143.2/register', JSON.stringify(newUser), { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {

          // Get user informations (id)
          console.log('New user succesfully created!');
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
      console.log(userConnect);
      axios.post('http://184.73.143.2/login', JSON.stringify(userConnect), { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          // Create the websocket, with a url based on the user's token
          console.log("Succesfully connected !"); 
          store.dispatch(connectWebsocket(response.data));
        })
        .catch((error) => {
          // Tell the user what's wrong
          store.dispatch(connectWebsocket({}));
          // console.log(error);
        });
      break;

    case MODIFY_USER_INFO_API:
      // Request to send the changes
      // axios.put(`http://184.73.143.2/api/users/${userInfo.id}
      // axios.put('http://184.73.143.2/api/users/1551', JSON.stringify(userInfo), { headers: { 'Content-Type': 'application/json', 'X-Auth-Token': 'd982301f2da8736827fc4b191ff1ebb2' } })
      // // REQUEST WITH HEADER
      // // axios.put(`http://184.73.143.2/api/users/${userInfo.id}`, JSON.stringify(userInfo), { headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true } })
      //   .then((response) => {
      //     console.log("succesfully modified !");
      //     // WEB SOCKET WILL HANDLE THE FRONT-END CHANGES
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     // DISPLAY AN ERROR MESSAGE
      //   });
      break;

    default:
      next(action);
  }
};
