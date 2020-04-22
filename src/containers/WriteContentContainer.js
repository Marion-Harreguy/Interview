import { connect } from 'react-redux';
import WriteContent from '../components/WriteContent';
import { addNewQuestion, addNewAnswer, updateAnswer, updateQuestion, updateContext, writeInterviewPut, interviewGet, writeInterviewCreate, fillAuthor } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  writeInterview: state.writeInterview,
  interviewId: ownProps.interviewId,
  dataUser: state.userData.dataUser,
  dataStructure: state.userData.dataStructure,
});

const mapDispatchToProps = (dispatch) => ({
  addNewAnswer: () => {
    dispatch(addNewAnswer());
  },
  addNewQuestion: () => {
    dispatch(addNewQuestion());
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
});

const WriteContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteContent);

export default WriteContentContainer;
