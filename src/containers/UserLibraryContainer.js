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
  // inputChanged = input that triggered the event
  modifyUserInfo: (inputChanged) => {
    dispatch(modifyUserInfo(inputChanged));
  },
  // newOrder = order asked by user
  changeOrder: (newOrder) => {
    dispatch(changeOrder(newOrder));
  },
  // section = section that needs to be open/closed
  toggleSection: (section) => {
    dispatch(toggleSection(section));
  },
  // category = category that needs to be shown/hiden
  toggleCategory: (category) => {
    dispatch(toggleCategory(category));
  },
});

const UserLibraryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLibrary);

export default UserLibraryContainer;
