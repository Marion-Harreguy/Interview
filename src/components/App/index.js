// == Import npm
import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import LoginCreate from '../LoginCreate';
// == Import
import './style.scss';

// == Composant
const App = () => (
  <div className="app">
    <Header />
    <main className="main row">
      <div className="left col-12 col-md-5 col-lg-4 col-xl-4">
        <LoginCreate />
        <Footer />
      </div>

      <div className="right col-12 col-md-7 col-lg-8 col-xl-8">
        <div className="right__presentation">
          Bienvenue
        </div>
      </div>
    </main>
  </div>
);

// == Export
export default App;
