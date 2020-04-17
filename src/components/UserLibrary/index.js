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

  // Function to determine weather an interview is shown or not
  // Based on its category list, and which categories the user checked
  // Param = category list of the interview / Type = [table]
  const toggleInterview = (interviewCategoryList) => {
    let interviewShown = false;
    interviewCategoryList.forEach((interviewCategory) => {
      if (dashboard.categories.find((dataCategory) => dataCategory.id === interviewCategory).displayed) interviewShown = true;
    });
    return interviewShown;
  };

  // Function to put two elements in alphabetic order
  function compare(a, b) {
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

  // Function to sort with select :
  // Default table is in chronological order
  // If alphabetical order, uses Compare function
  // PROBLEM
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

  // Initiate sortedDashboard (used for the mapping)
  let sortedDashboard = { ...sortDashboard() };

  // Each time "library.order" prop is changed (with select — by user)
  // sortedDashboard is generated again —> mapping changes
  useEffect(() => {
    sortedDashboard = { ...sortDashboard() };
  }, [library.order]);

  // User information form is disabled by default
  let formDisabled = true;

  // const that changes an object into a table, so we can map on it
  // { A: contentA, B: contentB } => [ [ A, contentA ], [ B, contentB ] ]
  const sectionsAsTable = Object.entries(dashboard);

  // French title corresponding to the sections
  const sectionFrenchTitles = ["Mes entretiens publiés", "Mes entretiens en cours", "Mes entretiens enregistrés", "Mes recherches enregistrées"];

  // Function to switch weather userForm is editable or not
  const changeFormDisabled = (event) => {
    event.preventDefault();
    formDisabled = !formDisabled;
    console.log(formDisabled);
  };

  return (
    <aside className="left__menu--top left__menu left__menu--home">
      <h2 className="home__name">{user.firstname} {user.lastname}</h2>
      <div className="home__content">
        <form className="home__form">
          <button className="home__form__button" type="submit" onClick={(event) => changeFormDisabled(event)} />
          <input className="home__form__input" onChange={(evt) => modifyUserInfo(evt.target)} type="text" name="biography" value={user.biography} placeholder="Biographie" {...formDisabled ? 'disabled' : null} />
          <input className="home__form__input" onChange={(evt) => modifyUserInfo(evt.target)} type="text" name="status" value={user.status} placeholder="Statut" {...formDisabled ? 'disabled' : null} />
        </form>
        <div className="home__library">
          <h2 className="library__title">Ma bibliothèque</h2>
          <select className="library__order" name="order" value={library.order} onChange={(event) => changeOrder(event.target.value)}>
            <option value="alphabet">Alphabétique</option>
            <option value="chronologique">Chronologique</option>
          </select>

          {
            // MAPPING ON DASHBOARD (which has been turned from an object to a table)
            sectionsAsTable.map((section, index) => {
              const sectionTitle = section[0];
              const sectionContent = section[1];

              if (sectionTitle === 'categories') {
                // Creating the categories (one time)
                return (
                  <div className="home__categories">
                    <h2 className="categories__title">Mes catégories</h2>
                    <div className="categories__list">
                      {
                      // Creating each category
                      sectionContent.map((category) => (
                        <div className="home__category" key={category.id}>
                          <input className={`category-button category-button--${category.id}`} id={category.id} type="checkbox" onChange={() => toggleCategory(category.id)} checked={category.displayed} />
                          <label htmlFor={category.id}>{category.name}</label>
                        </div>
                      ))
                      }

                      <div className="home__category home__category--add">
                        <input className="new-category-name" type="text" name="new-category" placeholder="Nouvelle catégorie" />
                        <button className="category-button category-button--add" type="button" />
                      </div>
                    </div>
                  </div>
                );
              }

              // Creating library reading section
              return (
                <div>
                  <h3 className="library__section" onClick={() => toggleSection(sectionTitle)}>{sectionFrenchTitles[index]}
                    { sectionTitle === "writtingInterviews" &&
                      (
                      <NavLink exact to="/create">
                        <button className="library__new-interview" type="button" />
                      </NavLink>
                      )
                    }
                  </h3>
                  <div className={`section__list section__list--${library[sectionTitle] ? 'open' : 'closed'}`}>

                    { sectionContent.map((interview) => (
                      // Creating each interview
                      <div className="list__interview" key={interview.id} style={{ display: toggleInterview(interview.categories) ? 'block' : 'none' }}>
                        <NavLink exact to={`/update/${interview.id}`}>
                          <h4 className="list__interview__title">{interview.title}</h4>
                          <div className="list__interview__categories">
                            {/* Creating each category dot for each article */}
                            { interview.categories.map((category) => (
                              <span className={`list__category list__category--${category}`} key={category.id} />
                            ))}
                          </div>
                        </NavLink>
                      </div>
                    ))}

                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </aside>

  );
};

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
