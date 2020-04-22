import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => ({
  isConnected: state.userData.isConnected,
  userCategories: state.userData.dashboard.categories,
});

const mapDispatchToProps = () => ({});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
