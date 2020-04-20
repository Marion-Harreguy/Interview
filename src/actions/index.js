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
export const ADD_CATEGORY_CHANGE = 'ADD_CATEGORY_CHANGE';
export const ADD_CATEGORY_SUBMIT = 'ADD_CATEGORY_SUBMIT';
export const MODIFY_USER_INFO_API = 'MODIFY_USER_INFO_API';
export const CHANGE_FORM_DISABLED = 'CHANGE_FORM_DISABLED';
export const SAVE_INTERVIEW = 'SAVE_INTERVIEW';
export const FIND_INTERVIEW_BY_SLUG = 'FIND_INTERVIEW_BY_SLUG';
export const LOAD_READ_INTERVIEW = 'LOAD_READ_INTERVIEW';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const ADD_NEW_ANSWER = 'ADD_NEW_ANSWER';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const UPDATE_CONTEXT = 'UPDATE_CONTEXT';
export const DELETE_INTERVIEW = 'DELETE_INTERVIEW';
export const PUBLISH_INTERVIEW = 'PUBLISH_INTERVIEW';
export const CHANGE_META = 'CHANGE_META';
export const CHANGE_INTERVIEW_CATEGORIES = 'CHANGE_INTERVIEW_CATEGORIES';
export const ADD_WRITTING_INTERVIEW = 'ADD_WRITTING_INTERVIEW';
export const ADD_INTERVIEWED = 'ADD_INTERVIEWED';
export const CHANGE_INTERVIEWED = 'CHANGE_INTERVIEWED';
export const CHANGE_INTERVIEWED_STRUCTURE = 'CHANGE_INTERVIEWED_STRUCTURE';
export const CHANGE_AUTHOR = 'CHANGE_AUTHOR';

// NEW USER COMPONENT 
export const newUserInputChange = (payload) => ({
  type: NEW_USER_INPUT_CHANGE,
  payload,
});

export const newUserSubmit = () => ({
  type: NEW_USER_SUBMIT,
});

// FORGOTTEN COMPONENT
export const forgottenPasswordInputChange = (payload) => ({
  type: FORGOTTEN_PASSWORD_INPUT_CHANGE,
  payload,
});

export const forgottenPasswordSubmit = () => ({
  type: FORGOTTEN_PASSWORD_SUBMIT,
});

// LOGIN COMPONENT
export const loginInputChange = (payload) => ({
  type: LOGIN_INPUT_CHANGE,
  payload,
});

export const loginSubmit = () => ({
  type: LOGIN_SUBMIT,
});

// USER LIBRARY COMPONENT
export const modifyUserInfo = (payload) => ({
  type: MODIFY_USER_INFO,
  payload,
});

export const modifyUserInfoAPI = () => ({
  type: MODIFY_USER_INFO_API,
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

export const addCategoryChange = (payload) => ({
  type: ADD_CATEGORY_CHANGE,
  payload,
});


export const addCategorySubmit = () => ({
  type: ADD_CATEGORY_SUBMIT,
});

export const changeFormDisabled = () => ({
  type: CHANGE_FORM_DISABLED,
});

// READ META
export const saveInterview = (payload) => ({
  type: SAVE_INTERVIEW,
  payload,
});

export const findInterviewBySlug = (payload) => ({
  type: FIND_INTERVIEW_BY_SLUG,
  payload,
});

// WRITE
export const addNewAnswer = () => ({
  type: ADD_NEW_ANSWER,
});

export const addNewQuestion = () => ({
  type: ADD_NEW_QUESTION,
});

export const updateAnswer = (payload) => ({
  type: UPDATE_ANSWER,
  payload,
});

export const updateQuestion = (payload) => ({
  type: UPDATE_QUESTION,
  payload,
});

export const updateContext = (payload) => ({
  type: UPDATE_CONTEXT,
  payload,
});

// WRITE META

export const deleteInterview = (payload) => ({
  type: DELETE_INTERVIEW,
  payload,
});

export const publishInterview = (payload) => ({
  type: PUBLISH_INTERVIEW,
  payload,
});

export const changeMeta = (payload) => ({
  type: CHANGE_META,
  payload,
});

export const addWrittingInterview = (payload) => ({
  type: ADD_WRITTING_INTERVIEW,
  payload,
});

export const changeInterviewCategories = (payload) => ({
  type: CHANGE_INTERVIEW_CATEGORIES,
  payload,
});

export const addInterviewed = () => ({
  type: ADD_INTERVIEWED,
});

export const changeInterviewed = (payload) => ({
  type: CHANGE_INTERVIEWED,
  payload,
});

export const changeInterviewStructure = (payload) => ({
  type: CHANGE_INTERVIEWED_STRUCTURE,
  payload,
});

export const changeAuthor = (payload) => ({
  type: CHANGE_AUTHOR,
  payload
})