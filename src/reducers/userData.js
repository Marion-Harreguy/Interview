/* eslint-disable no-case-declarations */
/* eslint-disable prefer-const */
import { CHANGE_ORDER, TOGGLE_SECTION, TOGGLE_CATEGORY, ADD_CATEGORY_CHANGE, ADD_CATEGORY_SUBMIT, CHANGE_FORM_DISABLED, SAVE_INTERVIEW, ADD_WRITTING_INTERVIEW, CHANGE_INTERVIEW_CATEGORIES, UPDATE_USER_STATE, NEW_USER_SUCCESS, CREATE_CATEGORY_DISPLAY } from '../actions';

export const initialState = {
  isConnected: true,
  dataUser: {
    id: 181,
    firstname: 'Patrick',
    lastname: 'Lebon',
    email: 'vrocher@tiscali.fr',
    status: 'Prof',
    token: 'azertjklmazejk',
  },
  dataStructure: {
    id: 68,
    name: 'Peltier  dMillet SARL',
    city: 'Lejeune',
    sector: 'Le pouvoir de concrétiser vos projets à l\'état pur',
  },
  dashboard: {
    publishedInterviews: [
      {
        id: 61,
        title: 'Nesciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [477],
      },
      {
        id: 63,
        title: 'Mirrupti cum ratione animi maxime enim.',
        categories: [487, 488],
      },
      {
        id: 69,
        title: 'Ahciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [477],
      },
      {
        id: 80,
        title: 'Corrupti cum ratione animi maxime enim.',
        categories: [487, 488],
      },
    ],
    writtingInterviews: [
      {
        id: 61,
        title: 'Nesciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [477],
      },
      {
        id: 63,
        title: 'Mirrupti cum ratione animi maxime enim.',
        categories: [487, 488],
      },
      {
        id: 69,
        title: 'Ahciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [477],
      },
      {
        id: 80,
        title: 'Corrupti cum ratione animi maxime enim.',
        categories: [487, 488],
      },
    ],
    savedInterviews: [
      {
        id: 63,
        title: 'Corrupti cum ratione animi maxime enim.',
        categories: [477, 488],
      },
      {
        id: 64,
        title: 'Consequatur accusantium quia porro minus voluptates dignissimos est.',
        categories: [488],
      },
    ],
    categories: [
      {
        id: 477,
        name: 'accusantium',
        color: '#177456',
      },
      {
        id: 482,
        name: 'sapiente',
        color: '#123926',
      },
      {
        id: 487,
        name: 'et',
        color: '#100456',
      },
      {
        id: 488,
        name: 'quas',
        color: '#100006',
      },
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
    displayed: true,
  },
};

const categoryColors = [
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
];

const userData = (state = initialState, action = {}) => {

  switch (action.type) {
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
    case ADD_CATEGORY_SUBMIT:
      if (state.newCategory.name) {
        return {
          ...state,
          dashboard: {
            ...state.dashboard,
            categories: [
              ...state.dashboard.categories,
              {
                ...state.newCategory,
              },
            ],
          },
          newCategory: {
            ...state.newCategory,
            name: '',
            color: categoryColors[state.dashboard.categories.length],
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
          categories: [...action.payload.categories],
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
        isConnected: true,
      };
    case NEW_USER_SUCCESS:
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          id: action.payload.id,
          token: action.payload.token,
        },
      };
    case CREATE_CATEGORY_DISPLAY:
      const categoryDisplay = state.dashboard.categories.map((category) => {
        return true;
      });
      return {
        ...state,
        library: {
          ...state.library,
          categoryDisplay: [...categoryDisplay],
        },
      };
    default:
      return state;
  }
};

export default userData;
