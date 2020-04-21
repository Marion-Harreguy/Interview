import { connect } from 'react-redux';
import ReadContent from '../components/ReadContent';
import { interviewGet } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  interview: state.readInterview,
  interviewId: ownProps.interviewId,
});

const mapDispatchToProps = (dispatch) => ({
  interviewGet: (idAndReducer) => {
    dispatch(interviewGet(idAndReducer));
  },
});

const ReadContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadContent);

export default ReadContentContainer;
