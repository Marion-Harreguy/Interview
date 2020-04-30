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
  CHANGE_COORDINATES,
  DELETE_ANSWER,
  DELETE_QUESTION,
  LOAD_ID,
  CHOOSE_INITIALES,
  PUBLISH_INTERVIEW,
  UNPUBLISH_INTERVIEW,
  DELETE_INTERVIEWED,
} from '../actions';

export const initialState = {
  meta: {
    id: 0,
    title: '',
    location: '',
    coordinates: [0, 0],
    context: '',
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
        sector: '',
        id: '',
      }],
    },
    interviewed: [
      {
        firstname: 'Anonyme',
        lastname: 'Anonyme',
        job: 'undefined',
        email: 'anonyme@inter.view',
        id: 0,
        structure: [{
          name: 'undefined',
          city: 'undefined',
          sector: 'undefined',
          id: 0,
        }],
      },
    ],
    tags: [],
  },
  content: [
  ],
};

const readInterview = (state = initialState, action = {}) => {
  switch (action.type) {
    case PUBLISH_INTERVIEW:
      return {
        ...state,
        meta: {
          ...state.meta,
          isPublished: true,
        },
      };
    case ADD_NEW_QUESTION:
      return {
        ...state,
        content: [
          ...state.content,
          {
            question: '',
            answer: [],
          },
        ],
      };

    case UNPUBLISH_INTERVIEW:
      return {
        ...state,
        meta: {
          ...state.meta,
          isPublished: false,
        },
      };
    case ADD_NEW_QUESTION:
      return {
        ...state,
        content: [
          ...state.content,
          {
            question: '',
            answer: [],
          },
        ],
      };
    case ADD_NEW_ANSWER:
      const newContentAdd = state.content.map((set, index) => {
        if (index === state.content.length - 1) {
          return {
            ...set,
            answer: [
              ...set.answer,
              {
                content: '',
                interviewed: action.payload,
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
          set.answer[action.payload.indexAnswer] = {
            ...set.answer[action.payload.indexAnswer],
            content: action.payload.value,
          };
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

    case CHOOSE_INITIALES:
      const initialesContentUpdate = state.content.map((set, index) => {
        if (index === action.payload.indexQuestion) {
          set.answer[action.payload.indexAnswer] = {
            ...set.answer[action.payload.indexAnswer],
            interviewed: action.payload.value,
          };
          return {
            ...set,
          };
        }
        return set;
      });
      return {
        ...state,
        content: [
          ...initialesContentUpdate,
        ],
      };
    case DELETE_INTERVIEWED:
      let newInterviewedDelete = [];
      if (state.meta.interviewed.length === 1) {
        newInterviewedDelete = [{
          firstname: 'Anonyme',
          lastname: 'Anonyme',
          job: 'undefined',
          id: 0,
          email: 'anonyme@inter.view',
          structure: {
            name: 'undefined',
            city: 'undefined',
            sector: 'undefined',
            id: 0,
          },
        }];
      }
      else newInterviewedDelete = state.meta.interviewed.filter((interviewed, index) => index !== action.payload);
      return {
        ...state,
        meta: {
          ...state.meta,
          interviewed: [
            ...newInterviewedDelete,
          ],
        },
      };
    case DELETE_QUESTION:
      const deleteContentUpdate = state.content.filter((set, index) => (index !== action.payload.indexQuestion));
      return {
        ...state,
        content: [
          ...deleteContentUpdate,
        ],
      };
    case DELETE_ANSWER:
      const deleteContentUpdateA = state.content.map((set, index) => {
        if (index === action.payload.indexQuestion) {
          set.answer = set.answer.filter((answer, indexA) => (indexA !== action.payload.indexAnswer));
          return set;
        }
        return set;
      });
      return {
        ...state,
        content: [
          ...deleteContentUpdateA,
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
      let newInterviewedAdd = {};
      if (state.meta.interviewed.length === 0) {
        newInterviewedAdd = {
          firstname: '',
          lastname: '',
          job: '',
          id: 0,
          email: '',
          structure: {
            name: '',
            city: '',
            sector: '',
            id: 0,
          },
        };
      }
      else {
        newInterviewedAdd = {
          firstname: '',
          lastname: '',
          job: '',
          id: 0,
          email: '',
          structure: {
            name: '',
            city: '',
            sector: '',
            id: 0,
          },
        };
      }
      return {
        ...state,
        meta: {
          ...state.meta,
          interviewed: [
            ...state.meta.interviewed,
            {
              ...newInterviewedAdd,
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
    case LOAD_ID:
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      };

    case FILL_AUTHOR:
      return {
        ...initialState,
        meta: {
          ...initialState.meta,
          author: {
            ...action.payload,
          },
          tags: [],
        },
      };
    case CHANGE_COORDINATES:
      return {
        ...state,
        meta: {
          ...state.meta,
          coordinates: [
            ...action.payload,
          ],
        },
      };
    default:
      return state;
  }
};

export default readInterview;
