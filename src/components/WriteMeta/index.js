import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const WriteMeta = ({
  interviewMeta,
  deleteInterview,
  publishInterview,
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
  updateUserGet,
  updateUserPut,
  writeInterviewPut,
  writeInterviewDelete,
  getInterview,
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
    updateUserGet();
  };

  return (
    <aside className="left__menu left__menu--bottom left__menu--write">
      <div className="write__tools">
        <a href="/"><button className="tools__close" type="button" type="button" label="Fermer" /></a>
        <button className="tools__publish" type="button" onClick={() => {publishInterview(); updateUserPut();updateUserGet();}} label="Publier" />
        <button className="tools__delete" type="button" onClick={openDeleteMenu} label="Supprimer" />
      </div>

      <div className="write__delete-menu">
        <p>Êtes-vous sûr.e de vouloir supprimer cet entretien ?</p>
        <button className="write__delete-menu--no" onClick={closeDeleteMenu} label="Annuler" type="button">Annuler</button>
        <button className="write__delete-menu--yes" onClick={() =>{closeDeleteMenu(); deleteInterview(interviewId); writeInterviewDelete(interviewId); updateUserPut(); updateUserGet(); }} label="Supprimer" type="button">Supprimer</button>
      </div>

      <div className="interview__meta">
        <form className="write__form">
          <input className="write__form__input write__form__input--title" type="text" name="title" placeholder="Titre" value={interviewMeta.title} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write' });}} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="year" placeholder="Année" value={interviewMeta.year} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write' })}} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="localisation" placeholder="Ville" value={interviewMeta.localisation} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write' }); }} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="language" placeholder="Langue(s)" value={interviewMeta.language} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer:'write' })}} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="name" placeholder="Auteur" value={interviewMeta.author.name} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write' })}} onChange={(event) => changeAuthor(event.target)} />

          { // Open author subdata only if the name is changed from default user name to something else
              interviewMeta.author.name !== userName && (
                <div>
                  <input className="write__form__input" type="text" name="name" placeholder="Structure (auteur)" value={interviewMeta.author.structure.name} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write' })}} onChange={(event) => changeAuthorStructure(event.target)} />
                  <input className="write__form__input" type="text" name="city" placeholder="Ville (auteur)" value={interviewMeta.author.structure.localisation} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write' }); }} onChange={(event) => changeAuthorStructure(event.target)} />
                  <input className="write__form__input" type="text" name="status" placeholder="Statut (auteur)" value={interviewMeta.author.status} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write' }); }} onChange={(event) => changeAuthor(event.target)} />
                </div>
              ),
              // Create subdata for each interviewed
              interviewMeta.interviewed.map((interviewed, index) => {
                const numero = index + 1;
                return (
                  <div>
                    <input className="write__form__input" type="text" name="name" placeholder={`Enquêté n°${numero}`} value={interviewed.name} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write'});}} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                    { // If the interviewed is different from default value "anonyme", subdata is created
                        interviewed.name !== 'Anonyme' && (
                          <div>
                            <input className="write__form__input" type="text" name="name" placeholder={`Structure (n°${numero})`} value={interviewed.structure.name} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write'});}} onChange={(event) => changeInterviewedStructure({ target: event.target, index })} />
                            <input className="write__form__input" type="text" name="city" placeholder={`Ville (n°${numero})`} value={interviewed.structure.city} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write' }); }} onChange={(event) => changeInterviewedStructure({ target: event.target, index })} />
                            <input className="write__form__input" type="text" name="status" placeholder={`Statut (n°${numero})`} value={interviewed.structure.status} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write'}); }} onChange={(event) => changeInterviewed({ target: event.target, index })} />
                            <input className="write__form__input" type="text" name="email" placeholder={`Email de l'enquêté n°${numero}`} value={interviewMeta.interviewed.email} onBlur={() => { writeInterviewPut(interviewId); getInterview({ interviewId, reducer: 'write'}); }} onChange={(event) => changeInterviewed({ target: event.target, index })} />
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

          <input className="write__form__button" type="checkbox" checked={interviewMeta.openLicence} name="openLicence" id="royalty-free" onChange={(event) => changeMeta(event.target)} />
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
  changeAuthorStructure: PropTypes.func.isRequired,
  changeInterviewed: PropTypes.func.isRequired,
  changeInterviewedStructure: PropTypes.func.isRequired,
  changeInterviewCategories: PropTypes.func.isRequired,
  deleteInterview: PropTypes.func.isRequired,
  publishInterview: PropTypes.func.isRequired,
  changeMeta: PropTypes.func.isRequired,
  interviewMeta: PropTypes.shape({

  }).isRequired,
  userCategories: PropTypes.shape({

  }).isRequired,
};

// TODO : Add proptypes validation
// updateUserGet, updateUserPut, writeInterviewPut, writeInterviewDelete,getInterview,

export default WriteMeta;
