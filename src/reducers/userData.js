/* eslint-disable no-case-declarations */
/* eslint-disable prefer-const */
import { LOG_OUT, CHANGE_ORDER, TOGGLE_SECTION, TOGGLE_CATEGORY, ADD_CATEGORY_CHANGE, ADD_CATEGORY_SUBMIT, CHANGE_FORM_DISABLED, SAVE_INTERVIEW, ADD_WRITTING_INTERVIEW, CHANGE_INTERVIEW_CATEGORIES, UPDATE_USER_STATE, NEW_USER_SUCCESS, CREATE_CATEGORY_DISPLAY, AUTOMATIC_LOG_OK, DELETE_INTERVIEW, MODIFY_USER_INFO, PUBLISH_INTERVIEW, DELETE_CATEGORY, MODIFY_USER_STRUCTURE, UNPUBLISH_INTERVIEW } from '../actions';
import history from '../history';
import { SrcAlphaSaturateFactor } from 'three';

export const initialState = {
  connection: {
    id: 0,
    token: 0,
    isConnected: false,
  },
  user: {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    status: '',
  },
  structure: {
    id: 0,
    name: '',
    city: '',
    sector: '',
  },
  dashboard: {
    publishedInterviews: [
    ],
    writtingInterviews: [
    ],
    savedInterviews: [
    ],
    categories: [
    ],
  },
  library: {
    order: "chronologique",
    publishedInterviews: false,
    savedInterviews: false,
    writtingInterviews: false,
    formDisabled: true,
    categoryDisplay: [],
    // savedResearch: false,
  },

  newCategory: {
    id: 0,
    name: '',
  },
};

const categoryColors = [
  '#FFFE9E',
  '#ABFFC2',
  '#CA9DFF',
  '#FF8587',
  '#7DC0FF',
  '#FF96A4',
  '#FFD38C',
  '#96FFAC',
  '#FFFF56',
  '#A54FFF',
  '#36CAFF',
  '#FFD191',
  '#00FFA7',
  'grey',
];

