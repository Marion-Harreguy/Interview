import axios from 'axios';

import {
  NEW_USER_SUBMIT,
  FORGOTTEN_PASSWORD_SUBMIT,
  LOGIN_SUBMIT,
  UPDATE_USER_PUT,
  UPDATE_USER_GET,
  INTERVIEW_GET,
  WRITE_INTERVIEW_PUT,
  WRITE_INTERVIEW_DELETE,
  loadReadInterview,
  loadWriteInterview,
  updateUserState,
  newUserSuccess,
} from '../actions';

export default (store) => (next) => (action) => {
  // TOKEN will be used for request headers
  const token = { ...store.getState().userData.dataUser.token };

  // FOR NEW_USER_SUBMIT
  const newUser = {
    // Ajax will send all the user & structure info to the API (but not the "form" key)
    user: { ...store.getState().newUser.user },
    structure: { ...store.getState().newUser.structure },
  };

  // FOR LOGIN_SUBMIT
  const userConnect = { credentials: { ...store.getState().login } };

  // FOR UPDATE_USER_PUT
  const userInfo = {
    ...store.getState().userData.dataUser,
    ...store.getState().userData.dataStructure,
    ...store.getState().userData.dashboard,
  };

  const userId = { ...store.getState().userData.dataUser.id };

  // FOR FORGOTTEN PASSWORD
  const email = { ...store.getState().forgottenPassword.email };

  // FOR WRITE_INTERVIEW_PUT
  const interviewInfo = { ...store.getState().writeArticle };

  switch (action.type) {
    case NEW_USER_SUBMIT:
      axios.post('http://184.73.143.2/register', JSON.stringify(newUser), { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          // Send new user ID to the state
          store.dispatch(newUserSuccess(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case FORGOTTEN_PASSWORD_SUBMIT:
      // TODO : Make ajax request
      console.log("L'utilisateur "+email+" a oublié son mot de passe");
      break;

    case LOGIN_SUBMIT:
      axios.post('http://184.73.143.2/login', JSON.stringify(userConnect), { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          store.dispatch(updateUserState(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case UPDATE_USER_PUT:
      axios.put(`http://184.73.143.2/api/users/${userId}`, JSON.stringify(userInfo), { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          // No response.data
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case UPDATE_USER_GET:
      axios.get(`http://184.73.143.2/api/users/${userId}`)
        .then((response) => {
          store.dispatch(updateUserState(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case INTERVIEW_GET:
      axios.get(`http://184.73.143.2/api/interview/${action.payload.interviewId}`)
        .then((response) => {
          if (action.payload.reducer === 'read') store.dispatch(loadReadInterview(response.data));
          if (action.payload.reducer === 'write') store.dispatch(loadWriteInterview(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case WRITE_INTERVIEW_PUT:
      axios.put(`http://184.73.143.2/api/interview/${action.payload}`, JSON.stringify(interviewInfo), { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          // No response.data
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case WRITE_INTERVIEW_DELETE:
      axios.delete(`http://184.73.143.2/api/interview/${action.payload}`)
        .then(() => {
          // No response.data
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
      next(action);
  }
};


// EXAMPLE OF CREDENTIALS
// axios({ // exemple de requete avec les credentials, voir la doc: https://codewithhugo.com/pass-cookies-axios-fetch-requests/
//         url: 'http://localhost:3001/logout',
//         method: 'post',
//         withCredentials: true,
//       })
//         .then((res) => {
//           store.dispatch(logoutSuccess());
//         })
//         .catch((err) => {
//           console.error(err);
//         });