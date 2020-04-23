import React from 'react';
import './style.scss';

const SearchResults = () => (
  <div className="right col-12 col-md-7 col-lg-8 col-xl-8">
    <div className="research__tools">
      <h2 className="research__tools__title">Résultats</h2>
      <button className="research__tools__save--button" type="button"/>
      <input className="research__tools__save--title" />
      <div className="research__tools__categories">
        <input className="category-button category-button--red" checked="unchecked" id="cat-dnsep" name="cat-dnsep" type="checkbox"/>
        <label for="cat-dnsep"/>
        <input className="category-button category-button--green" id="cat-esad" name="cat-esad" type="checkbox"/>
        <label for="cat-esad" />
        <input className="category-button category-button--blue" id="cat-chaton" name="cat-chaton" type="checkbox"/>
        <label for="cat-chaton" />
        <input className="category-button category-button--orange" id="cat-memoire" name="cat-memoire" type="checkbox"/>
        <label for="cat-memoire" />
      </div>
      <div className="research__tools__modes">
        <button onclick="show('list')" className="research__tools__mode research__tools__mode--list" label="Mode liste"/>
        <button onclick="show('map')" className="research__tools__mode research__tools__mode--map" label="Mode carte"/>
        <button onclick="show('timeline')" className="research__tools__mode research__tools__mode--timeline" label="Mode frise chronologique"/>
      </div>
    </div>
  </div>
);
export default SearchResults;
