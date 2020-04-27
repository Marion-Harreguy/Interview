import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';
import $ from 'jquery';

const ReadMeta = ({
  interviewMeta,
  saveInterview,
  userCategories,
  updateUserPut,
  dashboard,
  userId,
}) => {
  // Generate & download a PDF
  const downloadInterview = () => {
    // Here Baptist will get the data and make his code
    console.log("downloading the interview");
  };

  // Toggle infos about author or interviewed
  const openSubdata = (person) => {
    // If infos are already shown, close the infos
    if (document.querySelector(`.interview__subdata--${person}`).style.display === 'block') {
      $(`.interview__subdata--${person}`).css('display', 'none');
      $(`.span--${person}`).html('&#8594;');
    }
    // If infos are hidden, open them
    else {
      $(`.span--${person}`).html('&#8595;');
      $(`.interview__subdata--${person}`).css('display', 'block');
    }
  };

  // Table where interview-categories will be saved
  // if user decides to save it in his library
  const categories = [];

  // Add categories to the table
  // or remove them if already there
  const pushCategory = (categoryId) => {
    let toDelete = false;
    // This value is added so the array can get completely empty
    categories.unshift(0);
    for (let index = 0; index < categories.length; index++) {
      if (categories[index] === categoryId) toDelete = index;
    }
    // If value was already there, delete the value
    if (toDelete) {
      categories.splice(toDelete, 1);
    }
    // Otherwise, add the value
    else {
      categories.push(categoryId);
    }
    // Remove the first value (which might leave an empty array)
    categories.splice(0, 1);
  };

  // Save interview in user library
  const saveMenu = () => {
    // If saving menu not opened yet
    // + article was not saved
    // open category selection
    const isItSavedThis = isItSaved(interviewMeta.id);
    console.log(isItSavedThis);
    if (document.querySelector('.read__categories').style.display !== 'block' && isItSavedThis !== 'saved') {
      document.querySelector('.read__categories').style.display = 'block';
    }

    // If saving menu is opened, interview needs to be added to library
    else if (document.querySelector('.read__categories').style.display === 'block') {
      saveInterview({ id: interviewMeta.id, title: interviewMeta.title, categories });
      document.querySelector('.read__categories').style.display = 'none';
    }

    // If article was already saved, and needs to be unsaved
    else {
      saveInterview({ id: interviewMeta.id, title: interviewMeta.title, categories });
    }
  };

  const isItSaved = (id) => {
    let saved = 'not-saved';
    dashboard.savedInterviews.map((interview) => {
      if (interview.id === id) saved = 'saved';
    });
    return saved;
  };

  return (
    <aside className="left__menu left__menu--bottom left__menu--read">
      <div className="read__tools">
        <NavLink exact to="/">
          <button className="tools__close" type="button" label="Fermer" />
        </NavLink>
        {
          // est-ce l'auteur ?
          interviewMeta.author.id === userId ?
          // Si oui 
          ( <NavLink exact to={`/update/${interviewMeta.id}`}>
            <button className="tools__modify" type="button" label="Modifier" />
          </NavLink> ) : ( <button className={`tools__save tools__save--${isItSaved(interviewMeta.id)}`} type="button" onClick={(event) => saveMenu(event.target)} label="Ajouter à la biblothèque" />)
        }
        <button className="tools__download" type="button" onClick={() => downloadInterview()} label="Télécharger le PDF" />
      </div>

      {/* CATEGORIES — shown when adding interview to library */}
      <div className="read__categories" style={{display: 'none'}}>
        <h2 className="categories__title">Catégorie(s) pour cet entretien</h2>
        <div className="categories__list">
          { // Creating each category
          userCategories.map((category) => (
            <div className="home__category" key={category.id}>
              <input className={`category-button category-button--${category.id}`} id={category.id} type="checkbox" onChange={() => { pushCategory(category.id); updateUserPut(); }} name={`category-${category.id}`} />
              <label htmlFor={category.id}>{category.name}</label>
            </div>
          ))
          }
        </div>
      </div>

      <div className="interview__meta">
        <h2 className="interview__data interview__data--title">{interviewMeta.title}</h2>
        <p className="interview__data interview__data--date">{interviewMeta.date}</p>
        <p className="interview__data interview__data--city">{interviewMeta.location}</p>
        <p className="interview__data interview__data--language">{interviewMeta.language}</p>
        <p className="interview__data interview__data--author" onClick={() => openSubdata('author')}><span className="span--author">&#8594;</span>{`${interviewMeta.author.firstname} ${interviewMeta.author.lastname} (a)`}</p>
        {/* <p className="interview__subdata interview__subdata--author interview__subdata--structure">{interviewMeta.structure.name} — {interviewMeta.structure.location}</p> */}
        <p className="interview__subdata interview__subdata--author interview__subdata--status">{interviewMeta.author.status}</p>

        { // Creating subdata for each interviewed person
          interviewMeta.interviewed.map((inquired, indexI) => (
            <div key={`inquired-${indexI}`}>
              <p className="interview__data interview__data--interviewed" onClick={() => openSubdata(`interviewed--${inquired.id}`)}><span className={`span--interviewed--${inquired.id}`}>&#8594;</span> {`${inquired.firstname} ${inquired.lastname} (e)`}</p>
              <p className={`interview__subdata interview__subdata--interviewed interview__subdata--interviewed--${inquired.id}`}>{inquired.structure.name} — {inquired.structure.location}</p>
              <p className={`interview__subdata interview__subdata--interviewed interview__subdata--interviewed--${inquired.id}`}>{inquired.status}</p>
            </div>
          ))
        }
      </div>

      {/* LATER FOR ANNOTATIONS
      <div className="interview__annotation">
        <button className="interview__annotation__close" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis exercitationem delectus nemo, quam magnam non facilis expedita rerum maxime iste eius consectetur odio totam repellat, debitis excepturi, assumenda quo vitae!</p>
      </div> */}
    </aside>
  );
};

// TODO : Proptypes Validation
// interviewMeta, saveInterview, userCategories, updateUserGet,updateUserPut
ReadMeta.propTypes = {
  updateUserPut: PropTypes.func.isRequired,
  saveInterview: PropTypes.func.isRequired,
  interviewMeta: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired),
    date: PropTypes.string.isRequired,
    openLicence: PropTypes.bool.isRequired,
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      structure: {
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        sector: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      },
    }).isRequired,
    interviewed: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      structure: {
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        sector: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      },
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    context: PropTypes.string.isRequired,
  }).isRequired,
  userCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ReadMeta;
