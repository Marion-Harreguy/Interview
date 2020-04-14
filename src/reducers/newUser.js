import { NEW_USER_INPUT_CHANGE, NEW_USER_SUBMIT } from '../actions';

export const initialState = {

  // Data in order to get a 200 response from API
  // user: {
  //   firstname: 'Jean',
  //   lastname: 'Renée',
  //   email: 'jr@lataupe.fr',
  //   password: 'mignon',
  //   biography: 'Je suis mignon',
  // },

  // structure: {
  //   name: 'Le terrier',
  //   city: 'fondujardin',
  //   sector: 'tunnelier',
  // },

  // front: {
  //   passwordConfirmation: 'mignon',
  // },

  user: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    biography: '',
  },

  structure: {
    name: '',
    city: '',
    sector: '',
  },

  front: {
    passwordConfirmation: '',
  },
};

const newUser = (state = initialState, action = {}) => {
  switch (action.type) {
    // When user writes in the inputs
    case NEW_USER_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.dataset.type]: {
          ...state[action.payload.dataset.type],
          [action.payload.name]: action.payload.value,
        },
      };
    case NEW_USER_SUBMIT:
      // When user submits the input — and a new user was created
      // TODO : Change the state here
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default newUser;
