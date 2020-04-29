import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
// import Geocode from "react-geocode";
import $ from 'jquery';
import './style.scss';

const WriteMeta = ({
  interviewMeta,
  publishInterview,
  unpublishInterview,
  changeMeta,
  userCategories,
  changeInterviewCategories,
  addInterviewed,
  changeInterviewed,
  changeInterviewedStructure,
  changeAuthor,
  changeAuthorStructure,
  userName,
  interviewId,
  updateUserPut,
  writeInterviewPut,
  writeInterviewDelete,
  writeInterviewCreate,
  changeCoordinates,
  interviewContent,
  deleteInterviewed,
  dashboard,
}) => {

  // Table to stack the categories in which the user wants to put the interview
  let categories = [];

  useEffect(() => {
    setTimeout(() => {
      categories = interviewMeta.isPublished ? dashboard.publishedInterviews.find((interview) => interview.id == interviewId).categories : dashboard.writtingInterviews.find((interview) => interview.id == interviewId).categories;
      console.log(categories);
        
      for (let indexCategory = 0; indexCategory < categories.length; indexCategory ++){
        if(document.getElementById(categories[indexCategory])) document.getElementById(categories[indexCategory]).checked = true;
      }
    }, 1000);
  }, [dashboard]);

  // If user clicks on delete
  const openDeleteMenu = () => {
    document.querySelector('.write__delete-menu').style.display = 'block';
  };

  // If user clicks on cancel (in delete menu)
  const closeDeleteMenu = () => {
    document.querySelector('.write__delete-menu').style.display = 'none';
  };

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
    if (interviewMeta.id === 0 && interviewMeta.title.length > 3) {
      writeInterviewCreate();
    }
    else if (interviewMeta.id !== 0) {
      writeInterviewPut(interviewId);
    }
  };

  // Geocode.setApiKey("AIzaSyBtYuJUSNGudqHGhKyUN-ktG6RHCyjODM4");
  // Geocode.setLanguage("fr");

  const findLocation = (value) => {
    if (value !== '') {
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
    }
  };

  const turnTableToString = (tagTable) => {
    if (tagTable.length > 1) {
      return tagTable.join(' ');
    }
   return tagTable[0];
  };

  const turnStringToTable = (tagString) => {
    if (tagString.length > 0 && tagString.includes(' ')) {
      const tagTable = tagString.split(' ');
      console.log(tagTable);
      return tagTable;
    }
    return [tagString];
  };

  const checkMandatoryInfos = () => {
    const inputList = document.querySelectorAll('.write__form__input');
    let canPublish = true;
    for (let inputIndex = 0; inputIndex < inputList.length; inputIndex++ ) {
      if (inputList[inputIndex].value === '' || inputList[inputIndex].value === undefined || inputList[inputIndex].value === false || inputList[inputIndex].value === null) {
        if (inputList[inputIndex].htmlFor !== 'royalty-free') {
          canPublish = false;
        }
      }
    }
    if (interviewMeta.context === '') {
      window.alert('Veuillez saisir un contexte pour votre entretien');
      return false;
    }
    if (interviewContent.length < 1) {
      window.alert('Veuillez saisir du contenu pour votre entretien');
      return false;
    }
    if (canPublish) {
      document.querySelector('.write__publish-menu').style.display = 'block';
    }
    else window.alert('Veuillez renseigner tous les champs avant de publier votre entretien.');
  };

  const showMandatoryInfos = () => {
    const inputList = document.querySelectorAll('.write__form__input');
    for (let inputIndex = 0; inputIndex < inputList.length; inputIndex++ ) {
      if (inputList[inputIndex].value === '' || inputList[inputIndex].value === undefined || inputList[inputIndex].value === false || inputList[inputIndex].value === null) {
        if (inputList[inputIndex].htmlFor !== 'royalty-free') {
          inputList[inputIndex].setAttribute('style', 'border-bottom:solid 0.5px #bf4b4c !important');
        }
      }
      else inputList[inputIndex].setAttribute('style', undefined);
    }
    if (interviewMeta.context === '' || interviewMeta.context === null) {
      document.querySelector('.interview__context').setAttribute('style', 'border-bottom:solid 1px #bf4b4c !important');
    }
    if (interviewContent.length < 1) { 
      document.querySelector('.interview__add__button--question').setAttribute('style', 'border:solid 1px #bf4b4c !important');
      document.querySelector('.interview__add__button--answer').setAttribute('style', 'border:solid 1px #bf4b4c !important');
    }
  };

  const hideMandatoryInfos = () => {
    const inputList = document.querySelectorAll('.write__form__input');
    for (let inputIndex = 0; inputIndex < inputList.length; inputIndex++ ) {
      inputList[inputIndex].setAttribute('style', undefined);
    }
    document.querySelector('.interview__context').setAttribute('style', undefined);
    document.querySelector('.interview__add__button--question').setAttribute('style', undefined);
    document.querySelector('.interview__add__button--answer').setAttribute('style', undefined);
  };

  const closePublishMenu = () => {
    document.querySelector('.write__publish-menu').style.display = 'none';
  };

  const openUnpublishMenu = () => {
    document.querySelector('.write__unpublish-menu').style.display = 'block';
  };

  const closeUnpublishMenu = () => {
    document.querySelector('.write__unpublish-menu').style.display = 'none';
  };

  const blankInterviewed = () => {
    // Add interviewed button click
    // If there is interviewed created alreade
    if (interviewMeta.interviewed[0].firstname !== 'Anonyme') {
      addInterviewed();
      // $('.write__form__input--anonymous').css('display', 'none');
      setTimeout(()=> blankInterviewedLast(), 100);
    }
    else {
      changeInterviewed({ target: {name: 'firstname', value: '' }, index: 0 });
      // $('.write__form__input--anonymous').css('display', 'none');
      blankInterviewedLast();
    }
  };

  const blankInterviewedLast = () => {
    setTimeout(() => {
      const indexLast = interviewMeta.interviewed.length;
      // $('.write__form__input--anonymous').css('display', 'none');
      $(`#interviewed--${indexLast} .interviewed-first`).css('display', 'block');
      $('.write__form__input--interviewed--email').css('display', 'inline-block');
      $(`#interviewed--${indexLast} .interviewed-second`).css('display', 'none');
      //$(`#interviewed--${indexLast} .write__form__input--anonymous`).css('display', 'none');
    }, 200);
  }

  const checkEmail = (value) => {
    if (value !== '') showOtherFields();
    else blankInterviewed();
  };

  const showOtherFields = () => {
    const indexLast = interviewMeta.interviewed.length - 1;
    $(`#interviewed--${indexLast} .interviewed-second`).css('display','block');
    $(`#interviewed--${indexLast} .interviewed-first--notice`).css('display','none');
    $(`#interviewed--${indexLast} .write__form__add-infos`).css('display','none');
  };

  // const addInterviewedCheck = () => {
  //   if (interviewMeta.interviewed[0].firstname !== 'Anonyme') {
  //     console.log("New interviewed");
  //     addInterviewed();
  //   }
  //   else console.log("Changing from anonymous");
  // }


  return (
    <aside className="left__menu left__menu--bottom left__menu--write">
      <div className="write__tools">
        <NavLink exact to="/"><button className="tools__close" type="button" label="Fermer" /></NavLink>
        {
          !interviewMeta.isPublished ? (<button className="tools__publish" type="button" onMouseOver={() => showMandatoryInfos()} onMouseOut={() => hideMandatoryInfos()}  onClick={checkMandatoryInfos} label="Publier" />) : (<button className="tools__unpublish" type="button" onClick={openUnpublishMenu} label="Annuler la publication" />)
        }
        <button className="tools__delete" type="button" onClick={openDeleteMenu} label="Supprimer" />
        
      </div>

      <div className="write__delete-menu">
        <p>Êtes-vous sûr.e de vouloir supprimer cet entretien ?</p>
        <button className="write__delete-menu--no" onClick={closeDeleteMenu} label="Annuler" type="button">Annuler</button>
        <button className="write__delete-menu--yes" onClick={() =>{closeDeleteMenu(); writeInterviewDelete(interviewId); updateUserPut();}} label="Supprimer" type="button">Supprimer</button>
      </div>

      <div className="write__unpublish-menu">
        <p>Êtes-vous sûr.e de vouloir annuler la publication de cet entretien ? (Vous pourrez le remettre en ligne par la suite)</p>
        <button className="write__unpublish-menu--no" onClick={closeUnpublishMenu} label="Annuler" type="button">Annuler</button>
        <button className="write__unpublish-menu--yes" onClick={() =>{closeUnpublishMenu(), unpublishInterview(interviewId), writeInterviewPut(interviewId), updateUserPut()}} label="Supprimer" type="button">Remettre en brouillon</button>
      </div>

      <div className="write__publish-menu">
        <p>Êtes-vous sûr.e de vouloir publier cet entretien ?</p>
        <button className="write__publish-menu--no" onClick={closePublishMenu} label="Annuler" type="button">Annuler</button>
        <button className="write__publish-menu--yes" onClick={() =>{closePublishMenu(), publishInterview(interviewId), writeInterviewPut(interviewId), updateUserPut()}} label="Supprimer" type="button">Publier</button>
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
                  <input className="write__form__input" type="text" name="name" placeholder="Structure (auteur)" value={interviewMeta.author.structure.name} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthorStructure(event.target)} />
                  <input className="write__form__input" type="text" name="city" placeholder="Ville (auteur)" value={interviewMeta.author.structure.city} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthorStructure(event.target)} />
                  <input className="write__form__input" type="text" name="sector" placeholder="Secteur de la structure (auteur)" value={interviewMeta.author.structure.sector} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthorStructure(event.target)} />
                  <input className="write__form__input" type="text" name="status" placeholder="Statut (auteur)" value={interviewMeta.author.status} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeAuthor(event.target)} />
                </div>
              ),
              // Create subdata for each interviewed
              interviewMeta.interviewed.map((interviewed, index) => {
                const numero = index + 1;
                return (
                  <div key={interviewed.id} id={`interviewed--${index}`}>
                    {
                      (index === 0 && interviewed.firstname === 'Anonyme') && (<input className="write__form__input write__form__input--anonymous" type="text" name="anonyme" value="Anonyme" disabled/>)
                    }
                    { // If the interviewed is different from default value "anonyme", subdata is created
                        interviewed.firstname !== 'Anonyme' && (
                          <div className="write__form__interviewed">

                            <input className="write__form__input write__form__input--interviewed interviewed-first write__form__input--interviewed--email" type="text" name="email" placeholder={`Email de l'enquêté n°${numero}`} value={interviewed.email} onBlur={(event) => {writeInterviewPut(interviewId), checkEmail(event.target.value)}} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                            <span className="write__form__interviewed--number">{numero}</span>
                              <button className="write__form__interviewed--delete" onClick={(event) => {event.preventDefault(), deleteInterviewed(index)}}></button>
                            <p className="interviewed-first interviewed-first--notice">L'adresse email est nécessaire pour identifier l'enquêté. Si vous décidez de remplir les autres informations avant, il est possible qu'elles soient remplacées au moment où vous saisirez l'adresse, si l'enquêté est déjà connu de notre plateforme.</p>
                            <button className="write__form__add-infos write__form__button interviewed-first" onClick={(event)=>{event.preventDefault(), showOtherFields() }} label="Ajouter enquêté" type="button">Remplir les autres champs quand même</button>

                            <input className="write__form__input write__form__input--interviewed interviewed-second" style={{display: 'none'}} type="text" name="firstname" placeholder={`Prénom de l'enquêté n°${numero}`} value={interviewed.firstname} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                            <input className="write__form__input write__form__input--interviewed interviewed-second" style={{display: 'none'}} type="text" name="lastname" placeholder={`Nom de l'enquêté n°${numero}`} value={interviewed.lastname} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                            <input className="write__form__input write__form__input--interviewed interviewed-second" style={{display: 'none'}} type="text" name="name" placeholder={`Structure (n°${numero})`} value={interviewed.structure.name} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewedStructure({ target: event.target, index })} />
                            <input className="write__form__input write__form__input--interviewed interviewed-second" style={{display: 'none'}} type="text" name="city" placeholder={`Ville (n°${numero})`} value={interviewed.structure.city} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewedStructure({ target: event.target, index })} />
                            <input className="write__form__input write__form__input--interviewed interviewed-second" style={{display: 'none'}} type="text" name="sector" placeholder={`Secteur (n°${numero})`} value={interviewed.structure.sector} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewedStructure({ target: event.target, index })} />
                            <input className="write__form__input write__form__input--interviewed interviewed-second" style={{display: 'none'}} type="text" name="job" placeholder={`Statut (n°${numero})`} value={interviewed.job} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                          </div>
                        )
                        }
                  </div>
                );
              })
          }

          {
            (interviewMeta.interviewed[0].firstname === 'Anonyme' ? true : (interviewMeta.interviewed[interviewMeta.interviewed.length-1].firstname !== '')) && (
              <button className="write__form__add-interviewed write__form__button" onClick={(event)=>{event.preventDefault(), blankInterviewed() }} label="Ajouter enquêté" type="button">Ajouter un.e enquêté.e</button>
            )
          }

          <input className="write__form__button" type="checkbox" checked={interviewMeta.openLicence} name="openLicence" id="royalty-free" onChange={(event) => { changeMeta(event.target), writeInterviewPut(interviewId)}} />
          <label className="write__form__input write__form__input--royalty" htmlFor="royalty-free">Libre de droit</label>

          {
            interviewId ? (<input className="write__form__input" type="text" name="tags" placeholder="Tags" value={turnTableToString(interviewMeta.tags)} onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => changeMeta({ value: turnStringToTable(event.target.value), name: 'tags' })} />) : (<input className="write__form__input" type="text" name="tags" placeholder="Tags" value={[]}/>) 
          }
        </form>

        <div className="write__categories">
          <h2 className="categories__title">Catégorie(s) de l'entretien</h2>
          <div className="categories__list">
            {
            // Creating each category
            userCategories.map((category) => (
              <div className="home__category" key={category.id}>
                <input className={`category-button category-button--${category.id}`} id={category.id} type="checkbox" onChange={() => pushCategory(category.id)} name={`category-${category.id}`}
                />
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
  changeAuthorStructure: PropTypes.func.isRequired,
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
