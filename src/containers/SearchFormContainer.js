import { connect } from 'react-redux';
import SearchForm from '../components/SearchForm';
import { searchInputChange, searchSubmit, emptyResults, emptyForm } from '../actions';


const mapStateToProps = (state) => ({
  searchValues: state.search.form,
});

const mapDispatchToProps = (dispatch) => ({
  searchInputChange: (changedInput) => {
    dispatch(searchInputChange(changedInput));
  },
  searchSubmit: () => {
    dispatch(searchSubmit());
  },
  emptyResults: () => {
    dispatch(emptyResults());
  },
  emptyForm: () => {
    dispatch(emptyForm());
  },
});

const SearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);

export default SearchFormContainer;
