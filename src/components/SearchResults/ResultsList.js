import React from 'react';

const ResultsList = ({ resultList }) => (
  <div className="research__results research__results--list">
    {
      resultList.map((interview) => (
        <div className="result-interview">
          <div className="result-interview__meta-list">
            <h5 className="result-interview__meta result-interview__meta--title">{interview.title}</h5>
            <p className="result-interview__meta result-interview__meta--date">{interview.date}</p>
            <p className="result-interview__meta result-interview__meta--place">{interview.city}</p>
            <p className="result-interview__meta result-interview__meta--language">{interview.language}</p>
            <p className="result-interview__meta result-interview__meta--author">{interview.author.name}</p>
            <p className="result-interview__meta result-interview__meta--interviewed">{interview.interviewed.name}</p>
            <p className="result-interview__meta result-interview__meta--structure">{interview.interviewed.structure}</p>
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

ResultsList.propTypes = {
    title: PropTypes.string.isRequired,
    interviewDate: PropTypes.string.isRequired,
    interviewPlace: PropTypes.string.isRequired,
    interviewLanguage: PropTypes.string.isRequired,
    interviewAuthor: PropTypes.string.isRequired,
    interviewed: PropTypes.string.isRequired,
    interviewStructure: PropTypes.string.isRequired,
    interviewTags: PropTypes.shape({
    }).isRequired,
}
export default ResultsList;