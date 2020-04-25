import React from 'react';
import PropTypes from 'prop-types';

const ResultSelected = ({ interview }) => (
  <div className="result-timeline__interview">
    <div className="result-interview">
      <div className="result-interview__meta-list">
        <h5 className="result-interview__meta result-interview__meta--title">{interview.title}</h5>
        <p className="result-interview__meta result-interview__meta--date">{interview.date}</p>
        <p className="result-interview__meta result-interview__meta--place">{interview.city}</p>
        <p className="result-interview__meta result-interview__meta--language">{interview.language}</p>
        <p className="result-interview__meta result-interview__meta--author">{`${interview.author.firstname} ${interview.author.lastname}`}</p>

        { interview.interviewed.map((interviewed) => (
          <p key={`question-${interviewed.id}`} className="result-interview__meta result-interview__meta--interviewed">{`${interviewed.firstname} ${interviewed.lastname}`}</p>
        ))}

        <p className="result-interview__meta result-interview__meta--structure">{interview.interviewed[0].structure.name}</p>
      </div>
      <div className="result-interview__tag-list">
        { interview.tags.map((tag) => (
          <p className="result-interview__tag" key={tag}>{tag}</p>
        ))}
      </div>
    </div>
  </div>
);

ResultSelected.propTypes = {
  interview: PropTypes.shape({
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
};

export default ResultSelected;
