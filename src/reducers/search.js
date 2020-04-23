import { SEARCH_INPUT_CHANGE } from '../actions';

export const initialState = {
  title: '',
  date: '',
  city: '',
  language: '',
  name: '',
  interviewed: {
    name: '',
    structure: '',
  },
  tags: '',
  openSource: false,
};

const search = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default search;
