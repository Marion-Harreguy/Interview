export const NEW_USER_INPUT_CHANGE = 'NEW_USER_INPUT_CHANGE';
export const NEW_USER_SUBMIT = 'NEW_USER_SUBMIT';
export const FORGOTTEN_PASSWORD_INPUT_CHANGE = 'FORGOTTEN_PASSWORD_INPUT_CHANGE';
export const FORGOTTEN_PASSWORD_SUBMIT = 'FORGOTTEN_PASSWORD_SUBMIT';
export const LOGIN_INPUT_CHANGE = 'LOGIN_INPUT_CHANGE';
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const MODIFY_USER_INFO = 'MODIFY_USER_INFO';
export const CHANGE_ORDER = 'CHANGE_ORDER';
export const TOGGLE_SECTION = 'TOGGLE_SECTION';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';


export const newUserInputChange = (payload) => ({
  type: NEW_USER_INPUT_CHANGE,
  payload,
});

export const newUserSubmit = () => ({
  type: NEW_USER_SUBMIT,
});

export const forgottenPasswordInputChange = (payload) => ({
  type: FORGOTTEN_PASSWORD_INPUT_CHANGE,
  payload,
});

export const forgottenPasswordSubmit = () => ({
  type: FORGOTTEN_PASSWORD_SUBMIT,
});

export const loginInputChange = (payload) => ({
  type: LOGIN_INPUT_CHANGE,
  payload,
});

export const loginSubmit = () => ({
  type: LOGIN_SUBMIT,
});

export const modifyUserInfo = (payload) => ({
  type: MODIFY_USER_INFO,
  payload,
});

export const changeOrder = (payload) => ({
  type: CHANGE_ORDER,
  payload,
});

export const toggleSection = (payload) => ({
  type: TOGGLE_SECTION,
  payload,
});

export const toggleCategory = (payload) => ({
  type: TOGGLE_CATEGORY,
  payload,
});
