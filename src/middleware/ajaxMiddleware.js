import axios from 'axios';

import {
  HANDLE_NEW_USER_FORM_SUBMIT, handleNewUserFormSubmit,
} from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case HANDLE_NEW_USER_FORM_SUBMIT:
      // Je préviens mon app de se mettre en loading
      // store.dispatch(toggleLoading());
      axios.post('http://localhost:3001/login', store.getState().newUser)
        .then((response) => {
          // Créer 2 nouveaux actions types 'LOGIN_SUCCESS' et 'LOGIN_ERROR'
          // Créer 2 actions creators un pour success
          // (qui devra mettre le username dans payload)
          // un pour error qui n'a pas besoin de payload
          // Côté reducer, importer les 2 types d'action (success et error)
          // Pour modifier le state comme demandé

          console.log(response.data);
          // dispatcher une action qui dit 'LOGIN_SUCSESS' et qui aura comme payload
          // le nom de l'user pôur que mon reducer puisse:
          // * arrêter le loading
          // * Mettre le bon nom d'user dans le state
          // store.dispatch(handleNewUserFormSubmit(response.data));
          store.dispatch(handleNewUserFormSubmit());
        })
        .catch((error) => {
          console.log(error);
          // Dispatcher une action pour dire "LOGIN_ERROR"
          // Mon reducer peut changer dans le state:
          // * loading false
          // * user -> anonyme
        //   store.dispatch(loginError());
        });
      return;
    default:
      next(action);
  }
};
