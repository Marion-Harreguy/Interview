import { connect } from 'react-redux';
import App from '../components/App';
import { automaticLog, updateUserGet } from '../actions';

const mapStateToProps = (state) => ({
  isConnected: state.userData.connection.isConnected,
  userCategories: state.userData.dashboard.categories,
});

const mapDispatchToProps = (dispatch) => ({
  automaticLog: (idToken) => {
    dispatch(automaticLog(idToken));
  },
  updateUserGet: () => {
    dispatch(updateUserGet());
  },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
