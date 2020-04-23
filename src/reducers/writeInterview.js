/* eslint-disable no-case-declarations */
import {
  ADD_NEW_QUESTION,
  ADD_NEW_ANSWER,
  UPDATE_QUESTION,
  UPDATE_ANSWER,
  UPDATE_CONTEXT,
  ADD_INTERVIEWED,
  CHANGE_META,
  CHANGE_INTERVIEWED,
  CHANGE_INTERVIEWED_STRUCTURE,
  CHANGE_AUTHOR,
  CHANGE_AUTHOR_STRUCTURE,
  LOAD_WRITE_INTERVIEW,
  FILL_AUTHOR,
} from '../actions';

export const initialState = {
  meta: {
    id: 0,
    title: '',
    localisation: '',
    // coordinates: [],
    language: '',
    date: '',
    openLicence: false,
    isPublished: false,
    author: {
      id: '12',
      firstname: '',
      lastname: '',
      status: '',
      email: '',
      structure: [{
        name: '',
        city: '',
      }],
    },
    interviewed: [
      {
        firstname: 'Anonyme',
        lastname: 'Anonyme',
        job: 'undefined',
        email: 'anonyme@inter.view',
        structure: [{
          name: 'undefined',
          city: 'undefined',
          sector: 'unddefined',
        }],
      },
    ],
    tags: [],
    context: '',
  },
  content: [
  ],
};

const readInterview = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_NEW_QUESTION:
      return {
        ...state,
        content: [
          ...state.content,
          {
            question: '',
            answers: [],
          },
        ],
      };
    case ADD_NEW_ANSWER:
      const newContentAdd = state.content.map((set, index) => {
        if (index === state.content.length - 1) {
          return {
            ...set,
            answers: [
              ...set.answers,
              {
                content: '',
                interviewed: 'AA',
              },
            ],
          };
        }
        return set;
      });
      return {
        ...state,
        content: [
          ...newContentAdd,
        ],
      };
    case UPDATE_QUESTION:
      const newContentUpdate = state.content.map((set, index) => {
        if (index === action.payload.indexQuestion) {
          return {
            ...set,
            question: action.payload.value,
          };
        };
        return set;
      });
      return {
        ...state,
        content: [
          ...newContentUpdate,
        ],
      };
    case UPDATE_ANSWER:
      const newContentUpdateA = state.content.map((set, index) => {
        if (index === action.payload.indexQuestion) {
          set.answers[action.payload.indexAnswer] = action.payload.value;
          return {
            ...set,
          };
        }
        return set;
      });
      return {
        ...state,
        content: [
          ...newContentUpdateA,
        ],
      };
    case UPDATE_CONTEXT:
      return {
        ...state,
        meta: {
          ...state.meta,
          context: action.payload,
        },
      };
    case ADD_INTERVIEWED:
      return {
        ...state,
        meta: {
          ...state.meta,
          interviewed: [
            ...state.meta.interviewed,
            {
              name: '',
              email: '',
              status: '',
              structure: {
                name: '',
                city: '',
              },
            },
          ],
        },
      };
    case CHANGE_META:
      let newOpenLicence = state.meta.openLicence;
      if (action.payload.name === 'openLicence') {
        newOpenLicence = !newOpenLicence;
      }
      return {
        ...state,
        meta: {
          ...state.meta,
          [action.payload.name]: action.payload.value,
          openLicence: newOpenLicence,
        },
      };
    case CHANGE_INTERVIEWED:
      const newInterviewed = state.meta.interviewed.map((interviewed, index) => {
        if (index === action.payload.index) {
          return {
            ...interviewed,
            [action.payload.target.name]: action.payload.target.value,
          };
        }
        return interviewed;
      });
      return {
        ...state,
        meta: {
          ...state.meta,
          interviewed: [
            ...newInterviewed,
          ],
        },
      };
    case CHANGE_INTERVIEWED_STRUCTURE:
      const newInterviewed2 = state.meta.interviewed.map((interviewed, index) => {
        if (index === action.payload.index) {
          return {
            ...interviewed,
            structure: {
              ...interviewed.structure,
              [action.payload.target.name]: action.payload.target.value,
            },
          };
        }
        return interviewed;
      });
      return {
        ...state,
        meta: {
          ...state.meta,
          interviewed: [
            ...newInterviewed2,
          ],
        },
      };
    case CHANGE_AUTHOR:
      return {
        ...state,
        meta: {
          ...state.meta,
          author: {
            ...state.meta.author,
            [action.payload.name]: [action.payload.value],
          },
        },
      };
    case CHANGE_AUTHOR_STRUCTURE:
      return {
        ...state,
        meta: {
          ...state.meta,
          author: {
            ...state.meta.author,
            structure: {
              ...state.meta.author.structure,
              [action.payload.name]: [action.payload.value],
            },
          },
        },
      };
    case LOAD_WRITE_INTERVIEW:
      return {
        ...state,
        ...action.payload,
      };

    case FILL_AUTHOR:
      return {
        ...initialState,
        meta: {
          ...initialState.meta,
          author: {
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export default readInterview;
