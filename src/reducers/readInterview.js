import { LOAD_READ_INTERVIEW } from '../actions';

export const initialState = {
  meta: {
    id: 0,
    title: '',
    location: '',
    language: '',
    date: '',
    openLicence: true,
    author: {
      id: 0,
      firstname: '',
      lastname: '',
      status: '',
      email: '',
      structure: {
        name: '',
        city: '',
      },
    },
    interviewed: [
      {
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        status: '',
        structure: {
          name: '',
          city: '',
        },
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
    case LOAD_READ_INTERVIEW:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default readInterview;
