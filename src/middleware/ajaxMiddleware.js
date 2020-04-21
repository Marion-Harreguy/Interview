import axios from 'axios';

import {
  NEW_USER_SUBMIT,
  FORGOTTEN_PASSWORD_SUBMIT,
  LOGIN_SUBMIT,
  UPDATE_USER_PUT
  UPDATE_USER_GET
  ARTICLE_GET
  WRITE_ARTICLE_PUT
  WRITE_ARTICLE_DELETE
  loadReadInterview,
  loadWriteInterview,
  updateUserState,
  newUserSuccess,
} from '../actions';

export default (store) => (next) => (action) => {

  // FOR NEW_USER_SUBMIT
  const newUser = {
    // Ajax will send all the user & structure info to the API (but not the "form" key)
    user: { ...store.getState().newUser.user },
    structure: { ...store.getState().newUser.structure },
  };

  // FOR LOGIN_SUBMIT
  const userConnect = { credentials: { ...store.getState().login } };

  // FOR UPDATE_USER_PUT
  const userInfo = { ...store.getState().userData };

  // FOR WRITE_ARTICLE_PUT
  const interviewInfo = { ...store.getState().writeArticle };

  switch (action.type) {

    // [Ajax : UPDATE_USER_PUT]
    // [Ajax : UPDATE_USER_GET]
    // [Ajax : NEW_USER_SUBMIT]
    // [Ajax : LOGIN_SUBMIT]

    // [Ajax : UPDATE_USER_CATEGORIES] ? ou direct [Ajax : UPDATE_USER_PUT] ?

    // [Ajax : ARTICLE_GET] (read or write as param)
    // [Ajax : WRITE_ARTICLE_PUT]
    // [Ajax : WRITE_ARTICLE_DELETE]

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
      const email = store.getState().forgottenPassword.email;
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
      axios.put(`http://184.73.143.2/api/users/${userInfo.id}`, JSON.stringify(userInfo), { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          // No response.data
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case UPDATE_USER_GET:
      axios.get(`http://184.73.143.2/api/users/${userInfo.id}`)
        .then((response) => {
          store.dispatch(updateUserState(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case GET_ARTICLE:
      axios.get(`http://184.73.143.2/api/interview/${action.payload.interviewId}`)
        .then((response) => {
          if (action.payload.reducer === 'read') store.dispatch(loadReadInterview(response.data));
          if (action.payload.reducer === 'write') store.dispatch(loadWriteInterview(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case WRITE_ARTICLE_PUT:
      axios.put(`http://184.73.143.2/api/interview/${action.payload.interviewId}`, JSON.stringify(interviewInfo), { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          // No response.data
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case WRITE_ARTICLE_DELETE:
      axios.delete(`http://184.73.143.2/api/interview/${action.payload.interviewId}`)
        .then((response) => {
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


// case exemple:
//       axios({ // exemple de requete avec les credentials, voir la doc: https://codewithhugo.com/pass-cookies-axios-fetch-requests/
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