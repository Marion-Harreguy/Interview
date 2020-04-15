import { LOGIN_INPUT_CHANGE } from '../actions';

export const initialState = {
  login: '',
  password: '',
};

const login = (state = initialState, action = {}) => {
  switch (action.type) {
    // When user writes in the inputs
    case LOGIN_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default login;
