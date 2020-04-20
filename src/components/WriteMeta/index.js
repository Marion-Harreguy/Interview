import React, { useEffect } from 'react';
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

  return (
    <aside className="left__menu left__menu--bottom left__menu--write">
      <div className="write__tools">
        <a href="/"><button className="tools__close" type="button"></button></a>
        <button className="tools__publish" type="button" onClick={publishInterview}></button>
        <button className="tools__delete" type="button" onClick={openDeleteMenu}></button>
      </div>

      <div className="interview__meta">
        <form className="write__form">
          <input className="write__form__input write__form__input--title" type="text" name="title" placeholder="Titre" value={interviewMeta.title} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="year" placeholder="Année" value={interviewMeta.year}  onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="localisation" placeholder="Ville" value={interviewMeta.localisation}  onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="language" placeholder="Langue(s)" value={interviewMeta.language} onChange={(event) => changeMeta(event.target)} />
          <input className="write__form__input" type="text" name="author" placeholder="Auteur" value={interviewMeta.author.name} onChange={(event) => changeAuthor(event.target.value)} />

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
                 )
            })
         }

        { interviewMeta.interviewed[interviewMeta.interviewed.length-1].name !== 'Anonyme' && (
         <button className="write__form__add-interviewed write__form__button" onClick={(event)=>{event.preventDefault(), addInterviewed()}} >Ajouter un.e enquêté.e</button>
         )
         }
          

          <input className="write__form__button" type="checkbox" checked={interviewMeta.openLicence} name="royalty-free" id="royalty-free"  onChange={(event) => changeMeta(event.target)} />
          <label className="write__form__input write__form__input--royalty" htmlFor="royalty-free">Libre de droit</label>
        </form>

        <div className="write__categories">
          <h2 className="categories__title">Catégorie(s) de l'entretien</h2>
          <div className="categories__list">
            {
            // Creating each category
            userCategories.map((category) => (
              <div className="home__category" key={category.id}>
                <input className={`category-button category-button--${category.id}`} id={category.id} type="checkbox" onChange={() => changeInterviewCategories(category.id)} name={`category-${category.id}`} />
                <label htmlFor={category.id}>{category.name}</label>
              </div>
            ))
            }
          </div>
        </div>
      </div>

      <div className="write__delete-menu">
        <p>Êtes-vous sûr.e de vouloir supprimer cet entretien ?</p>
        <button className="write__delete-menu--no" onClick={closeDeleteMenu}>Annuler</button>
        <button className="write__delete-menu--yes" onClick={() =>{closeDeleteMenu(), deleteInterview()}}>Supprimer</button>
      </div>
    </aside>
  );
};

export default WriteMeta;
