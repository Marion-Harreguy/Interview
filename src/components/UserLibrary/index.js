import React, { useEffect } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const UserLibrary = ({
  user,
  structure,
  dashboard,
  modifyUserInfo,
  library,
  changeOrder,
  toggleSection,
  toggleCategory }) => {

  const toggleInterview = (interviewCategoryList) => {
    let interviewShown = false;
    interviewCategoryList.forEach((interviewCategory) => {
      if (dashboard.categories.find((dataCategory) => dataCategory.id === interviewCategory).displayed) interviewShown = true;
    });
    return interviewShown;
  };

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison;
  }

  // Function to sort with select
  const sortDashboard = () => {
    if (library.order === 'alphabet') {
      let alphaDashboard = { ...dashboard };
      return {
        publishedInterviews: [...alphaDashboard.publishedInterviews.sort(compare)],
        writtingInterviews: [...alphaDashboard.writtingInterviews.sort(compare)],
        savedInterviews: [...alphaDashboard.savedInterviews.sort(compare)],
        categories: [...alphaDashboard.categories],
      };
    }
    return { ...dashboard };
  };

  let sortedDashboard = { ...sortDashboard() };

  useEffect(() => {
    sortedDashboard = { ...sortDashboard() };
  }, [library.order]);

  let formDisabled = true;

  // Créer une fonction qui inverse formEditable
  const changeFormDisabled = (event) => {
    event.preventDefault();
    formDisabled = !formDisabled;
    console.log(formDisabled);
  };

  return(
  <aside className="left__menu--top left__menu left__menu--home">
    <h2 className="home__name">{user.firstname} {user.lastname}</h2>
    <div className="home__content">
      <form className="home__form">
        <button className="home__form__button" type="submit" onClick={(event) => changeFormDisabled(event)}/>
        <input className="home__form__input" onChange={(evt) => modifyUserInfo(evt.target)} type="text" name="biography" value={user.biography} placeholder="Biographie" {...formDisabled ? 'disabled' : null} />
        <input className="home__form__input" onChange={(evt) => modifyUserInfo(evt.target)} type="text" name="status" value={user.status} placeholder="Statut" {...formDisabled ? 'disabled' : null} />
      </form>
      <div className="home__library">
        <h2 className="library__title">Ma bibliothèque</h2>
        <select className="library__order" name="order" value={library.order} onChange={(event) => changeOrder(event.target.value)}>
          <option value="alphabet">Alphabétique</option>
          <option value="chronologique">Chronologique</option>
        </select>

        <h3 className="library__section" onClick={()=>toggleSection('writtingInterviews')}>Mes entretiens en cours
          <NavLink exact to="/create">
            <button className="library__new-interview" type="button" />
          </NavLink>
        </h3>

        <div className={`section__list section__list--${library.writtingInterviews ? 'open' : 'closed'}`}>

          { sortedDashboard.writtingInterviews.map((interview) => (
            <div className="list__interview" key={interview.id} style={{display: toggleInterview(interview.categories) ? 'block' : 'none'}}>
              <NavLink exact to={`/update/${interview.id}`}>
                <h4 className="list__interview__title">{interview.title}</h4>
                <div className="list__interview__categories">
                  { interview.categories.map((category) => (
                    <span className={`list__category list__category--${category}`} key={category.id} />
                  ))}
                </div>
              </NavLink>
            </div>
          ))}

        </div>
        </div>

        {/* <h3 className="library__section" onClick={()=>toggleSection('publishedInterviews')}>Mes entretiens publiés</h3>

        <div className={`section__list section__list--${library.publishedInterviews ? 'open' : 'closed'}`}>

          { dashboard.publishedInterviews.map((interview) => (
            <div className="list__interview" key={interview.id}>
              <NavLink exact to={`/read/${interview.id}`}>
                <h4 className="list__interview__title">{interview.title}</h4>
                <div className="list__interview__categories">
                  { interview.categories.map((category) => (
                    <span className={`list__category list__category--${category}`} key={category.id} />
                  ))}
                </div>
              </NavLink>
            </div>
          ))}
        </div>

        <h3 className="library__section" onClick={()=>toggleSection('savedInterviews')}>Mes entretiens enregistrés</h3>

        <div className={`section__list section__list--${library.savedInterviews ? 'open' : 'closed'}`}>

          { dashboard.savedInterviews.map((interview) => (
            <div className="list__interview" key={interview.id}>
              <NavLink exact to={`/read/${interview.id}`}>
                <h4 className="list__interview__title"> {interview.title}</h4>
                <div className="list__interview__categories">
                  { interview.categories.map((category) => (
                    <span className={`list__category list__category--${category}`} key={category.id} />
                  ))}
                </div>
              </NavLink>
            </div>
          ))}
        </div>

        <h3 className="library__section">Mes recherches enregistrées</h3>
       
      </div> */}

      <div className="home__categories">
        <h2 className="categories__title">Mes catégories</h2>
        <div className="categories__list">
          { dashboard.categories.map((category) => (
            <div className="home__category" key={category.id}>
              <input className={`category-button category-button--${category.id}`} id={category.id} type="checkbox" onChange={(event) => toggleCategory(category.id)} checked={category.displayed}/>
              <label htmlFor={category.id}>{category.name}</label>
            </div>
          ))}

        <div className="home__category home__category--add">
          <input className="new-category-name" type="text" name="new-category" placeholder="Nouvelle catégorie"/>
          <button className="category-button category-button--add" type="button" />
        </div>
        </div>
      </div>
    </div>
  </aside>
)};

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
  library: PropTypes.shape({
    order: PropTypes.string.isRequired,
    publishedInterviews: PropTypes.bool.isRequired,
    savedInterviews: PropTypes.bool.isRequired,
    writtingInterviews: PropTypes.bool.isRequired,
  }).isRequired,

  toggleSection: PropTypes.func.isRequired,
  toggleCategory: PropTypes.func.isRequired,

};

export default UserLibrary;
