import { connect } from 'react-redux';

import ReadMeta from 'src/components/ReadMeta';
import { saveInterview, updateUserGet, updateUserPut } from '../actions';


const mapStateToProps = (state) => ({
  interviewMeta: state.readInterview.meta,
  userCategories: state.userData.dashboard.categories,
  dashboard: state.userData.dashboard,
  userId: state.userData.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  saveInterview: (info) => {
    dispatch(saveInterview(info));
  },
  updateUserPut: () => {
    dispatch(updateUserPut());
  },
});

const ReadMetaContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadMeta);

export default ReadMetaContainer;
