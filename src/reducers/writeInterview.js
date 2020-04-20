import { ADD_NEW_QUESTION, ADD_NEW_ANSWER, UPDATE_QUESTION, UPDATE_ANSWER } from '../actions';

export const initialState = {
  meta: {
    id: 1111,
    title: '',
    location: '',
    language: '',
    year: '',
    city: '',
    openLicence: false,
    author: {
      name: '',
      status: '',
      structure: {
        name: '',
        city: '',
      },
    },
    interviewed: [
      {
        name: '',
        city: '',
        status: '',
        structure: {
          name: '',
          city: '',
        },
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

let temporaryID = 100;

const readInterview = (state = initialState, action = {}) => {
  temporaryID ++;
  switch (action.type) {
    case ADD_NEW_QUESTION:
      return {
        ...state,
        content: [
          ...state.content,
          {
            // temporaryID: temporaryID,
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
    default:
      return state;
  }
};

export default readInterview;
