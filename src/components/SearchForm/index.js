import React, { useEffect } from 'react';
import './style.scss';
import 'jquery-ui-dist/jquery-ui';
import PropTypes from 'prop-types';
import $ from 'jquery';

const SearchForm = ({ searchInputChange, searchValues, searchSubmit, emptyResults, emptyForm }) => {

  useEffect(() => {
    $('.timeline__cursor').draggable({ axis: 'x', containment: 'parent' });
  }, [searchInputChange]);

  useEffect(() => {
    emptyResults();
  }, [searchSubmit])

  let yearBegin = searchValues.yearBegin;
  let yearEnd = searchValues.yearEnd;

  const calculateYearBegin = (left) => {
    if (!left) return 1990;
    const newLeft = parseInt(left)+12;
    const totalWidth = document.querySelector('.timeline__line').clientWidth;
    const pxForOneYear = totalWidth/(2020 - 1990);
    yearBegin = parseInt(newLeft/pxForOneYear + 1990 -1);
    if (yearBegin >= yearEnd) {
      yearBegin = yearEnd - 1;
      document.querySelector('.timeline__cursor--beginning').style.left = (yearBegin - 1990)*pxForOneYear + "px";
    }
    searchInputChange({name:'yearBegin', value: yearBegin});
  };

  const calculateYearEnd = (left) => {
    if (!left) return 2020;
    const newLeft = parseInt(left)+12;
    const totalWidth = document.querySelector('.timeline__line').clientWidth;
    const pxForOneYear = totalWidth/(2020 - 1990);
    yearEnd = parseInt(newLeft/pxForOneYear + 1990 -1);
    if (yearEnd <= yearBegin) {
      yearEnd = yearBegin + 1;
      document.querySelector('.timeline__cursor--end').style.left = (yearEnd - 1990)*pxForOneYear + "px";
    }
    searchInputChange({name:'yearEnd', value: yearEnd});
  };

  return (
    <aside className="left__menu left__menu left__menu--search">
      <div className="interview__meta">
        <h2>Recherche </h2>
        <button className="search__form__button--empty" type="button" label="Réinitialiser le formulaire" onClick={emptyForm}/>
        <form className="search__form" onSubmit={(event) => { event.preventDefault(); searchSubmit()}}>
          <div className="search__form--overflow">
            <input className="search__form__input search__form__input--title" type="text" name="title" placeholder="Titre" onChange={(event) => searchInputChange(event.target)} value={searchValues.title}/>
            <input className="search__form__input" type="text" name="city" placeholder="Lieu" onChange={(event) => searchInputChange(event.target)} value={searchValues.city}/>
            <input className="search__form__input" type="text" name="language" placeholder="Langue(s)" onChange={(event) => searchInputChange(event.target)} value={searchValues.language}/>
            <input className="search__form__input" type="text" name="author" placeholder="Auteur" onChange={(event) => searchInputChange(event.target)} value={searchValues.author}/>
            <input className="search__form__input" type="text" name="interviewed" placeholder="Enquêté" onChange={(event) => searchInputChange(event.target)} value={searchValues.interviewed}/>
            <input className="search__form__input" type="text" name="structure" placeholder="Structure(s)" onChange={(event) => searchInputChange(event.target)} value={searchValues.structure}/>
            <input className="search__form__input" type="text" name="tags" placeholder="Tags"  onChange={(event) => searchInputChange(event.target)} value={searchValues.tags}/>

            <div className="search__form__date">
              <h4>Dates</h4>
              <div className="date__timeline">
                <div className="timeline__line" />
                <div className="timeline__cursor timeline__cursor--beginning" onMouseMove={(event) => calculateYearBegin(event.currentTarget.style.left)} >
                  <div className="timeline__cursor__dot" />
                  <div className="timeline__cursor__date">{searchValues.yearBegin}</div>
                </div>
                <div className="timeline__cursor timeline__cursor--end" onMouseMove={(event) => calculateYearEnd(event.currentTarget.style.left)}>
                  <div className="timeline__cursor__dot" />
                  <div className="timeline__cursor__date">{searchValues.yearEnd}</div>
                </div>
              </div>
            </div>

            <input className="search__form__button--royalty" type="checkbox" name="openSource" id="openSource" onChange={(event) => searchInputChange({ name: 'openSource', value: event.target.checked})} checked={searchValues.openSource}/>
            <label className="search__form__input search__form__input--royalty" htmlFor="openSource">Libres de droit seulement</label>
          </div>
          <button className="search__form__button--submit" type="submit">Rechercher</button>
        </form>
      </div>
    </aside>
  );
};


SearchForm.propTypes = {
  searchInputChange: PropTypes.func.isRequired,
  searchValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    interviewed: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    openSource: PropTypes.bool.isRequired,
    yearBegin: PropTypes.number.isRequired,
    yearEnd: PropTypes.number.isRequired,
  }).isRequired,
  searchSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
