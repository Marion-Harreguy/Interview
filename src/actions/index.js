export const HANDLE_NEW_USER_INPUT_CHANGE = 'HANDLE_NEW_USER_INPUT_CHANGE';
export const HANDLE_NEW_USER_FORM_SUBMIT = 'HANDLE_NEW_USER_FORM_SUBMIT';

export const handleNewUserInputChange = (payload) => ({
  type: HANDLE_NEW_USER_INPUT_CHANGE,
  payload,
});

export const handleNewUserFormSubmit = () => ({
  type: HANDLE_NEW_USER_FORM_SUBMIT,
});

