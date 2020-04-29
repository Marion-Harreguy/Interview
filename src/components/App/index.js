/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import HeaderContainer from '../../containers/HeaderContainer';
import UserLibraryContainer from '../../containers/UserLibraryContainer';
import UserLibraryRight from '../UserLibraryRight';
import LegalMentions from '../LegalMentions';
import ReadMetaContainer from '../../containers/ReadMetaContainer';
import ReadContentContainer from '../../containers/ReadContentContainer';
import WriteContentContainer from '../../containers/WriteContentContainer';
import WriteMetaContainer from '../../containers/WriteMetaContainer';
import Introduction from '../Introduction';
import FooterContainer from '../../containers/FooterContainer';
import PageNotFound from '../NotFound';
import NewUser from '../NewUser';
import LoginContainer from '../../containers/LoginContainer';
import ForgottenPasswordContainer from '../../containers/ForgottenPasswordContainer';
import SearchFormContainer from '../../containers/SearchFormContainer';
import SearchResultsContainer from '../../containers/SearchResultsContainer';
import Contact from '../Footer/Contact';

// Temporary : all style put in one file
import './style.scss';

const App = ({ isConnected = false, userCategories, automaticLog, updateUserGet }) => {

  useEffect(() => {
    const localStorageLog = localStorage.getItem('userLogs');
    if (localStorageLog) {
      automaticLog(JSON.parse(localStorageLog));
      updateUserGet();
    }
  }, [isConnected]);

  const isThereLocalStorage = () => {
    if (localStorage.getItem('userLogs')) return true;
    return false;
  };

  return (
  <div className="app">

    { // Make category styles from userCategories
    userCategories.map((category) => (
      <style
        key={category.id}
        dangerouslySetInnerHTML={
          {
            __html: `
          .list__category--${category.id}, input[type="checkbox"].category-span--${category.id} + label::before, input[type="checkbox"].category-button--${category.id} + label::before { 
            background-color: ${category.color}; 
          }
          .input[type="checkbox"]:checked.category-span--${category.id} + label::before, input[type="checkbox"]:checked.category-button--${category.id} + label::before {
            box-shadow: inset 0px 0px 0px 3px ${category.color};
            background-color: #2b363e;
          }`,
          }
        }
      />
    ))
    }

    <HeaderContainer />
    <main className="main row">

      

      <div className="left col-12 col-md-5 col-lg-4 col-xl-4">
        <Switch>
          {/* PATH : /
          If user is connected : UserLibraryContainer / if user is not connected : login */}
          <Route
            exact
            path="/"
            render={() => {
              if (isThereLocalStorage()) {
                return <UserLibraryContainer />;
              }
              return <LoginContainer />;
            }}
          />
          <Route path="/register">
            {isThereLocalStorage() ? <Redirect to="/" /> : <NewUser />}
          </Route>
          <Route path="/forgotten">
            {isThereLocalStorage() ? <Redirect to="/" /> : <ForgottenPasswordContainer />}
          </Route>
          <Route path="/search">
            {isThereLocalStorage() ? <SearchFormContainer /> : <Redirect to="/" /> }
          </Route>
          {/* How to do GET search route ? */}
          {/* <Route path="/legal-mention" component={LegalMentions} /> */}
          {/* How to handle log out
          <Route path="/logout" component={Logout} /> 
          Toggle ? */}
          <Route
            path="/read/:interviewId"
            render={(object) => {
              const { interviewId } = object.match.params;
              if (isThereLocalStorage()) return <ReadMetaContainer interviewId={interviewId}/>;
              return <Redirect to="/" />;
            }}
          />
          <Route path="/create" component={WriteMetaContainer} />
          <Route
            path="/update/:interviewId"
            render={(object) => {
              const { interviewId } = object.match.params;
              if (isThereLocalStorage()) return <WriteMetaContainer interviewId={interviewId} />;
              return <Redirect to="/" />;
            }}
          />
          <Route render={() => {
            if (isThereLocalStorage()) return <UserLibraryContainer />;
            return <LoginContainer />;
          }}
          />
        </Switch>
        <FooterContainer />
      </div>

      <div className="right col-12 col-md-7 col-lg-8 col-xl-8">
        <Contact />

        <Switch>
          {/* PATH : / 
          If user is connected : UserLibraryContainer / if user is not connected : login */}
          <Route
            exact
            path="/"
            render={() => {
              if (isThereLocalStorage()) {
                return <UserLibraryRight />;
              }
              return <Introduction />;
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (!isThereLocalStorage()) return <Introduction />;
              return <Redirect to="/" />;
            }}
          />
          <Route
            path="/forgotten"
            render={() => {
              if (!isThereLocalStorage()) return <Introduction />;
              return <Redirect to="/" />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (!isThereLocalStorage()) return <Introduction />;
              return <Redirect to="/" />;
            }}
          />

          <Route
            path="/search"
            render={() => {
              if (isThereLocalStorage()) return <SearchResultsContainer />;
              return <Redirect to="/" />;
            }}
          />
          {/* How to do GET search route ? */}
          <Route path="/legal-mention" component={LegalMentions} />
          {/* How to handle log out
          <Route path="/logout" component={Logout} /> 
          Toggle ? */}
          <Route
            path="/read/:interviewId"
            render={(object) => {
              const { interviewId } = object.match.params;
              if (isThereLocalStorage()) return <ReadContentContainer interviewId={interviewId} />;
              return <Redirect to="/" />;
            }}
          />
          <Route path="/create" component={WriteContentContainer} />
          <Route
            path="/update/:interviewId"
            render={(object) => {
              const { interviewId } = object.match.params;
              if (isThereLocalStorage()) return <WriteContentContainer interviewId={interviewId} />;
              return <Redirect to="/" />;
            }}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </main>
  </div>
)};

App.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  userCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  automaticLog: PropTypes.func.isRequired,
  updateUserGet: PropTypes.func.isRequired,
};

export default App;
