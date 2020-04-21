import { connect } from 'react-redux';
import WriteContent from '../components/WriteContent';
import { findInterviewBySlug, addNewQuestion, addNewAnswer, updateAnswer, updateQuestion, updateContext } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  writeInterview: state.writeInterview,
  interviewId: ownProps.interviewId,

  // interviewContent: state.readInterview.content,
  // interviewContext: state.readInterview.context,
  // author: state.readInterview.meta.author.name,
  // slug: ownProps.match.params.slugtitle,

  // TODO : AJAX REQUEST
  // interview: findInterviewBySlug(ownProps.interviewId),
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
});

const WriteContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteContent);

export default WriteContentContainer;
