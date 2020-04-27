import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
// import Geocode from "react-geocode";
import './style.scss';

const WriteMeta = ({
  interviewMeta,
  publishInterview,
  changeMeta,
  userCategories,
  changeInterviewCategories,
  addInterviewed,
  changeInterviewed,
  changeInterviewedStructure,
  changeAuthor,
  // changeAuthorStructure,
  userName,
  interviewId,
  updateUserPut,
  writeInterviewPut,
  writeInterviewDelete,
  writeInterviewCreate,
  changeCoordinates,
}) => {
  // If user clicks on delete
  const openDeleteMenu = () => {
    document.querySelector('.write__delete-menu').style.display = 'block';
  };

  // If user clicks on cancel (in delete menu)
  const closeDeleteMenu = () => {
    document.querySelector('.write__delete-menu').style.display = 'none';
  };

  // Table to stack the categories in which the user wants to put the interview
  const categories = [];

  // Add category to the table if it's not there, remove it otherwise
  // For more details : see ReadMeta component (pushCategory function)
  const pushCategory = (categoryId) => {
    let toDelete = false;
    categories.unshift(0);
    for (let index = 0; index < categories.length; index++ ) {
      if (categories[index] === categoryId) toDelete = index;
    }
    if (toDelete) {
      categories.splice(toDelete, 1);
    }
    else {
      categories.push(categoryId);
    }
    categories.splice(0, 1);
    changeInterviewCategories({ categories, interviewId: interviewMeta.id });
    updateUserPut();
  };

  const createOrPut = () => {
    console.log("create or put ?");
    if (interviewMeta.id === 0 && interviewMeta.title.length > 3) {
      console.log("create");
      writeInterviewCreate();
    }
    else if (interviewMeta.id !== 0) {
      console.log(interviewMeta);
      console.log("put");
      writeInterviewPut(interviewId);
    }
    console.log("none");
  };

  // Geocode.setApiKey("AIzaSyBtYuJUSNGudqHGhKyUN-ktG6RHCyjODM4");
  // Geocode.setLanguage("fr");

  const findLocation = (value) => {
    axios({
      url: `http://open.mapquestapi.com/geocoding/v1/address?key=0yrU5DyX2Ek89MaqwXGWCBUNpcPDJEv9&location=${value}`,
      method: 'get',
    })
      .then((response) => {
        const x = parseInt(response.data.results[0].locations[0].latLng.lat);
        const y = parseInt(response.data.results[0].locations[0].latLng.lng);
        changeCoordinates([x, y]);
        writeInterviewPut(interviewId);
      },
      error => {
        console.error(error);
      },
    );
  };

  return (
    <aside className="left__menu left__menu--bottom left__menu--write">
      <div className="write__tools">
        <NavLink exact to="/"><button className="tools__close" type="button" type="button" label="Fermer" /></NavLink>
        <button className="tools__publish" type="button" onClick={() => {publishInterview(); updateUserPut();}} label="Publier" />
        <button className="tools__delete" type="button" onClick={openDeleteMenu} label="Supprimer" />
        
      </div>

      <div className="write__delete-menu">
        <p>Êtes-vous sûr.e de vouloir supprimer cet entretien ?</p>
        <button className="write__delete-menu--no" onClick={closeDeleteMenu} label="Annuler" type="button">Annuler</button>
        <button className="write__delete-menu--yes" onClick={() =>{closeDeleteMenu(); writeInterviewDelete(interviewId); updateUserPut();}} label="Supprimer" type="button">Supprimer</button>
      </div>

      <div className="interview__meta">
        <form className="write__form">
          <input className="write__form__input write__form__input--title" type="text" name="title" placeholder="Titre" value={interviewMeta.title} onBlur={() => createOrPut()} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="date" name="date" placeholder="Année" date="dd-MM-yyyy" value={interviewMeta.date} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="location" placeholder="Lieu de l'entretien" value={interviewMeta.location} onBlur={(event) => findLocation(event.target.value)} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="language" placeholder="Langue(s)" value={interviewMeta.language} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeMeta(event.target)} />
          {/* <input className="write__form__input" type="text" name="firstname" placeholder="Prénom de l'auteur" value={interviewMeta.author.firstname} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthor(event.target)} />
          <input className="write__form__input" type="text" name="lastname" placeholder="Nom de l'auteur" value={interviewMeta.author.lastname} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthor(event.target)} /> */}
          <input className="write__form__input" type="text" name="firstname" placeholder="Auteur" value={`Auteur : ${interviewMeta.author.firstname} ${interviewMeta.author.lastname}`} disabled />

          { // Open author subdata only if the name is changed from default user name to something else
              interviewMeta.author.name !== userName && (
                <div>
                  {/* <input className="write__form__input" type="text" name="name" placeholder="Structure (auteur)" value={interviewMeta.structure[0].name} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthorStructure(event.target)} />
                  <input className="write__form__input" type="text" name="city" placeholder="Ville (auteur)" value={interviewMeta.structure[0].localisation} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthorStructure(event.target)} /> */}
                  <input className="write__form__input" type="text" name="status" placeholder="Statut (auteur)" value={interviewMeta.author.status} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthor(event.target)} />
                </div>
              ),
              // Create subdata for each interviewed
              interviewMeta.interviewed.map((interviewed, index) => {
                const numero = index + 1;
                return (
                  <div key={interviewed.id}>
                    <input className="write__form__input" type="text" name="firstname" placeholder={`Prénom de l'enquêté n°${numero}`} value={interviewed.firstname} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                    { // If the interviewed is different from default value "anonyme", subdata is created
                        interviewed.firstname !== 'Anonyme' && (
                          <div>
                            <input className="write__form__input" type="text" name="lastname" placeholder={`Nom de l'enquêté n°${numero}`} value={interviewed.lastname} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                            <input className="write__form__input" type="text" name="name" placeholder={`Structure (n°${numero})`} value={interviewed.structure.name} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewedStructure({ target: event.target, index })} />
                            <input className="write__form__input" type="text" name="city" placeholder={`Ville (n°${numero})`} value={interviewed.structure.city} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewedStructure({ target: event.target, index })} />
                            <input className="write__form__input" type="text" name="job" placeholder={`Statut (n°${numero})`} value={interviewed.job} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                            <input className="write__form__input" type="text" name="email" placeholder={`Email de l'enquêté n°${numero}`} value={interviewMeta.interviewed.email} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                          </div>
                        )
                        }
                  </div>
                );
              })
          }

          { // If the interviewed is different from default value "anonyme", offer to add a new one
          interviewMeta.interviewed[interviewMeta.interviewed.length-1].name !== 'Anonyme' && (
          <button className="write__form__add-interviewed write__form__button" onClick={(event)=>{event.preventDefault(); addInterviewed();}} label="Ajouter enquêté" type="button">Ajouter un.e enquêté.e</button>
          )
         }

          <input className="write__form__button" type="checkbox" checked={interviewMeta.openLicence} name="openLicence" id="royalty-free" onChange={(event) => { changeMeta(event.target), writeInterviewPut(interviewId)}} />
          <label className="write__form__input write__form__input--royalty" htmlFor="royalty-free">Libre de droit</label>
        </form>

        <div className="write__categories">
          <h2 className="categories__title">Catégorie(s) de l'entretien</h2>
          <div className="categories__list">
            {
            // Creating each category
            userCategories.map((category) => (
              <div className="home__category" key={category.id}>
                <input className={`category-button category-button--${category.id}`} id={category.id} type="checkbox" onChange={() => pushCategory(category.id)} name={`category-${category.id}`} />
                <label htmlFor={category.id}>{category.name}</label>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </aside>
  );
};

WriteMeta.propTypes = {
  userName: PropTypes.string.isRequired,
  interviewId: PropTypes.string.isRequired,
  addInterviewed: PropTypes.func.isRequired,
  changeAuthor: PropTypes.func.isRequired,
  // changeAuthorStructure: PropTypes.func.isRequired,
  changeInterviewed: PropTypes.func.isRequired,
  changeInterviewedStructure: PropTypes.func.isRequired,
  changeInterviewCategories: PropTypes.func.isRequired,
  // deleteInterview: PropTypes.func.isRequired,
  publishInterview: PropTypes.func.isRequired,
  changeMeta: PropTypes.func.isRequired,
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
  updateUserPut: PropTypes.func.isRequired,
  writeInterviewPut: PropTypes.func.isRequired,
  writeInterviewDelete: PropTypes.func.isRequired,
  writeInterviewCreate: PropTypes.func.isRequired,
  changeCoordinates: PropTypes.func.isRequired,
};

// TODO : Add proptypes validation
// updateUserGet, updateUserPut, writeInterviewPut, writeInterviewDelete,getInterview,

export default WriteMeta;
