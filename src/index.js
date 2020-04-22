import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Composants
import AppContainer from 'src/containers/AppContainer';
// Store
import store from 'src/store';

const rootComponent = (
  <Provider store={store}>
    <Router>
      <AppContainer />
    </Router>
  </Provider>
);

const target = document.getElementById('root');

render(rootComponent, target);
