import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const WriteMeta = ({
  interviewMeta,
  deleteInterview,
  publishInterview,
  changeMeta,
  userCategories,
  addWrittingInterview,
  changeInterviewCategories,
  addInterviewed,
  changeInterviewed,
  changeInterviewedStructure,
  changeAuthor,
  changeAuthorStructure,
  userName,
  interviewId,
  }) => {

  useEffect(() => { 
    addWrittingInterview();
  });

  const openDeleteMenu = () => {
    document.querySelector('.write__delete-menu').style.display = 'block';
  };

  const closeDeleteMenu = () => {
    document.querySelector('.write__delete-menu').style.display = 'none';
  };

  let categories = [];

  const pushCategory = (categoryId) => {
    let toDelete = false;
    categories.unshift(0);
    for (let index = 0; index < categories.length; index++) {
      if(categories[index] === categoryId) toDelete = index;
    }
    if(toDelete){
      categories.splice(toDelete, 1);
    }
    else {
      categories.push(categoryId);
    }
    categories.splice(0, 1);
    console.log(categories);
    changeInterviewCategories({categories, interviewId: interviewMeta.id});
  };

  return (
    <aside className="left__menu left__menu--bottom left__menu--write">
      <div className="write__tools">
        <a href="/"><button className="tools__close" type="button"></button></a>
        <button className="tools__publish" type="button" onClick={publishInterview}></button>
        <button className="tools__delete" type="button" onClick={openDeleteMenu}></button>
      </div>

      <div className="write__delete-menu">
        <p>Êtes-vous sûr.e de vouloir supprimer cet entretien ?</p>
        <button className="write__delete-menu--no" onClick={closeDeleteMenu}>Annuler</button>
        <button className="write__delete-menu--yes" onClick={() =>{closeDeleteMenu(), deleteInterview();}}>Supprimer</button>
      </div>

      <div className="interview__meta">
        <form className="write__form">
          <input className="write__form__input write__form__input--title" type="text" name="title" placeholder="Titre" value={interviewMeta.title} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="year" placeholder="Année" value={interviewMeta.year}  onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="localisation" placeholder="Ville" value={interviewMeta.localisation}  onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="language" placeholder="Langue(s)" value={interviewMeta.language} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="name" placeholder="Auteur" value={interviewMeta.author.name} onChange={(event) => changeAuthor(event.target)} />

          {
              interviewMeta.author.name !== userName && (
                <div>
                  <input className="write__form__input" type="text" name="name" placeholder="Structure (auteur)" value={interviewMeta.author.structure.name} onChange={(event) => changeAuthorStructure(event.target)} />
                  <input className="write__form__input" type="text" name="city" placeholder="Ville (auteur)" value={interviewMeta.author.structure.localisation} onChange={(event) => changeAuthorStructure(event.target)} />
                  <input className="write__form__input" type="text" name="status" placeholder="Statut (auteur)" value={interviewMeta.author.status} onChange={(event) => changeAuthor(event.target)} />
                </div>
              )
          }

         {
             interviewMeta.interviewed.map((interviewed, index) => {
                 let numero = index+1;
                 return(
                 <div>
                    <input className="write__form__input" type="text" name="name" placeholder={`Enquêté n°${numero}`} value={interviewed.name} onChange={(event) => changeInterviewed({target: event.target, index})} />
                    {
                        interviewed.name !== 'Anonyme' && (
                            <div>
                            <input className="write__form__input" type="text" name="name" placeholder={`Structure (n°${numero})`} value={interviewed.structure.name}  onChange={(event) => changeInterviewedStructure({target: event.target, index})} />
                            <input className="write__form__input" type="text" name="city" placeholder={`Ville (n°${numero})`} value={interviewed.structure.city}  onChange={(event) => changeInterviewedStructure({target: event.target, index})} />
                            <input className="write__form__input" type="text" name="status" placeholder={`Statut (n°${numero})`} value={interviewed.structure.status} onChange={(event) => changeInterviewed({target: event.target, index})} />
                            <input className="write__form__input" type="text" name="email" placeholder={`Email de l'enquêté n°${numero}`} value={interviewMeta.interviewed.email} onChange={(event) => changeInterviewed({target: event.target, index})} />
                            </div>
                        )
                        }
                </div>
                 );
            })
         }

        { interviewMeta.interviewed[interviewMeta.interviewed.length-1].name !== 'Anonyme' && (
         <button className="write__form__add-interviewed write__form__button" onClick={(event)=>{event.preventDefault(), addInterviewed();}} >Ajouter un.e enquêté.e</button>
         )
         }
          

          <input className="write__form__button" type="checkbox" checked={interviewMeta.openLicence} name="openLicence" id="royalty-free"  onChange={(event) => changeMeta(event.target)} />
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
  addWrittingInterview: PropTypes.func.isRequired,
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

export default WriteMeta;
