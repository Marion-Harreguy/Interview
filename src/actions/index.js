// APP
export const AUTOMATIC_LOG = 'AUTOMATIC_LOG';
export const AUTOMATIC_LOG_OK = 'AUTOMATIC_LOG_OK';

// FOOTER
export const LOG_OUT = 'LOG_OUT';
export const TOGGLE_OPENED = 'TOGGLE_OPENED';

// NEW USER
export const NEW_USER_INPUT_CHANGE = 'NEW_USER_INPUT_CHANGE';
export const NEW_USER_SUBMIT = 'NEW_USER_SUBMIT';

// FORGOTTEN PASSWORD
export const FORGOTTEN_PASSWORD_INPUT_CHANGE = 'FORGOTTEN_PASSWORD_INPUT_CHANGE';
export const FORGOTTEN_PASSWORD_SUBMIT = 'FORGOTTEN_PASSWORD_SUBMIT';

// LOGIN
export const LOGIN_INPUT_CHANGE = 'LOGIN_INPUT_CHANGE';
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

// USER LIBRARY
export const CHANGE_ORDER = 'CHANGE_ORDER';
export const TOGGLE_SECTION = 'TOGGLE_SECTION';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const ADD_CATEGORY_CHANGE = 'ADD_CATEGORY_CHANGE';
export const ADD_CATEGORY_SUBMIT = 'ADD_CATEGORY_SUBMIT';
export const CHANGE_FORM_DISABLED = 'CHANGE_FORM_DISABLED';
export const MODIFY_USER_INFO = 'MODIFY_USER_INFO';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const MODIFY_USER_STRUCTURE = 'MODIFY_USER_STRUCTURE';

// READ
export const SAVE_INTERVIEW = 'SAVE_INTERVIEW';

// WRITE — Right
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const ADD_NEW_ANSWER = 'ADD_NEW_ANSWER';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const UPDATE_CONTEXT = 'UPDATE_CONTEXT';
export const DELETE_ANSWER = 'DELETE_ANSWER';
export const DELETE_QUESTION = 'DELETE_QUESTION';
// WRITE - Left Buttons
export const DELETE_INTERVIEW = 'DELETE_INTERVIEW';
export const PUBLISH_INTERVIEW = 'PUBLISH_INTERVIEW';
export const UNPUBLISH_INTERVIEW = 'UNPUBLISH_INTERVIEW';
// WRITE - Meta Changes
export const CHANGE_META = 'CHANGE_META';
export const CHANGE_INTERVIEW_CATEGORIES = 'CHANGE_INTERVIEW_CATEGORIES';
export const ADD_WRITTING_INTERVIEW = 'ADD_WRITTING_INTERVIEW';
export const ADD_INTERVIEWED = 'ADD_INTERVIEWED';
export const CHANGE_INTERVIEWED = 'CHANGE_INTERVIEWED';
export const CHANGE_INTERVIEWED_STRUCTURE = 'CHANGE_INTERVIEWED_STRUCTURE';
export const CHANGE_AUTHOR = 'CHANGE_AUTHOR';
export const CHANGE_AUTHOR_STRUCTURE = 'CHANGE_AUTHOR_STRUCTURE';
export const FILL_AUTHOR = 'FILL_AUTHOR';
export const CHANGE_COORDINATES = 'CHANGE_COORDINATES';
export const CHOOSE_INITIALES = 'CHOOSE_INITIALES';
export const DELETE_INTERVIEWED = 'DELETE_INTERVIEWED';

// AJAX REQUESTS
export const UPDATE_USER_PUT = 'UPDATE_USER_PUT';
export const UPDATE_USER_GET = 'UPDATE_USER_GET';
export const INTERVIEW_GET = 'INTERVIEW_GET';
export const WRITE_INTERVIEW_PUT = 'WRITE_INTERVIEW_PUT';
export const WRITE_INTERVIEW_DELETE = 'WRITE_INTERVIEW_DELETE';
export const WRITE_INTERVIEW_CREATE = 'WRITE_INTERVIEW_CREATE';

// TRIGGERED BY MIDDLEWARE
export const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS';
export const LOAD_READ_INTERVIEW = 'LOAD_READ_INTERVIEW';
export const LOAD_WRITE_INTERVIEW = 'LOAD_WRITE_INTERVIEW';
export const UPDATE_USER_STATE = 'UPDATE_USER_STATE';
export const CREATE_CATEGORY_DISPLAY = 'CREATE_CATEGORY_DISPLAY';
export const UPLOAD_RESULTS = 'UPLOAD_RESULTS';

// SEARCH
export const SEARCH_INPUT_CHANGE = 'SEARCH_INPUT_CHANGE';
export const SEARCH_SUBMIT = 'SEARCH_SUBMIT';
export const CHANGE_MODE = 'CHANGE_MODE';
export const LOAD_ID = 'LOAD_ID';
export const EMPTY_RESULTS = 'EMPTY_RESULTS';
export const EMPTY_FORM = 'EMPTY_FORM';

