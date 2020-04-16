import { connect } from 'react-redux';

import UserLibrary from 'src/components/UserLibrary';
import { modifyUserInfo, changeOrder, toggleSection, toggleCategory } from '../actions';

const mapStateToProps = (state) => ({
  user: state.userData.dataUser,
  structure: state.userData.dataStructure,
  dashboard: state.userData.dashboard,
  library: state.userData.library,
});

const mapDispatchToProps = (dispatch) => ({
  modifyUserInfo: (inputChanged) => {
    dispatch(modifyUserInfo(inputChanged));
  },
  changeOrder: (newOrder) => {
    dispatch(changeOrder(newOrder));
  },
  toggleSection: (section) => {
    dispatch(toggleSection(section));
  },
  toggleCategory: (category) => {
    dispatch(toggleCategory(category));
  },
});

const UserLibraryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLibrary);

export default UserLibraryContainer;
