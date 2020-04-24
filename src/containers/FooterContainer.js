import { connect } from 'react-redux';
import Footer from '../components/Footer';
import { logOut } from '../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => {
    dispatch(logOut());
  },
});

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);

export default FooterContainer;