// APP
export const automaticLog = (payload) => ({
  type: AUTOMATIC_LOG,
  payload,
});

export const automaticLogOk = (payload) => ({
  type: AUTOMATIC_LOG_OK,
  payload,
});

// FOOTER
export const logOut = () => ({
  type: LOG_OUT,
});


// NEW USER
export const newUserInputChange = (payload) => ({
  type: NEW_USER_INPUT_CHANGE,
  payload,
});

export const newUserSubmit = () => ({
  type: NEW_USER_SUBMIT,
});

// FORGOTTEN PASSWORD
export const forgottenPasswordInputChange = (payload) => ({
  type: FORGOTTEN_PASSWORD_INPUT_CHANGE,
  payload,
});

export const forgottenPasswordSubmit = () => ({
  type: FORGOTTEN_PASSWORD_SUBMIT,
});

// LOGIN
export const loginInputChange = (payload) => ({
  type: LOGIN_INPUT_CHANGE,
  payload,
});

export const loginSubmit = () => ({
  type: LOGIN_SUBMIT,
});

// USER LIBRARY
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

export const modifyUserInfo = (payload) => ({
  type: MODIFY_USER_INFO,
  payload,
});

export const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload,
});

export const modifyUserStructure = (payload) => ({
  type: MODIFY_USER_STRUCTURE,
  payload,
});

// READ
export const saveInterview = (payload) => ({
  type: SAVE_INTERVIEW,
  payload,
});


// WRITE — Right
export const addNewAnswer = (payload) => ({
  type: ADD_NEW_ANSWER,
  payload
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

// WRITE — Left Buttons
export const deleteInterview = (payload) => ({
  type: DELETE_INTERVIEW,
  payload,
});

export const publishInterview = (payload) => ({
  type: PUBLISH_INTERVIEW,
  payload,
});

export const unpublishInterview = (payload) => ({
  type: UNPUBLISH_INTERVIEW,
  payload,
});

// WRITE — Meta Changes
export const changeMeta = (payload) => ({
  type: CHANGE_META,
  payload,
});

export const changeInterviewCategories = (payload) => ({
  type: CHANGE_INTERVIEW_CATEGORIES,
  payload,
});

export const addWrittingInterview = (payload) => ({
  type: ADD_WRITTING_INTERVIEW,
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
  payload,
});

export const changeAuthorStructure = (payload) => ({
  type: CHANGE_AUTHOR_STRUCTURE,
  payload,
});

export const fillAuthor = (payload) => ({
  type: FILL_AUTHOR,
  payload,
});

export const changeCoordinates = (payload) => ({
  type: CHANGE_COORDINATES,
  payload,
});

export const deleteAnswer = (payload) => ({
  type: DELETE_ANSWER,
  payload,
});

export const deleteQuestion = (payload) => ({
  type: DELETE_QUESTION,
  payload,
});

export const chooseInitiales = (payload) => ({
  type: CHOOSE_INITIALES,
  payload,
});

export const deleteInterviewed = (payload) => ({
  type: DELETE_INTERVIEWED,
  payload,
});

// MIDDLEWARE

export const updateUserPut = () => ({
  type: UPDATE_USER_PUT,
});

export const updateUserGet = () => ({
  type: UPDATE_USER_GET,
});

export const interviewGet = (payload) => ({
  type: INTERVIEW_GET,
  payload,
});

export const writeInterviewPut = (payload) => ({
  type: WRITE_INTERVIEW_PUT,
  payload,
});

export const writeInterviewDelete = (payload) => ({
  type: WRITE_INTERVIEW_DELETE,
  payload,
});

export const writeInterviewCreate = () => ({
  type: WRITE_INTERVIEW_CREATE,
});

// TRIGGERED BY MIDDLEWARE
export const newUserSuccess = (payload) => ({
  type: NEW_USER_SUCCESS,
  payload,
});

export const loadReadInterview = (payload) => ({
  type: LOAD_READ_INTERVIEW,
  payload,
});


export const loadWriteInterview = (payload) => ({
  type: LOAD_WRITE_INTERVIEW,
  payload,
});

export const updateUserState = (payload) => ({
  type: UPDATE_USER_STATE,
  payload,
});

export const createCategoryDisplay = () => ({
  type: CREATE_CATEGORY_DISPLAY,
});

export const uploadResults = (payload) => ({
  type: UPLOAD_RESULTS,
  payload,
});

// SEARCH
export const searchInputChange = (payload) => ({
  type: SEARCH_INPUT_CHANGE,
  payload,
});

export const searchSubmit = () => ({
  type: SEARCH_SUBMIT,
});

export const changeMode = (payload) => ({
  type: CHANGE_MODE,
  payload,
});

export const loadId = (payload) => ({
  type: LOAD_ID,
  payload,
});

export const emptyResults = () => ({
  type: EMPTY_RESULTS,
});

export const emptyForm = () => ({
  type: EMPTY_FORM,
});
