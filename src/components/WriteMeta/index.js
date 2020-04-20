import React from 'react';
import './style.scss';

const WriteMeta = () => (
  <aside className="left__menu left__menu--bottom left__menu--write">
  <div className="write__tools">
      <button className="tools__close" type="button"></button>
      <button className="tools__publish" type="button"></button>
      <button className="tools__delete" type="button"></button>
  </div>

  <div className="interview__meta">
      <form className="write__form">
          <input className="write__form__input write__form__input--title" type="text" name="title" placeholder="Titre" />
          <input className="write__form__input" type="text" name="year" placeholder="Année" />
          <input className="write__form__input" type="text" name="languages" placeholder="Langue(s)" />
          <input className="write__form__input" type="text" name="author" placeholder="Auteur" />
          <input className="write__form__input" type="text" name="interviewed" placeholder="Enquêté" />
          <input className="write__form__input" type="text" name="interviewed-town" placeholder="Ville" />
          <input className="write__form__input" type="text" name="interviewed-structure" placeholder="Structure(s)" />
          <input className="write__form__input" type="text" name="interviewed-status" placeholder="Statut" />
          <input className="write__form__input" type="text" name="interviewed-email" placeholder="Email de l'enquêté" />
          <input className="write__form__button" type="checkbox" name="royalty-free" id="royalty-free" />
          <label className="write__form__input write__form__input--royalty" htmlFor="royalty-free">Libre de droit</label>
      </form> 

      {/* <div className="write__categories">
          <div className="categories__list">
              <div className="write__category">
                  <input className="category-button category-button--red" name="cat--memoire" type="checkbox" id="cat--memoire">
                  <label htmlFor="cat--memoire">Mémoire</label>
              </div>
              <div className="write__category">
                  <input className="category-button category-button--blue" name="cat--dnsep" type="checkbox" id="cat--dnsep">
                  <label htmlFor="cat--dnsep">DNSEP</label>
              </div>
              <div className="write__category">
                  <input className="category-button category-button--orange" name="cat--esad" type="checkbox" id="cat--esad">
                  <label htmlFor="cat--esad">Article ESAD</label>
              </div>
              <div className="write__category write__category--add">
                  <input className="new-category-name" type="text" name="new-category" placeholder="Nouvelle catégorie">
                  <button className="category-button category-button--add" type="button"></button>
              </div>
          </div>
      </div> */}
      
      </div>
  </aside>
);

export default WriteMeta;