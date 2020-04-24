import { connect } from 'react-redux';
import ReadContent from '../components/ReadContent';
import { interviewGet } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  // interview: interviewGet({ interviewId: ownProps.interviewId, reducer: 'read' }),
  interview: state.readInterview,
  interviewId: ownProps.interviewId,
});

const mapDispatchToProps = (dispatch) => ({
  interviewGet: (payload) => {
    dispatch(interviewGet(payload));
  },
});

const ReadContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadContent);

export default ReadContentContainer;
