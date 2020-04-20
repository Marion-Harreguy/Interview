import { connect } from 'react-redux';
import ReadContent from '../components/ReadContent';

const mapStateToProps = (state) => ({
  interviewContent: state.readInterview.content,
  interviewContext: state.readInterview.context,
  author: state.readInterview.meta.author.name,
});

const mapDispatchToProps = () => ({});

const ReadContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadContent);

export default ReadContentContainer;