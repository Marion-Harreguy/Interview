import { connect } from 'react-redux';

import UserLibrary from 'src/components/UserLibrary';
import { changeOrder, toggleSection, toggleCategory, addCategoryChange, addCategorySubmit, updateUserGet, updateUserPut, changeFormDisabled, modifyUserInfo } from '../actions';

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
  updateUserPut: () => {
    dispatch(updateUserPut());
  },
  updateUserGet: () => {
    dispatch(updateUserGet());
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

  changeFormDisabled: () => {
    dispatch(changeFormDisabled());
  },

  modifyUserInfo: (input) => {
    dispatch(modifyUserInfo(input));
  },
});

const UserLibraryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLibrary);

export default UserLibraryContainer;
