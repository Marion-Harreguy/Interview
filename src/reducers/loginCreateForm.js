import { HANDLE_NEW_USER_INPUT_CHANGE, HANDLE_NEW_USER_FORM_SUBMIT } from '../actions';

export const initialState = {
  newUser: {
    user: {
      firstname: 'Jean',
      lastname: 'Renée',
      email: 'jr@lataupe.fr',
      password: 'mignon',
      biography: 'Je suis mignon',
      passwordConfirmation: 'mignon',
    },

    structure: {
      name: 'Le terrier',
      city: 'fondujardin',
      sector: 'tunnelier',
    },
  },
  isLogged: false,
};

const loginCreateForm = (state = initialState, action = {}) => {
  switch (action.type) {
    case HANDLE_NEW_USER_INPUT_CHANGE:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          [action.payload.dataset.type]: {
            ...state.newUser[action.payload.dataset.type],
            [action.payload.name]: action.payload.value,
          },
        },
      };
    case HANDLE_NEW_USER_FORM_SUBMIT:
      return {
        ...state,
        user: { ...state.newUser },
        isLogged: true,
      };
    default:
      return state;
  }
};

export default loginCreateForm;
