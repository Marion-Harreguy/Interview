import { connect } from 'react-redux';

import UserLibrary from 'src/components/UserLibrary';
import { modifyUserInfo } from '../actions';

const mapStateToProps = (state) => ({
  user: state.userData.dataUser,
  structure: state.userData.dataStructure,
  dashboard: state.userData.dashboard,
});

const mapDispatchToProps = (dispatch) => ({
  modifyUserInfo: () => {
    dispatch(modifyUserInfo());
  },
});

const UserLibraryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLibrary);

export default UserLibraryContainer;


