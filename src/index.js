import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Composants
import App from 'src/components/App';
// Store
import store from 'src/store';


// TODO : Add router
const rootComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

const target = document.getElementById('root');

render(rootComponent, target);
