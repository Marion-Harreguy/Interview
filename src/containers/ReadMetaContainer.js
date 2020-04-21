import { connect } from 'react-redux';

import ReadMeta from 'src/components/ReadMeta';
import { saveInterview, updateUserGet, updateUserPut } from '../actions';


const mapStateToProps = (state) => ({
  interviewMeta: state.readInterview.meta,
  userCategories: state.userData.dashboard.categories,
});

const mapDispatchToProps = (dispatch) => ({
  saveInterview: (info) => {
    dispatch(saveInterview(info));
  },
  updateUserGet: () => {
    dispatch(updateUserGet());
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