const userData = (state = initialState, action = {}) => {

  switch (action.type) {
    case PUBLISH_INTERVIEW:
      const publishingInterviewInfos = state.dashboard.writtingInterviews.find((interview) => interview.id == action.payload);
      let newWrittingDashboard = [ {id:0}, ...state.dashboard.writtingInterviews];
      newWrittingDashboard = newWrittingDashboard.filter((interview) => interview.id != action.payload);
      newWrittingDashboard.splice(0, 1);
      const newPublishedDashboard = [ ...state.dashboard.publishedInterviews, { ...publishingInterviewInfos } ];
      // console.log(newWrittingDashboard);
      // console.log(newPublishedDashboard);
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          writtingInterviews: [ ...newWrittingDashboard ],
          publishedInterviews: [ ...newPublishedDashboard ],
        },
      };
    case UNPUBLISH_INTERVIEW:
      const unpublishingInterviewInfos = state.dashboard.publishedInterviews.find((interview) => interview.id == action.payload);
      let newUnpublishedDashboard = [ {id:0}, ...state.dashboard.publishedInterviews];
      newUnpublishedDashboard = newUnpublishedDashboard.filter((interview) => interview.id != action.payload);
      newUnpublishedDashboard.splice(0, 1);
      const newUnwrittingDashboard = [ ...state.dashboard.writtingInterviews, { ...unpublishingInterviewInfos } ];
      // console.log(newWrittingDashboard);
      // console.log(newPublishedDashboard);
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          writtingInterviews: [ ...newUnwrittingDashboard ],
          publishedInterviews: [ ...newUnpublishedDashboard ],
        },
      };
    case MODIFY_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.name]: action.payload.value,
        },
      };
    case CHANGE_ORDER:
      return {
        ...state,
        library: {
          ...state.library,
          order: action.payload,
        },
      };
    case TOGGLE_SECTION:
      return {
        ...state,
        library: {
          ...state.library,
          [action.payload]: !state.library[action.payload],
        },
      };
    case TOGGLE_CATEGORY:
      // Mapping to find the category that has been modified
      // And reverse its "displayed" value
      let newCategories = state.dashboard.categories.map((category, index) => {
        if (category.id === action.payload) {
          return !(state.library.categoryDisplay[index]);
        }
        return state.library.categoryDisplay[index];
      });

      return {
        ...state,
        library: {
          ...state.library,
          categoryDisplay: [
            ...newCategories,
          ],
        },
      };

    case DELETE_CATEGORY:
      const newCategoriesDelete = state.dashboard.categories.filter((category) => Number(category.id) !== Number(action.payload));
      const newDashboard = {
        writtingInterviews: [
          ...state.dashboard.writtingInterviews.map((interview) => {
            return {
              ...interview,
              categories: [...interview.categories.filter((category) => Number(category) !== Number(action.payload))],
            };
          }),
        ],
        publishedInterviews: [
          ...state.dashboard.publishedInterviews.map((interview) => {
            return {
              ...interview,
              categories: [...interview.categories.filter((category) => Number(category) !== Number(action.payload))],
            };
          }),
        ],
        savedInterviews: [
          ...state.dashboard.savedInterviews.map((interview) => {
            return {
              ...interview,
              categories: [...interview.categories.filter((category) => Number(category) !== Number(action.payload))],
            };
          }),
        ],
        categories: [...newCategoriesDelete],
      };
      return {
        ...state,
        dashboard: {
          ...newDashboard,
        },
      };

    case MODIFY_USER_STRUCTURE:
      return {
        ...state,
        structure: {
          ...state.structure,
          [action.payload.name]: action.payload.value,
        },
      };

    case ADD_CATEGORY_SUBMIT:
      if (state.newCategory.name) {
        const alreadyExistingColors = state.dashboard.categories.map((category) => category.color);
        const remainingColors = categoryColors.filter((color) => !alreadyExistingColors.includes(color));
        return {
          ...state,
          dashboard: {
            ...state.dashboard,
            categories: [
              ...state.dashboard.categories,
              {
                ...state.newCategory,
                color: remainingColors[0],
              },
            ],
          },
          newCategory: {
            ...state.newCategory,
            name: '',
          },
          library: {
            ...state.library,
            categoryDisplay: [
              ...state.library.categoryDisplay,
              true,
            ],
          },
        };
      }
      break;
    case ADD_CATEGORY_CHANGE:
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          name: action.payload,
        },
      };
    case CHANGE_FORM_DISABLED:
      return {
        ...state,
        library: {
          ...state.library,
          formDisabled: !state.library.formDisabled,
        },
      };
    case SAVE_INTERVIEW:
      let alreadySaved = false;
      let newSavedInterview = state.dashboard.savedInterviews.map((interview, index) => {
        if (interview.id !== action.payload.id) return interview;
        else alreadySaved = index;
      });
      if (!alreadySaved) {
        newSavedInterview.push({
          id: action.payload.id,
          name: action.payload.name,
          categories: [...action.payload.categoryList],
        });
      }
      else {
        newSavedInterview.splice(alreadySaved, 1);
      }
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          savedInterviews: [
            ...newSavedInterview,
          ],
        },
      };
    case ADD_WRITTING_INTERVIEW:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          writtingInterviews: [
            ...state.dashboard.writtingInterviews,
            {
              id: 69,
              title: '',
              categories: [],
              publish: false,
            },
          ],
        },
      };
    case CHANGE_INTERVIEW_CATEGORIES:
      let newWrittingInterviews = state.dashboard.writtingInterviews.map((interview) => {
        if (interview.id === action.payload.interviewId) {
          return {
            ...interview,
            categories: [...action.payload.categories],
          };
        }
        return interview;
      });
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          writtingInterviews: [
            ...newWrittingInterviews,
          ],
        },
      };
    case UPDATE_USER_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case NEW_USER_SUCCESS:
      return {
        ...initialState,
        connection: {
          ...action.payload,
        },
      };
    case CREATE_CATEGORY_DISPLAY:
      const categoryDisplay = state.dashboard.categories.map(() => {
        return true;
      });
      return {
        ...state,
        library: {
          ...state.library,
          categoryDisplay: [...categoryDisplay],
        },
      };
    case AUTOMATIC_LOG_OK:
      return {
        ...state,
        connection: {
          ...action.payload,
        },
      };
    case DELETE_INTERVIEW:
      const lastPublishedInterview = state.dashboard.publishedInterviews.filter((interview) => interview.id !== action.payload);
      const lastWrittingInterviews = state.dashboard.writtingInterviews.filter((interview) => interview.id !== action.payload);

      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          writtingInterviews: [
            ...lastWrittingInterviews,
          ],
          publishedInterviews: [
            ...lastPublishedInterview,
          ],
        },
      };
    case LOG_OUT:
      console.log("loging out");
      localStorage.clear();
      history.push('/');
      return {
        ...state,
        connection: {
          id: 0,
          token: 0,
          isConnected: false,
        },
      };
    default:
      return state;
  }
};

export default userData;
