import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ResultSelected = ({ interview }) => {
  console.log(interview);
  return(
  <div className="result-timeline__interview">
    <div className="result-interview">
      <div className="result-interview__meta-list">
        <h5 className="result-interview__meta result-interview__meta--title">{interview.title}</h5>
        <p className="result-interview__meta result-interview__meta--date">{interview.date}</p>
        <p className="result-interview__meta result-interview__meta--place">{interview.city}</p>
        <p className="result-interview__meta result-interview__meta--language">{interview.language}</p>
        <p className="result-interview__meta result-interview__meta--author">{`${interview.author.firstname} ${interview.author.lastname}`}</p>
        
        { interview.interviewed.map((interviewed) => (
          <p className="result-interview__meta result-interview__meta--interviewed">{`${interviewed.firstname} ${interviewed.lastname}`}</p>
        ))
        }
        
        <p className="result-interview__meta result-interview__meta--structure">{interview.interviewed[0].structure.name}</p>
      </div>
      <div className="result-interview__tag-list">
        { interview.tags.map((tag) => (
        <p className="result-interview__tag">{tag}</p>
    ))}
      </div>
    </div>
  </div>
)};

export default ResultSelected;