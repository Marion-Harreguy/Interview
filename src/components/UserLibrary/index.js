import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const UserLibrary = ({ user, structure, dashboard, modifyUserInfo, order, changeOrder }) => (
  <aside className="left__menu--top left__menu left__menu--home">
    <h2 className="home__name">{user.firstname} {user.lastname}</h2>
    <div className="home__content">
      <form className="home__form">
        <button className="home__form__button" type="submit" />
        <input className="home__form__input" onChange={(evt) => modifyUserInfo(evt.target)} type="text" name="city" value={structure[0].city} placeholder="Ville" />
        <input className="home__form__input" onChange={(evt) => modifyUserInfo(evt.target)} type="text" name="structure" value={structure.name} placeholder="Structure" />
        <input className="home__form__input" onChange={(evt) => modifyUserInfo(evt.target)} type="text" name="status" value={user.status} placeholder="Statut" /> 
      </form>
      <div className="home__library">
        <h2 className="library__title">Ma bibliothèque</h2>
        <select className="library__order" name="order" value={order} onChange={(event) => changeOrder(event.target.value)}>
          <option value="alphabet">Alphabétique</option>
          <option value="chronologique">Chronologique</option>
          <option value="tag">Tag</option>
        </select>

        <h3 className="library__section">Mes entretiens en cours
          <button className="library__new-interview" type="button" />
        </h3>

        <div className="section__list">

          { dashboard.writtingInterviews.map((interview) => (
            <div className="list__interview" key={interview.id}>
              <h4 className="list__interview__title">{interview.title}</h4>
              <div className="list__interview__categories">
                { interview.categories.map((category) => (
                  <span className={`list__category list__category--${category}`} key={category.id} />
                ))}
              </div>
            </div>
          ))}

        </div>

        <h3 className="library__section">Mes entretiens publiés</h3>

        <div className="section__list">

          { dashboard.publishedInterviews.map((interview) => (
            <div className="list__interview" key={interview.id}>
              <h4 className="list__interview__title">{interview.title}</h4>
              <div className="list__interview__categories">
                { interview.categories.map((category) => (
                  <span className={`list__category list__category--${category}`} key={category.id} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="library__section">Mes entretiens enregistrés</h3>

        <div className="section__list">

          { dashboard.savedInterviews.map((interview) => (
            <div className="list__interview" key={interview.id}>
              <h4 className="list__interview__title"> {interview.title}</h4>
              <div className="list__interview__categories">
                { interview.categories.map((category) => (
                  <span className={`list__category list__category--${category}`} key={category.id} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="library__section">Mes recherches enregistrées</h3>
        <div className="section__list">
          Recherches enregistrées ici (v2)
        </div>
      </div>

      <div className="home__categories">
        <h2 className="categories__title">Mes catégories</h2>
        <div className="categories__list">
          { dashboard.categories.map((category) => (
            <div className="home__category" key={category.id}>
              <input className={`category-button category-button--${category.id}`} id={category.id} type="checkbox" />
              <label>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  </aside>
);

UserLibrary.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    biography: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,

  structure: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      sector: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,

  dashboard: PropTypes.shape({
    publishedInterviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        publish: PropTypes.bool.isRequired,
        categories: PropTypes.arrayOf(
          PropTypes.number.isRequired,
        ).isRequired,
      }).isRequired,
    ).isRequired,
    writtingInterviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        publish: PropTypes.bool.isRequired,
        categories: PropTypes.arrayOf(
          PropTypes.number.isRequired,
        ).isRequired,
      }).isRequired,
    ).isRequired,
    savedInterviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(
          PropTypes.number.isRequired,
        ).isRequired,
      }).isRequired,
    ).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        displayed: PropTypes.bool.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,

  modifyUserInfo: PropTypes.func.isRequired,
  changeOrder: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,

};

export default UserLibrary;
