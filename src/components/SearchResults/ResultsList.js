import React from 'react';
import PropTypes from 'prop-types';

const ResultsList = ({ resultList }) => (
  <div className="research__results research__results--list">
    {
      resultList.map((interview) => (
        <div className="result-interview">
          <div className="result-interview__meta-list">
            <h5 className="result-interview__meta result-interview__meta--title">{interview.title}</h5>
            <p className="result-interview__meta result-interview__meta--date">{interview.date}</p>
            <p className="result-interview__meta result-interview__meta--place">{interview.location}</p>
            <p className="result-interview__meta result-interview__meta--language">{interview.language}</p>
            <p className="result-interview__meta result-interview__meta--author">{`${interview.author.firstname} ${interview.author.lastname}`}</p>
            {
              interview.interviewed.map((interviewed) => (
                <div>
                  <p className="result-interview__meta result-interview__meta--interviewed">{`${interviewed.firstname} ${interviewed.lastname}`}</p>
                  <p className="result-interview__meta result-interview__meta--structure">{interviewed.structure.name}</p>
                </div>
              ))
            }
            
          </div>
          <div className="result-interview__tag-list">
            {
                interview.tags.map((tag) => (
                  <p className="result-interview__tag">{tag}</p>
                ))
            }
          </div>
        </div>
      ))
        }
  </div>
);

// ResultsList.propTypes = {
//     title: PropTypes.string.isRequired,
//     interviewDate: PropTypes.string.isRequired,
//     interviewPlace: PropTypes.string.isRequired,
//     interviewLanguage: PropTypes.string.isRequired,
//     interviewAuthor: PropTypes.string.isRequired,
//     interviewed: PropTypes.string.isRequired,
//     interviewStructure: PropTypes.string.isRequired,
//     interviewTags: PropTypes.shape({
//     }).isRequired,
// };

export default ResultsList;