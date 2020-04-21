import { connect } from 'react-redux';
import WriteContent from '../components/WriteContent';
import { addNewQuestion, addNewAnswer, updateAnswer, updateQuestion, updateContext, writeInterviewPut, interviewGet, writeInterviewCreate } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  writeInterview: state.writeInterview,
  interviewId: ownProps.interviewId,
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
  writeInterviewCreate: () => {
    dispatch(writeInterviewCreate());
  },
  interviewGet: (id) => {
    dispatch(interviewGet(id));
  },
});

const WriteContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteContent);

export default WriteContentContainer;
