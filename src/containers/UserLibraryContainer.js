import { connect } from 'react-redux';

import UserLibrary from 'src/components/UserLibrary';
import { modifyUserInfo, changeOrder } from '../actions';

const mapStateToProps = (state) => ({
  user: state.userData.dataUser,
  structure: state.userData.dataStructure,
  dashboard: state.userData.dashboard,
  order: state.userData.libraryOrder,
});

const mapDispatchToProps = (dispatch) => ({
  modifyUserInfo: () => {
    dispatch(modifyUserInfo());
  },
  changeOrder: (newOrder) => {
    dispatch(changeOrder(newOrder));
  },
});

const UserLibraryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLibrary);

export default UserLibraryContainer;
