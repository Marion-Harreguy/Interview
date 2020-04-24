import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = (state) => ({
  isConnected: state.userData.connection.isConnected,
});

const mapDispatchToProps = () => ({});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;