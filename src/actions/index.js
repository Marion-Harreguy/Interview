export const NEW_USER_INPUT_CHANGE = 'NEW_USER_INPUT_CHANGE';
export const NEW_USER_SUBMIT = 'NEW_USER_SUBMIT';

export const newUserInputChange = (payload) => ({
  type: NEW_USER_INPUT_CHANGE,
  payload,
});

export const newUserSubmit = () => ({
  type: NEW_USER_SUBMIT,
});
