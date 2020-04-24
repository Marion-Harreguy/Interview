import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ResultsList from './ResultsList';
import ResultsMap from './ResultsMap';
import ResultsTimeline from './ResultsTimeline';

const SearchResults = ({ results, mode, changeMode }) => {

  let resultsConverted = results.map((result) => ({ ...result.meta }));

  return (
  <div style={{height: '100%'}}>
    <div className="research__tools">
      <h2 className="research__tools__title">Résultats</h2>
      {// FOR V2 : save research
      /* <button className="research__tools__save--button" type="button" label="Enregistrer la recherche"/>
      <input className="research__tools__save--title" />
      <div className="research__tools__categories">
        <input className="category-button category-button--red" checked="unchecked" id="cat-dnsep" name="cat-dnsep" type="checkbox" />
        <label for="cat-dnsep" />
        <input className="category-button category-button--green" id="cat-esad" name="cat-esad" type="checkbox"/>
        <label for="cat-esad" />
        <input className="category-button category-button--blue" id="cat-chaton" name="cat-chaton" type="checkbox"/>
        <label for="cat-chaton" />
        <input className="category-button category-button--orange" id="cat-memoire" name="cat-memoire" type="checkbox"/>
        <label for="cat-memoire" />
      </div> */}
      <div className="research__tools__modes">
        <button onClick={() => changeMode('list')} className="research__tools__mode research__tools__mode--list" label="Mode liste" type="button" />
        <button onClick={() => changeMode('map')} className="research__tools__mode research__tools__mode--map" label="Mode carte" type="button" />
        <button onClick={() => changeMode('timeline')} className="research__tools__mode research__tools__mode--timeline" label="Mode frise chronologique" type="button"/>
      </div>
    </div>
    {
      mode === 'map' && (<ResultsMap resultList={resultsConverted} />)
    }
    {
      mode === 'list' && (<ResultsList resultList={resultsConverted} />)
    }
    {
      mode === 'timeline' && (<ResultsTimeline resultList={resultsConverted} />)
    }

  </div>
)};
export default SearchResults;
