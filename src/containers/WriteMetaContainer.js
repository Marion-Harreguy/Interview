import { connect } from 'react-redux';
import WriteMeta from '../components/WriteMeta';
import { deleteInterview, publishInterview, changeMeta, changeInterviewCategories, addWrittingInterview, addInterviewed, changeInterviewed, changeInterviewStructure, changeAuthor, changeAuthorStructure } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  interviewMeta: state.writeInterview.meta,
  userCategories: state.userData.dashboard.categories,
  userName: state.userData.dataUser.firstname+' '+state.userData.dataUser.lastname,
  interviewId: ownProps.interviewId,

  // TODO : AJAX REQUEST
  // interview: findInterviewBySlug(ownProps.interviewId),
});

const mapDispatchToProps = (dispatch) => ({
  deleteInterview: (id) => {
    dispatch(deleteInterview(id));
  },
  publishInterview: (id) => {
    dispatch(publishInterview(id));
  },
  changeMeta: (payload) => {
    dispatch(changeMeta(payload));
  },
  changeInterviewCategories: (categoryId) => {
    dispatch(changeInterviewCategories(categoryId));
  },
  addWrittingInterview: (interviewData) => {
    dispatch(addWrittingInterview(interviewData));
  },
  addInterviewed: () => {
    dispatch(addInterviewed());
  },
  changeInterviewed: (payload) => {
    dispatch(changeInterviewed(payload));
  },
  changeInterviewedStructure: (payload) => {
    dispatch(changeInterviewStructure(payload));
  },
  changeAuthor: (payload) => {
    dispatch(changeAuthor(payload));
  },
  changeAuthorStructure: (payload) => {
    dispatch(changeAuthorStructure(payload));
  },
});

const WriteMetaContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteMeta);

export default WriteMetaContainer;
