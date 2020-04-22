import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from 'src/reducers';
import ajaxMiddleware from '../middleware/ajaxMiddleware';

// == Enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    ajaxMiddleware,
  ),
);

const store = createStore(
  rootReducer,
  enhancers,
);

export default store;

