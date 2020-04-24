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
} from '../actions';
import { render } from 'enzyme';

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
          console.log(action.type + ": success !");
          store.dispatch(automaticLogOk(action.payload));
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
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
          console.log(action.type + ": success !");
          userConnect = {
            username: store.getState().newUser.user.email,
            password: store.getState().newUser.user.password,
          };
          store.dispatch(loginSubmit());
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
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

          console.log(action.type + ": success !");
          const userLogs = {
            id: decodedToken.id,
            token: response.data.token,
            isConnected: true,
          };
          localStorage.setItem('userLogs', JSON.stringify(userLogs));
          store.dispatch(automaticLog(userLogs));
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
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
          console.log(action.type + ": success !");
          store.dispatch(updateUserState(response.data));
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
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
          console.log(action.type + ": success !");
          store.dispatch(updateUserState(response.data));
          if (store.getState().userData.library.categoryDisplay.length === 0) {
            store.dispatch(createCategoryDisplay());
          }
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
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
          console.log(action.type + ": success !");
          if (action.payload.reducer === 'read') store.dispatch(loadReadInterview(response.data));
          if (action.payload.reducer === 'write') store.dispatch(loadWriteInterview(response.data));
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
        });
      break;

    case WRITE_INTERVIEW_PUT:
      console.log(interviewInfo());
      axios({
        url: `http://184.73.143.2/api/interviews/${action.payload}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(interviewInfo()),
      })
        .then((response) => {
          console.log(action.type + ": success !");
          store.dispatch(loadWriteInterview(response.data));
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
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
          console.log(action.type + ": success !");
          store.dispatch(deleteInterview(action.payload));
          history.push('/');
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
        });
      break;

    case WRITE_INTERVIEW_CREATE:
      console.log(interviewInfo());
      axios({
        url: 'http://184.73.143.2/api/interviews/',
        method: 'post',
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(interviewInfo()),
      })
        .then((response) => {
          console.log(action.type + ": success !");
          store.dispatch(loadWriteInterview(response.data));
          history.push(`/update/${response.data.id}`);
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
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
          console.log(action.type + ": success !");
          store.dispatch(uploadResults(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.log(action.type + " failed : "+error);
        });
      break;
    default:
      next(action);
  }
};
