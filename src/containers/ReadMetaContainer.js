import { connect } from 'react-redux';

import ReadMeta from 'src/components/ReadMeta';
import { saveInterview } from '../actions';


const mapStateToProps = (state, ownProps) => ({
  interviewMeta: state.readInterview.meta,
  userCategories: state.userData.dashboard.categories,
  // slug: ownProps.match.params.slugtitle,
});

const mapDispatchToProps = (dispatch) => ({
  saveInterview: (info) => {
    dispatch(saveInterview(info));
  },
});

const ReadMetaContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadMeta);

export default ReadMetaContainer;
