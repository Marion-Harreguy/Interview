import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => ({
  isConnected: state.userData.isConnected,
});

const mapDispatchToProps = () => ({});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
