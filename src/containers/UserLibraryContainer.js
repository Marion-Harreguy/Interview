import { connect } from 'react-redux';

import UserLibrary from 'src/components/UserLibrary';
import { modifyUserInfo, changeOrder, toggleSection, toggleCategory, addCategoryChange, addCategorySubmit, modifyUserInfoAPI, changeFormDisabled, } from '../actions';

const mapStateToProps = (state) => ({
  user: state.userData.dataUser,
  structure: state.userData.dataStructure,
  dashboard: state.userData.dashboard,
  library: state.userData.library,
  newCategoryName: state.userData.newCategory.name,
  formDisabled: state.userData.library.formDisabled,
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

  // categoryName = name of the future new category
  addCategoryChange: (categoryName) => {
    dispatch(addCategoryChange(categoryName));
  },

  addCategorySubmit: () => {
    dispatch(addCategorySubmit());
  },

  modifyUserInfoAPI: () => {
    dispatch(modifyUserInfoAPI());
  },

  changeFormDisabled: () => {
    dispatch(changeFormDisabled());
  },
});

const UserLibraryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLibrary);

export default UserLibraryContainer;
