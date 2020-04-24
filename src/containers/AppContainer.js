import { connect } from 'react-redux';
import App from '../components/App';
import { automaticLog } from '../actions';

const mapStateToProps = (state) => ({
  isConnected: localStorage.getItem('isConnected'),
  userCategories: state.userData.dashboard.categories,
});

const mapDispatchToProps = (dispatch) => ({
  automaticLog: (idToken) => {
    dispatch(automaticLog(idToken));
  },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
