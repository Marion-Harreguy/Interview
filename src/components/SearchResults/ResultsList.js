import React from 'react';
import PropTypes from 'prop-types';

const ResultsList = ({ resultList }) => (
  <div className="research__results research__results--list">
    {
      resultList.map((interview) => (
        <div className="result-interview" key={interview.id}>
          <div className="result-interview__meta-list">
            <h5 className="result-interview__meta result-interview__meta--title">{interview.title}</h5>
            <p className="result-interview__meta result-interview__meta--date">{interview.date}</p>
            <p className="result-interview__meta result-interview__meta--place">{interview.location}</p>
            <p className="result-interview__meta result-interview__meta--language">{interview.language}</p>
            <p className="result-interview__meta result-interview__meta--author">{`${interview.author.firstname} ${interview.author.lastname}`}</p>
            {
              interview.interviewed.map((interviewed) => (
                <div key={interviewed.id}>
                  <p className="result-interview__meta result-interview__meta--interviewed">{`${interviewed.firstname} ${interviewed.lastname}`}</p>
                  <p className="result-interview__meta result-interview__meta--structure">{interviewed.structure.name}</p>
                </div>
              ))
            }
          </div>
          <div className="result-interview__tag-list">
            {
                interview.tags.map((tag) => (
                  <p className="result-interview__tag" key={tag}>{tag}</p>
                ))
            }
          </div>
        </div>
      ))
        }
  </div>
);

ResultsList.propTypes = {
  resultList: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
};

export default ResultsList;
