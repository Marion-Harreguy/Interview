import { connect } from 'react-redux';
import SearchForm from '../components/SearchForm';
import { searchInputChange, searchSubmit } from '../actions';


const mapStateToProps = (state) => ({
  searchValues: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  searchInputChange: (changedInput) => {
    dispatch(searchInputChange(changedInput));
  },
  searchSubmit: () => {
    dispatch(searchSubmit());
  },
});

const SearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);

export default SearchFormContainer;
