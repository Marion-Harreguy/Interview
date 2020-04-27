import React, { useEffect } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

const UserLibrary = ({
  user,
  dashboard,
  library,
  changeOrder,
  toggleSection,
  toggleCategory,
  addCategoryChange,
  addCategorySubmit,
  newCategoryName,
  modifyUserInfo,
  changeFormDisabled,
  formDisabled,
  updateUserPut,
  updateUserGet,
}) => {

  // Get all user info from API onload
  useEffect(() => {
    updateUserGet();
  }, [user.id]);

  // Function to determine weather an interview is shown or not
  // Based on its category list, and which categories the user checked
  // Param = category list of the interview / Type = [table]
  const toggleInterview = (interviewCategoryList) => {
    let interviewShown = false;
    interviewCategoryList.forEach((interviewCategory) => {
      const categoryIndex = dashboard.categories.findIndex((dataCategory) => dataCategory.id === interviewCategory);
      if (library.categoryDisplay[categoryIndex]) interviewShown = true;
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
  const sortDashboard = () => {
    if (library.order === 'alphabet') {
      const alphaDashboard = {
        publishedInterviews: [...dashboard.publishedInterviews],
        writtingInterviews: [...dashboard.writtingInterviews],
        savedInterviews: [...dashboard.savedInterviews],
        categories: [...dashboard.categories],
      };
      return {
        publishedInterviews: alphaDashboard.publishedInterviews.sort(compare),
        writtingInterviews: alphaDashboard.writtingInterviews.sort(compare),
        savedInterviews: alphaDashboard.savedInterviews.sort(compare),
        categories: alphaDashboard.categories,
      };
    }
    return { ...dashboard };
  };

  // Initiate sortedDashboard (used for the mapping)
  const sortedDashboard = sortDashboard();

  // const that changes an object into a table, so we can map on it
  // { A: contentA, B: contentB } => [ [ A, contentA ], [ B, contentB ] ]
  const sectionsAsTable = Object.entries(sortedDashboard);

  // French title corresponding to the sections
  const sectionFrenchTitles = [
    'Mes entretiens publiés',
    'Mes entretiens en cours',
    'Mes entretiens enregistrés',
    'Mes recherches enregistrées',
  ];

  const smoothTransition = (sectionIsOpen, sectionTitle) => {
    const correspondingList = document.querySelector(`.${sectionTitle}-container .section__list`);

    if (sectionIsOpen) {
      // Transition to close the section
      $(correspondingList).animate({ height: '0px' }, 500, 'swing');
    }
    else {
      // Transition to close the section
      $(correspondingList).css('height', 'auto');
      const sectionAutoHeight = `${correspondingList.clientHeight}px`;
      $(correspondingList).css('height', 0);
      $(correspondingList).animate({ height: sectionAutoHeight }, 500, 'swing');
    }
  };

  return (
    <aside className="left__menu--top left__menu left__menu--home">
      <h2 className="home__name">{user.firstname} {user.lastname}</h2>
      <div className="home__content">
        <form className="home__form">
          <button className="home__form__button" type="submit" onClick={(event) => {event.preventDefault(), changeFormDisabled(event), updateUserPut()}} label="Changer mes infos" />
          <input className="home__form__input" onChange={(event) => modifyUserInfo(event.target)} type="text" name="status" value={user.status} placeholder="Statut" style={{ pointerEvents: formDisabled ? 'none' : 'initial' }} />
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
                  <div key={`sec-${section.id}`} className="home__categories">
                    <h2 className="categories__title">Mes catégories</h2>
                    <div className="categories__list">
                      {
                      // Creating each category
                      sectionContent.map((category, index) => (
                        <div className="home__category" key={`cat-${category.id}`}>
                          <input className={`category-button category-button--${category.id}`} id={category.id} type="checkbox" onChange={() => toggleCategory(category.id)} checked={library.categoryDisplay[index]} name={`category-${category.id}`} />
                          <label htmlFor={category.id}>{category.name}</label>
                        </div>
                      ))
                      }

                      <div className="home__category home__category--add">
                        <input className="new-category-name" onChange={(e) => addCategoryChange(e.target.value)} type="text" name="new-category" placeholder="Nouvelle catégorie" name="new-category" value={newCategoryName}/>
                        <button
                          className="category-button category-button--add" 
                          onClick={(e) => { 
                            addCategorySubmit(e.target); 
                            setTimeout(() => { updateUserPut() },1000);
                          }} type="button" label="Ajouter une catégorie" />
                      </div>
                    </div>
                  </div>
                );
              }

              // Creating library reading section
              return (
                <div className={`${sectionTitle}-container`}>
                  <h3 className="library__section" onClick={() => { smoothTransition(library[sectionTitle], sectionTitle), toggleSection(sectionTitle) }}>{sectionFrenchTitles[index]}
                    { sectionTitle === 'writtingInterviews'
                      && (
                      <NavLink exact to="/create">
                        <button className="library__new-interview" type="button" label="Créer un nouvel entretien" />
                      </NavLink>
                      )}
                  </h3>
                  <div className={`section__list section__list--${library[sectionTitle] ? 'open' : 'closed'}`}>

                    { sectionContent.map((interview) => (
                      // Creating each interview
                      <div className="list__interview" key={`int-${interview.id}`}>
                        <NavLink exact to={`/update/${interview.id}`}>
                          <h4 className="list__interview__title">{interview.title}</h4>
                          <div className="list__interview__categories">
                            {/* Creating each category dot for each article */}
                            { interview.categories.map((category) => (
                              <span className={`list__category list__category--${category}`} key={`catt-${category.id}`} />
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
    status: PropTypes.string.isRequired,
  }).isRequired,

  dashboard: PropTypes.shape({
    publishedInterviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(
          PropTypes.number.isRequired,
        ).isRequired,
      }).isRequired,
    ).isRequired,
    writtingInterviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
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
      }).isRequired,
    ).isRequired,
  }).isRequired,

  changeOrder: PropTypes.func.isRequired,
  library: PropTypes.shape({
    order: PropTypes.string.isRequired,
    publishedInterviews: PropTypes.bool.isRequired,
    savedInterviews: PropTypes.bool.isRequired,
    writtingInterviews: PropTypes.bool.isRequired,
  }).isRequired,

  toggleSection: PropTypes.func.isRequired,
  toggleCategory: PropTypes.func.isRequired,
  addCategoryChange: PropTypes.func.isRequired,
  addCategorySubmit: PropTypes.func.isRequired,
  newCategoryName: PropTypes.string.isRequired,
  modifyUserInfo: PropTypes.func.isRequired,
  changeFormDisabled: PropTypes.func.isRequired,
  formDisabled: PropTypes.bool.isRequired,
  updateUserPut: PropTypes.func.isRequired,
  updateUserGet: PropTypes.func.isRequired,
};


export default UserLibrary;
