import { connect } from 'react-redux';

import ReadMeta from 'src/components/ReadMeta';
import { saveInterview, findInterview } from '../actions';


const mapStateToProps = (state, ownProps) => ({
  interviewMeta: state.readInterview.meta,
  userCategories: state.userData.dashboard.categories,
  interviewId: ownProps.interviewId,
  // interviewMeta: state.readInterview.meta,
});

const mapDispatchToProps = (dispatch) => ({
  saveInterview: (info) => {
    dispatch(saveInterview(info));
  },
  findInterview: (id) => {
    dispatch(findInterview(id));
  },
});

const ReadMetaContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadMeta);

export default ReadMetaContainer;
