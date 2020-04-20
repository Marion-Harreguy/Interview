import { ADD_NEW_QUESTION, ADD_NEW_ANSWER, UPDATE_QUESTION, UPDATE_ANSWER, UPDATE_CONTEXT, ADD_INTERVIEWED, CHANGE_META, CHANGE_INTERVIEWED, CHANGE_INTERVIEWED_STRUCTURE, CHANGE_AUTHOR } from '../actions';

export const initialState = {
  meta: {
    id: 1111,
    title: '',
    localisation: '',
    language: '',
    year: '',
    city: '',
    openLicence: false,
    author: {
      name: 'Laura Piccolo',
      status: '',
      structure: {
        name: '',
        city: '',
      },
    },
    interviewed: [
      {
        name: 'Anonyme',
        city: '',
        status: '',
        structure: {
          name: '',
          city: '',
        },
        email: '',
      },
    ],
    tags: [],
  },
  context: '',
  content: [
    {
      id: 144,
      question: '',
      answers: [
        {
          content: '',
          interviewed: '',
        },
      ],
    },
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
        if(index === state.content.length-1){
          return {
            ...set,
            answers: [
              ...set.answers,
              {
                content:'',
                interviewed:'',
              }
            ]
          }
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
        if(index === action.payload.indexQuestion){
          return {
            ...set,
            question: action.payload.value
            }
          }
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
        if(index === action.payload.indexQuestion){
          set.answers[action.payload.indexAnswer] = action.payload.value;
          return {
            ...set,
          }
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
        context: action.payload,
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
              city: '',
              status: '',
              structure: {
                name: '',
                city: '',
              },
              email: '',
            },
          ],
        },
      };
    case CHANGE_META:
      return {
        ...state,
        meta: {
          ...state.meta,
          [action.payload.name]: action.payload.value,
        },
      };
    case CHANGE_INTERVIEWED:
      const newInterviewed = state.meta.interviewed.map((interviewed, index) => {
        if(index === action.payload.index) {
          return {
            ...interviewed,
            [action.payload.target.name]: action.payload.target.value,
          }
        }
        return interviewed;
      });
      console.log(newInterviewed);
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
          if(index === action.payload.index) {
            return {
              ...interviewed,
              structure: {
                ...interviewed.structure,
                [action.payload.target.name]: action.payload.target.value,
              }
            }
          }
          return interviewed;
        });
        console.log(newInterviewed2);
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
              name: action.payload,
            }
          }
        }
    default:
      return state;
  }
};

export default readInterview;
