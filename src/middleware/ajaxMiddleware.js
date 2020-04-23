import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {
  NEW_USER_SUBMIT,
  FORGOTTEN_PASSWORD_SUBMIT,
  LOGIN_SUBMIT,
  UPDATE_USER_PUT,
  UPDATE_USER_GET,
  INTERVIEW_GET,
  WRITE_INTERVIEW_PUT,
  WRITE_INTERVIEW_DELETE,
  WRITE_INTERVIEW_CREATE,
  AUTOMATIC_LOG,
  automaticLogOk,
  loadReadInterview,
  loadWriteInterview,
  updateUserState,
  newUserSuccess,
  createCategoryDisplay,
  automaticLog,
  updateUserGet,
  logOut,
  loginSubmit,
} from '../actions';

export default (store) => (next) => (action) => {
  // TOKEN will be used for request headers
  const token = () => { if (localStorage.getItem('userLogs')) return JSON.parse(localStorage.getItem('userLogs')).token; };

  // FOR NEW_USER_SUBMIT
  const newUser = {
    // Ajax will send all the user & structure info to the Api (but not the "form" key)
    user: { ...store.getState().newUser.user },
    structure: { ...store.getState().newUser.structure },
  };

  // FOR LOGIN_SUBMIT
  let userConnect = { 
    username: store.getState().login.login,
    password: store.getState().login.password,
  };

  // FOR UPDATE_USER_PUT
  // const userInfo = {
  //   ...store.getState().userData.dataUser,
  //   ...store.getState().userData.dataStructure,
  //   ...store.getState().userData.dashboard,
  // };

  const userInfo = {
    user: { ...store.getState().userData.dataUser },
    structure: { ...store.getState().userData.dataStructure },
    dashboard: { ...store.getState().userData.dashboard },
  };

  const userId = () => { 
    const id = JSON.parse(localStorage.getItem('userLogs')).id;
    return id;
  };

  // FOR FORGOTTEN PASSWORD
  const email = { ...store.getState().forgottenPassword.email };

  // FOR WRITE_INTERVIEW_PUT
  const interviewInfo = { ...store.getState().writeArticle };

  switch (action.type) {
    case AUTOMATIC_LOG:
      axios({
        url: `http://184.73.143.2/api/users/${action.payload.id}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
        .then(() => {
          // user is connected and his localstorage token works
          store.dispatch(automaticLogOk(action.payload));
        })
        .catch((error) => {
          console.log(error);
          store.dispatch(logOut());
        });
      break;

    case NEW_USER_SUBMIT:
      console.log(newUser);
      axios({
        url: 'http://184.73.143.2/register',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(newUser),
      })
        .then(() => {
          console.log('user was submitted');
          userConnect = {
            username: store.getState().newUser.user.email,
            password: store.getState().newUser.user.password,
          };
          store.dispatch(loginSubmit());
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
      console.log(userConnect);
      axios({
        url: 'http://184.73.143.2/api/login_check',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(userConnect),
      })
        .then((response) => {
          const decodedToken = jwtDecode(response.data.token);

          console.log(response.data.token);
          const userLogs = {
            id: decodedToken.id,
            token: response.data.token,
            isConnected: true,
          };
          localStorage.setItem('userLogs', JSON.stringify(userLogs));
          store.dispatch(automaticLog(userLogs));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case UPDATE_USER_PUT:
      console.log(userInfo);
      axios({
        url: `http://184.73.143.2/api/users/${userId()}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(userInfo),
      })
        .then((response) => {
          store.dispatch(updateUserState(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case UPDATE_USER_GET:
      axios({
        url: `http://184.73.143.2/api/users/${userId()}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
        .then((response) => {
          console.log(userId());
          console.log("Request worked!");
          console.log(response.data);
          store.dispatch(updateUserState(response.data));
          if (store.getState().userData.library.categoryDisplay.length === 0) {
            store.dispatch(createCategoryDisplay());
          }
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case INTERVIEW_GET:
      axios({
        url: `http://184.73.143.2/api/interviews/${action.payload.interviewId}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
        .then((response) => {
          if (action.payload.reducer === 'read') store.dispatch(loadReadInterview(response.data));
          if (action.payload.reducer === 'write') store.dispatch(loadWriteInterview(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case WRITE_INTERVIEW_PUT:
      axios({
        url: `http://184.73.143.2/api/interviews/${action.payload}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(interviewInfo),
      })
        .then((response) => {
          store.dispatch(loadWriteInterview(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case WRITE_INTERVIEW_DELETE:
      axios({
        url: `http://184.73.143.2/api/interviews/${action.payload}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
        .then((response) => {
          window.location = `/update/${response.data.meta.id}`;
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case WRITE_INTERVIEW_CREATE:
      axios({
        url: 'http://184.73.143.2/api/interviews/',
        method: 'post',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
        .then((response) => {
          store.dispatch(loadWriteInterview(response.data));
          window.location = `/update/${response.data.meta.id}`;
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
      next(action);
  }
};