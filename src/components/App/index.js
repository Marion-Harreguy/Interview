import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Introduction from '../Introduction';
import Footer from '../Footer';
import PageNotFound from '../NotFound';
import NewUser from '../NewUser';
import LoginContainer from '../../containers/LoginContainer';
import ForgottenPassword from '../../containers/ForgottenPasswordContainer';

// Temporary : all style put in one file
import './style.scss';

const App = () => (
  <div className="app">
    <Header />
    <main className="main row">

    <div className="left col-12 col-md-5 col-lg-4 col-xl-4">
      <Switch>
        {/* PATH : / 
        If user is connected : userLibrary / if user is not connected : login */}
        <Route exact path="/" 
          render={() => {
            if (store.getState().userData.isConnected) {
              return <UserLibrary />;
            }
            return <LoginContainer />;
          }} />
        <Route path="/register" component={NewUser} />
        <Route path="/forgotten" component={ForgottenPasswordContainer} />
        <Route path="/search" component={SearchForm} />
        {/* How to do GET route ? */}
        {/* <Route path="/legal-mention" component={LegalMentions} /> */}
        {/* How to handle log out
        <Route path="/logout" component={Logout} /> 
        Toggle ? */}
        <Route
          path="/read/:slug"
          render={(object) => {
            const { slug } = object.match.params;
            // REQUETE AXIOS ??
            return <ReadMeta articleId={slug} />
          }}
        />
        <Route path="/create" component={WriteMeta} />
        <Route
          path="/update/:slug"
          render={(object) => {
            const { slug } = object.match.params;
            // REQUETE AXIOS ??
            return <WriteMeta articleId={slug} />
          }}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>

      <div className="right col-12 col-md-7 col-lg-8 col-xl-8">
        <Switch>
          {/* PATH : / 
          If user is connected : userLibrary / if user is not connected : login */}
          <Route exact path="/" 
            render={() => {
              if (store.getState().userData.isConnected) {
                return <UserLibraryRight />;
              }
              return <Introduction />;
            }} />
          <Route path="/register" component={Introduction} />
          <Route path="/forgotten" component={Introduction} />
          <Route path="/search" component={SearchResults} />
          {/* How to do GET route ? */}
          <Route path="/legal-mention" component={LegalMentions} />
          {/* How to handle log out
          <Route path="/logout" component={Logout} /> 
          Toggle ? */}
          <Route
            path="/read/:slug"
            render={(object) => {
              const { slug } = object.match.params;
              // REQUETE AXIOS ??
              return <ReadContent articleId={slug} />
            }}
          />
          <Route path="/create" component={WriteContent} />
          <Route
            path="/update/:slug"
            render={(object) => {
              const { slug } = object.match.params;
              // REQUETE AXIOS ??
              return <WriteContent articleId={slug} />
            }}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </main>
  </div>
);

export default App;
