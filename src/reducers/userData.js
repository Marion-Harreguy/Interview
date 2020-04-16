import { MODIFY_USER_INFO, CHANGE_ORDER, TOGGLE_SECTION, TOGGLE_CATEGORY } from '../actions';

export const initialState = {
  isConnected: true,
  dataUser: {
    id: 181,
    firstname: 'Patrick',
    lastname: 'Lebon',
    email: 'vrocher@tiscali.fr',
    status: 'Prof',
    biography: 'Enim ipsum inventore sed libero et velit qui suscipit. Deserunt laudantium quibusdam enim nostrum soluta qui ipsam non. Velit reiciendis aperiam et fuga.',
  },
  dataStructure: [
    {
      id: 68,
      name: 'Peltier  dMillet SARL',
      city: 'Lejeune',
      sector: 'Le pouvoir de concrétiser vos projets à l\'état pur'
    },
    {
      id: 70,
      name: 'Peron',
      city: 'SchmittBourg',
      sector: 'La liberté d\'avancer sans soucis',
    },
  ],
  dashboard: {
    publishedInterviews: [
      {
        id: 61,
        title: 'Nesciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [477],
        publish: true,
      },
      {
        id: 63,
        title: 'Mirrupti cum ratione animi maxime enim.',
        categories: [487, 488],
        publish: true,
      },
      {
        id: 69,
        title: 'Ahciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [477],
        publish: true,
      },
      {
        id: 80,
        title: 'Corrupti cum ratione animi maxime enim.',
        categories: [487, 488],
        publish: true,
      },
    ],
    writtingInterviews: [
      {
        id: 61,
        title: 'Nesciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [477],
        publish: true,
      },
      {
        id: 63,
        title: 'Mirrupti cum ratione animi maxime enim.',
        categories: [487, 488],
        publish: true,
      },
      {
        id: 69,
        title: 'Ahciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [477],
        publish: true,
      },
      {
        id: 80,
        title: 'Corrupti cum ratione animi maxime enim.',
        categories: [487, 488],
        publish: true,
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
        displayed: true,
      },
      {
        id: 482,
        name: 'sapiente',
        color: '#123926',
        displayed: true,
      },
      {
        id: 487,
        name: 'et',
        color: '#100456',
        displayed: true,
      },
      {
        id: 488,
        name: 'quas',
        color: '#100006',
        displayed: true,
      },
    ],
  },
  library: {
    order: "chronologique",
    publishedInterviews: false,
    savedInterviews: false,
    writtingInterviews: false,
    // savedResearch: false,
  },
};

const userData = (state = initialState, action = {}) => {
  switch (action.type) {
    case MODIFY_USER_INFO:
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
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
      let newCategories = state.dashboard.categories.map((category) => {
        if(category.id === action.payload){
          return {
          ...category,
          displayed: !category.displayed,
          }
        }
        return category;
      });

      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          categories: [
            ...newCategories,
          ],
        },
      };
    default:
      return state;
  }
};

export default userData;
