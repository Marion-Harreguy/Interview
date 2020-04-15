import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store from 'src/store';

import HeaderContainer from '../../containers/HeaderContainer';
import UserLibrary from '../UserLibrary';
import UserLibraryRight from '../UserLibraryRight';
import LegalMentions from '../LegalMentions';
import ReadMeta from '../ReadMeta';
import ReadContent from '../ReadContent';
import SearchForm from '../SearchForm';
import SearchResults from '../SearchResults';
import WriteContent from '../WriteContent';
import WriteMeta from '../WriteMeta';
import Introduction from '../Introduction';
import Footer from '../Footer';
import PageNotFound from '../NotFound';
import NewUser from '../NewUser';
import LoginContainer from '../../containers/LoginContainer';
import ForgottenPasswordContainer from '../../containers/ForgottenPasswordContainer';

// Temporary : all style put in one file
import './style.scss';

const App = () => {
  const isConnected = store.getState().userData.isConnected;
  return (
    <div className="app">
      <HeaderContainer />
      <main className="main row">

        <div className="left col-12 col-md-5 col-lg-4 col-xl-4">
          <Switch>
            {/* PATH : /
            If user is connected : userLibrary / if user is not connected : login */}
            <Route
              exact
              path="/"
              render={() => {
                if (isConnected) {
                  return <UserLibrary />;
                }
                return <LoginContainer />;
              }}
            />
            <Route path="/register">
              {isConnected ? <Redirect to="/" /> : <NewUser />}
            </Route>
            <Route path="/forgotten">
              {isConnected ? <Redirect to="/" /> : <ForgottenPasswordContainer />}
            </Route>
            <Route path="/search">
              {isConnected ? <Redirect to="/" /> : <SearchForm />}
            </Route>
            {/* How to do GET search route ? */}
            {/* <Route path="/legal-mention" component={LegalMentions} /> */}
            {/* How to handle log out
            <Route path="/logout" component={Logout} /> 
            Toggle ? */}
            <Route
              path="/read/:slug"
              render={(object) => {
                const { slug } = object.match.params;
                // REQUETE AXIOS ??
                if (isConnected) return <ReadMeta articleId={slug} />;
                return <Redirect to="/" />;
              }}
            />
            <Route path="/create" component={WriteMeta} />
            <Route
              path="/update/:slug"
              render={(object) => {
                const { slug } = object.match.params;
                // REQUETE AXIOS ??
                if (isConnected) return <WriteMeta articleId={slug} />;
                return <Redirect to="/" />;
              }}
            />
            <Route render={() => {
              if (isConnected) return <UserLibrary />;
              return <LoginContainer />;
            }}
            />
          </Switch>
          <Footer />
        </div>

        <div className="right col-12 col-md-7 col-lg-8 col-xl-8">
          <Switch>
            {/* PATH : / 
            If user is connected : userLibrary / if user is not connected : login */}
            <Route exact path="/" 
              render={() => {
                if (isConnected) {
                  return <UserLibraryRight />;
                }
                return <Introduction />;
              }} />

            <Route
              path="/register"
              render={() => {
                // REQUETE AXIOS ??
                if (!isConnected) return <Introduction />;
                return <Redirect to="/" />;
              }}
            />
            <Route
              path="/forgotten"
              render={() => {
                // REQUETE AXIOS ??
                if (!isConnected) return <Introduction />;
                return <Redirect to="/" />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                // REQUETE AXIOS ??
                if (!isConnected) return <Introduction />;
                return <Redirect to="/" />;
              }}
            />

            <Route
              path="/search"
              render={() => {
                // REQUETE AXIOS ??
                if (isConnected) return <SearchResults />;
                return <Redirect to="/" />;
              }}
            />
            {/* How to do GET search route ? */}
            <Route path="/legal-mention" component={LegalMentions} />
            {/* How to handle log out
            <Route path="/logout" component={Logout} /> 
            Toggle ? */}
            <Route
              path="/read/:slug"
              render={(object) => {
                const { slug } = object.match.params;
                // REQUETE AXIOS ??
                if (isConnected) return <ReadContent articleId={slug} />;
                return <Redirect to="/" />;
              }}
            />
            <Route path="/create" component={WriteContent} />
            <Route
              path="/update/:slug"
              render={(object) => {
                const { slug } = object.match.params;
                // REQUETE AXIOS ??
                if (isConnected) return <WriteContent articleId={slug} />;
                return <Redirect to="/" />;
              }}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </main>
    </div>
)};

export default App;
