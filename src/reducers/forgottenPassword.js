import { FORGOTTEN_PASSWORD_INPUT_CHANGE } from '../actions';

export const initialState = {
  email:'',
};

const forgottenPassword = (state = initialState, action = {}) => {
  switch (action.type) {
    // When user writes in the inputs
    case FORGOTTEN_PASSWORD_INPUT_CHANGE:
      return { email: action.payload };
    default:
      return state;
  }
};

export default forgottenPassword;
