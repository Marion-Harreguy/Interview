import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import history from '../history';

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
  SEARCH_SUBMIT,
  AUTOMATIC_LOG,
  automaticLogOk,
  loadReadInterview,
  loadWriteInterview,
  updateUserState,
  createCategoryDisplay,
  automaticLog,
  deleteInterview,
  logOut,
  loginSubmit,
  uploadResults,
  interviewGet,
  loadId,
} from '../actions';
import { render } from 'enzyme';

export default (store) => (next) => (action) => {

  const errorMessages = {
    401: 'Votre session a expiré, veuillez vous reconnecter',
    403: 'Vous n\'avez pas les droits d\'accès pour cette page',
    406: 'Cette adresse mail est déjà reliée à un compte Interview',
    404: 'Page introuvable',
    500: 'Le serveur a rencontré un problème.',
  };

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
  const userInfo = {
    user: { ...store.getState().userData.user },
    structure: { ...store.getState().userData.structure },
    dashboard: { ...store.getState().userData.dashboard },
  };

  const userId = () => { 
    const id = JSON.parse(localStorage.getItem('userLogs')).id;
    return id;
  };

  // FOR FORGOTTEN PASSWORD
  const email = { ...store.getState().forgottenPassword.email };

  // FOR WRITE_INTERVIEW_PUT
  const interviewInfo = () => ({ ...store.getState().writeInterview });
  
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
          // window.alert(errorMessages[error.response.status]);
          store.dispatch(logOut());
          history.push('/');
        });
      break;

    case NEW_USER_SUBMIT:
      axios({
        url: 'http://184.73.143.2/register',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(newUser),
      })
        .then(() => {
          userConnect = {
            username: store.getState().newUser.user.email,
            password: store.getState().newUser.user.password,
          };
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
              const userLogs = {
                id: decodedToken.id,
                token: response.data.token,
                isConnected: true,
              };
              localStorage.setItem('userLogs', JSON.stringify(userLogs));
              store.dispatch(automaticLog(userLogs));
            })
            .catch((error) => {
              // window.alert('Identifiants invalides');
            });
        })
        .catch((error) => {
          if (error.response.status === 403) error.response.status = 406;
          // window.alert(errorMessages[error.response.status]);
        });
      break;

    case FORGOTTEN_PASSWORD_SUBMIT:
      // TODO : Make ajax request
      break;

    case LOGIN_SUBMIT:
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

          const userLogs = {
            id: decodedToken.id,
            token: response.data.token,
            isConnected: true,
          };
          localStorage.setItem('userLogs', JSON.stringify(userLogs));
          store.dispatch(automaticLog(userLogs));
        })
        .catch((error) => {
          // window.alert('Identifiants invalides');
        });
      break;

    case UPDATE_USER_PUT:
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
          // window.alert(errorMessages[error.response.status]);
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
          store.dispatch(updateUserState(response.data));
          if (store.getState().userData.library.categoryDisplay.length === 0) {
            store.dispatch(createCategoryDisplay());
          }
        })
        .catch((error) => {
          // window.alert(errorMessages[error.response.status]);
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
          // window.alert(errorMessages[error.response.status]);
          if (action.payload.reducer === 'write' && error.response.status === 403) {
            history.push(`/update/${action.payload.interviewId}`);
          }
          if (error.response.status === 404) {
            history.push('/404');
          }
        });
      break;

    case WRITE_INTERVIEW_PUT:
      axios({
        url: `http://184.73.143.2/api/interviews/${action.payload}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(interviewInfo()),
      })
        .then(() => {
          store.dispatch(interviewGet({interviewId : action.payload, reducer: 'write'}));
        })
        .catch((error) => {
          // window.alert(errorMessages[error.response.status]);
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
        .then(() => {
          store.dispatch(deleteInterview(action.payload));
          history.push('/');
        })
        .catch((error) => {
          // window.alert(errorMessages[error.response.status]);
        });
      break;

    case WRITE_INTERVIEW_CREATE:
      axios({
        url: 'http://184.73.143.2/api/interviews/',
        method: 'post',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(interviewInfo()),
      })
        .then((response) => {
          store.dispatch(loadId(response.data));
          history.push(`/update/${response.data.id}`);
        })
        .catch((error) => {
          // window.alert(errorMessages[error.response.status]);
        });
      break;
    case SEARCH_SUBMIT:
      const searchParams = Object.entries(store.getState().search.form);
      let urlParam = ''
      searchParams.map((field) =>{
        if (field[1]) urlParam += `${field[0]}=${field[1]}&`;
      });
      axios({
        url: `http://184.73.143.2/api/search/?${urlParam.replace(/.$/,"")}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(newUser),
      })
        .then((response) => {
          store.dispatch(uploadResults(response.data));
        })
        .catch((error) => {
          // window.alert(errorMessages[error.response.status]);
        });
      break;
    default:
      next(action);
  }
};
