import React from 'react';
import './style.scss';

const SearchForm = ({ searchInputChange, searchValues, searchSubmit }) => (
  <div className="left col-12 col-md-5 col-lg-4 col-xl-4">
    <aside className="left__menu left__menu left__menu--search">
      <div className="interview__meta">
        <h2>Recherche </h2>
        <form className="search__form">
          <div className="search__form--overflow">
            <input className="search__form__input search__form__input--title" type="text" name="title" placeholder="Titre" onChange={(event) => searchInputChange(event.target)} value={searchValues.title}/>
            <input className="search__form__input" type="text" name="city" placeholder="Lieu" onChange={(event) => searchInputChange(event.target)} value={searchValues.city}/>
            <input className="search__form__input" type="text" name="language" placeholder="Langue(s)" onChange={(event) => searchInputChange(event.target)} value={searchValues.language}/>
            <input className="search__form__input" type="text" name="author" placeholder="Auteur" onChange={(event) => searchInputChange(event.target)} value={searchValues.author}/>
            <input className="search__form__input" type="text" name="interviewed" placeholder="Enquêté" onChange={(event) => searchInputChange(event.target)} value={searchValues.interviewed}/>
            <input className="search__form__input" type="text" name="interviewed-structure" placeholder="Structure(s)" onChange={(event) => searchInputChange(event.target)} value={searchValues.structure}/>
            <input className="search__form__input" type="text" name="tags" placeholder="Tags"  onChange={(event) => searchInputChange(event.target)} value={searchValues.tags}/>
            <div className="search__form__date">
              <h4>Dates</h4>
              <div className="date__timeline">
                <div className="timeline__line" />
                <div className="timeline__cursor timeline__cursor--beginning">
                  <div className="timeline__cursor__dot" />
                  <div className="timeline__cursor__date">1968</div>
                </div>
                <div className="timeline__cursor timeline__cursor--end">
                  <div className="timeline__cursor__dot" />
                  <div className="timeline__cursor__date">2010</div>
                </div>
              </div>
            </div>

            <input className="search__form__button--royalty" type="checkbox" name="openSource" id="royalty-free" onChange={(event) => searchInputChange({ name: 'openSource', value: event.target.checked})} checked={searchValues.openSource}/>
            <label className="search__form__input search__form__input--royalty" for="openSource">Libres de droit</label>
          </div>
          <button className="search__form__button--submit" type="submit" onSubmit={() => searchSubmit()}>Rechercher</button>
        </form>
      </div>
    </aside>
  </div>
);

export default SearchForm;