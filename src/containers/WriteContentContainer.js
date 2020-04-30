import { connect } from 'react-redux';
import WriteContent from '../components/WriteContent';
import { deleteQuestion, deleteAnswer, addNewQuestion, addNewAnswer, updateAnswer, updateQuestion, updateContext, writeInterviewPut, interviewGet, writeInterviewCreate, fillAuthor, chooseInitiales, checkUserDashboard } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  writeInterview: state.writeInterview,
  interviewId: ownProps.interviewId,
  dataUser: state.userData.user,
  dataStructure: state.userData.structure,
});

const mapDispatchToProps = (dispatch) => ({
  addNewAnswer: (defaultInitiales) => {
    dispatch(addNewAnswer(defaultInitiales));
  },
  addNewQuestion: () => {
    dispatch(addNewQuestion());
  },
  deleteAnswer: (payload) => {
    dispatch(deleteAnswer(payload));
  },
  deleteQuestion: (payload) => {
    dispatch(deleteQuestion(payload));
  },
  updateAnswer: (payload) => {
    dispatch(updateAnswer(payload));
  },
  updateQuestion: (payload) => {
    dispatch(updateQuestion(payload));
  },
  updateContext: (payload) => {
    dispatch(updateContext(payload));
  },
  writeInterviewPut: (id) => {
    dispatch(writeInterviewPut(id));
  },
  interviewGet: (id) => {
    dispatch(interviewGet(id));
  },
  fillAuthor: (info) => {
    dispatch(fillAuthor(info));
  },
  chooseInitiales: (info) => {
    dispatch(chooseInitiales(info));
  },
  checkUserDashboard: (id) => {
    dispatch(checkUserDashboard(id));
  },
});

const WriteContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteContent);

export default WriteContentContainer;
