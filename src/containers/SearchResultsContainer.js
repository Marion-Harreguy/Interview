import { connect } from 'react-redux';
import SearchResults from '../components/SearchResults';
import { changeMode } from '../actions';


const mapStateToProps = (state) => ({
  results: state.search.results,
  mode: state.search.mode,
});

const mapDispatchToProps = (dispatch) => ({
  changeMode: (mode) => {
    dispatch(changeMode(mode));
  },
});

const SearchResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);

export default SearchResultsContainer;
