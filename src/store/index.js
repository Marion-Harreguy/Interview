import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from 'src/reducers';
import logMiddleware from '../middleware/logMiddleware';
import ajaxMiddleware from '../middleware/ajaxMiddleware';
import webSocketMiddleware from '../middleware/webSocketMiddleware';

// == Enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    logMiddleware,
    ajaxMiddleware,
    webSocketMiddleware,
  ),
);

const store = createStore(
  rootReducer,
  // preloadedState,
  enhancers,
);

export default store;

