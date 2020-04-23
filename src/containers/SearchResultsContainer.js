import { connect } from 'react-redux';
import SearchResults from '../components/SearchResults';


const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
});

const SearchResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);

export default SearchResultsContainer;
