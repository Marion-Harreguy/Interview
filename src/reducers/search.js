import { SEARCH_INPUT_CHANGE, CHANGE_MODE, UPLOAD_RESULTS } from '../actions';

export const initialState = {
  form: {
    title: '',
    city: '',
    language: '',
    name: '',
    interviewed: '',
    tags: '',
    openSource: false,
    yearBegin: 1990,
    yearEnd: 2020,
  },
  mode: 'list',
  results: [
    // {
  //   meta: {
  //     id: 13,
  //     title: 'Bonjour',
  //     location: 'Paris',
  //     coordinates: [254, -14],
  //     language: 'Français',
  //     date: '2012',
  //     openLicence: true,
  //     author: {
  //       id: 14,
  //       firstname: 'Laura',
  //       lastname: 'Piccolo',
  //       status: 'fezegrez',
  //       email: 'grezgrezgrezg',
  //       structure: {
  //         name: 'grezgrez',
  //         city: 'grezgregre',
  //         id: 'fezfenzf',
  //         sector: 'dfghjk',
  //       },
  //     },
  //     interviewed: [
  //       {
  //         id: 46,
  //         firstname: 'gfdsgfds',
  //         lastname: 'gfdgfdgsfd',
  //         email: 'gfdsgfdsgfd',
  //         job: 'gfdgfdgfd',
  //         structure: {
  //           name: 'gfdsgfdgfds',
  //           city: 'gfdsgfdgfd',
  //         },
  //       },
  //     ],
  //     tags: ['yes','yas','verv'],
  //     context: 'qdsfghjk',
  //   },
  // },

  // {
  //   meta: {
  //     id: 143,
  //     title: 'Bogesrgezrg',
  //     location: 'Paris',
  //     coordinates: [122, -234],
  //     language: 'Français',
  //     date: '2006',
  //     openLicence: true,
  //     author: {
  //       id: 124,
  //       firstname: 'Laura',
  //       lastname: 'Piccolo',
  //       status: 'fezegrez',
  //       email: 'grezgrezgrezg',
  //       structure: {
  //         name: 'grezgrez',
  //         city: 'grezgregre',
  //       },
  //     },
  //     interviewed: [
  //       {
  //         id: 46,
  //         firstname: 'gfdsgfds',
  //         lastname: 'gfdgfdgsfd',
  //         email: 'gfdsgfdsgfd',
  //         status: 'gfdgfdgfd',
  //         structure: {
  //           name: 'gfdsgfdgfds',
  //           city: 'gfdsgfdgfd',
  //         },
  //       },
  //     ],
  //     tags: ['yes','yas','verv'],
  //     context: 'qdsfghjk',
  //   },
  // },
   ],
};

const search = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_INPUT_CHANGE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        },
      };
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case UPLOAD_RESULTS:
      return {
        ...state,
        results: [
          ...action.payload,
        ],
      };
    default:
      return state;
  }
};

export default search;
