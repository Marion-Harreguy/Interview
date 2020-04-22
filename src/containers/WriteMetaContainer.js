import { connect } from 'react-redux';
import WriteMeta from '../components/WriteMeta';
import { publishInterview, changeMeta, changeInterviewCategories, addWrittingInterview, addInterviewed, changeInterviewed, changeInterviewStructure, changeAuthor, changeAuthorStructure, updateUserGet, updateUserPut, writeInterviewDelete, writeInterviewPut, interviewGet, writeInterviewCreate } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  interviewMeta: state.writeInterview.meta,
  userCategories: state.userData.dashboard.categories,
  userName: `${state.userData.dataUser.firstname} ${state.userData.dataUser.lastname}`,
  interviewId: ownProps.interviewId,
});

const mapDispatchToProps = (dispatch) => ({
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
  updateUserGet: () => {
    dispatch(updateUserGet());
  },
  updateUserPut: () => {
    dispatch(updateUserPut());
  },
  writeInterviewPut: (id) => {
    dispatch(writeInterviewPut(id));
  },
  writeInterviewDelete: () => {
    dispatch(writeInterviewDelete());
  },
  interviewGet: (idAndReducer) => {
    dispatch(interviewGet(idAndReducer));
  },
  writeInterviewCreate: () => {
    dispatch(writeInterviewCreate());
  },
});

const WriteMetaContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteMeta);

export default WriteMetaContainer;
