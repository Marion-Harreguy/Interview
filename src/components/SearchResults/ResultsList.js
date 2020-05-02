import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const ResultsList = ({ resultList }) => (
  <div className="research__results research__results--list">
    {/* <select className="research__order" name="order" value={results.order} onChange={(event) => changeOrder(event.target.value)}>
      <option value="alphabet">Alphabétique</option>
      <option value="chronologique">Chronologique</option>
    </select> */}
    {
      resultList.map((interview) => (
        <NavLink exact to={`read/${interview.id}`} className="result-interview" key={interview.id}>
          <div className="result-interview__meta-list">
            <h5 className="result-interview__meta result-interview__meta--title">{interview.title}</h5>
            <p className="result-interview__meta result-interview__meta--date">{interview.date}</p>
            <p className="result-interview__meta result-interview__meta--place">{interview.location}</p>
            <p className="result-interview__meta result-interview__meta--language">{interview.language}</p>
            <p className="result-interview__meta result-interview__meta--author">{`${interview.author.firstname} ${interview.author.lastname}`}</p>
            {
              interview.interviewed.map((interviewed) => {
                if (interviewed.firstname !== 'Anonyme') {
                  return (
                    <div key={interviewed.id}>
                      <p className="result-interview__meta result-interview__meta--interviewed">{`${interviewed.firstname} ${interviewed.lastname}`}</p>
                      <p className="result-interview__meta result-interview__meta--structure">{interviewed.structure.name}</p>
                    </div>
                  );
                }
                else {
                  return (
                      <p className="result-interview__meta result-interview__meta--interviewed">{interviewed.firstname}</p>
                  );
                }
            })
            }
          </div>
          <div className="result-interview__tag-list">
            {
                interview.tags.map((tag) => (
                  <p className="result-interview__tag" key={tag}>{tag}</p>
                ))
            }
          </div>
        </NavLink>
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
