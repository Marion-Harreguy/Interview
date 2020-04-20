import { connect } from 'react-redux';
import ReadContent from '../components/ReadContent';
import { findInterviewBySlug } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  interview: state.readInterview,

  // interviewContent: state.readInterview.content,
  // interviewContext: state.readInterview.context,
  // author: state.readInterview.meta.author.name,
  // slug: ownProps.match.params.slugtitle,

  // TODO : AJAX REQUEST
  // interview: findInterviewBySlug(ownProps.interviewId),
});

const mapDispatchToProps = () => ({});

const ReadContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadContent);

export default ReadContentContainer;
