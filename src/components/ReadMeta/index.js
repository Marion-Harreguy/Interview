import React, { useEffect } from 'react';
import './style.scss';
import $ from 'jquery';

const ReadMeta = ({ interviewMeta, saveInterview, userCategories, interviewId, findInterview }) => {

  useEffect(() => findInterview({ interviewId, reducer: 'read' }));

  const downloadInterview = () => {
    // Here Baptist will get the data and make his code
    console.log("downloading the interview");
  };

  const openSubdata = (person) => {
    if (document.querySelector('.interview__subdata--'+person).style.display === 'block') {
      $('.interview__subdata--'+person).css('display','none');
      $('.span--'+person).html('&#8594;');
    }
    else {
      $('.span--'+person).html('&#8595;');
      $('.interview__subdata--'+person).css('display','block');
    }
  };

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
  };

  const categories = [];
  const id = interviewMeta.id;
  const title = interviewMeta.title;

  const saveMenu = (saveButton) => {
    if (document.querySelector('.read__categories').style.display !== 'block') {
      // Saving menu not opened yet
      document.querySelector('.read__categories').style.display = 'block';
    }
    else {
      // Saving menu is opened, needs to saves
      saveInterview({id, title, categories});
      document.querySelector('.read__categories').style.display = 'none';
    }
  };

  return (
  <aside className="left__menu left__menu--bottom left__menu--read">
    <div className="read__tools">
      <a href="/"><button className="tools__close" type="button" /></a>
      <button className="tools__save" type="button" onClick={(event) => saveMenu(event.target)} />
      <button className="tools__download" type="button" onClick={downloadInterview()}/>
    </div>

    <div className="interview__meta">
      <h2 className="interview__data interview__data--title">{interviewMeta.title}</h2>
      <p className="interview__data interview__data--date">{interviewMeta.year}</p>
      <p className="interview__data interview__data--city">{interviewMeta.city}</p>
      <p className="interview__data interview__data--language">{interviewMeta.language}</p>
      <p className="interview__data interview__data--author" onClick={() => openSubdata('author')}><span className="span--author">&#8594;</span> {interviewMeta.author.name} (a)</p>
      <p className="interview__subdata interview__subdata--author interview__subdata--structure">{interviewMeta.author.structure.name} — {interviewMeta.author.structure.city}</p>
      <p className="interview__subdata interview__subdata--author interview__subdata--status">{interviewMeta.author.status}</p>

      {
        interviewMeta.interviewed.map((inquired) => (
          <div>
            <p className="interview__data interview__data--interviewed" onClick={() => openSubdata(`interviewed--${inquired.id}`)}><span className={`span--interviewed--${inquired.id}`}>&#8594;</span> {inquired.name} (e)</p>
            <p className={`interview__subdata interview__subdata--interviewed interview__subdata--interviewed--${inquired.id}`}>{inquired.structure.name} — {inquired.structure.city}</p>
            <p className={`interview__subdata interview__subdata--interviewed interview__subdata--interviewed--${inquired.id}`}>{inquired.status}</p>
          </div>
        )
      )
      }
    </div>

    {/* CATEGORIES — shown when adding interview to library */}
    <div className="read__categories">
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

    {/* LATER FOR ANNOTATIONS
    <div className="interview__annotation">
      <button className="interview__annotation__close" />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis exercitationem delectus nemo, quam magnam non facilis expedita rerum maxime iste eius consectetur odio totam repellat, debitis excepturi, assumenda quo vitae!</p>
    </div> */}
  </aside>
)};

export default ReadMeta;
