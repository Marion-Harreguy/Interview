import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ResultSelected from './ResultSelected';

const ResultsTimeline = ({ resultList }) => {

  const [chosenInterview, setChosenInterview] = useState({});
  const groupByYear = () => {
    let resultByYear = {};
    resultList.map((interview) => {
      const yearOnly = Number(interview.date.substring(0, 4));
      if (resultByYear[yearOnly]) resultByYear[yearOnly].push(interview);
      else resultByYear[yearOnly] = [interview];
    });
    return Object.entries(resultByYear);
  };

  let resultByYearTable = groupByYear();
  useEffect(() => {
    resultByYearTable = groupByYear();
  }, [resultList]);

  const currentYear = () => {
    const now = new Date();
    return now.getFullYear();
  };

  const displayInterview = (id) => {
    setChosenInterview(resultList.find((interview) => interview.id === id));
  };

  const calculateLeft = (interviewYear) => {
    return (Number(interviewYear.substring(0, 4))-1990)/(currentYear()-1990)*100 + "%";
  };

  return (

    <div className="research__results research__results--timeline">
      <div className="result-timeline__map">
        <div className="result-timeline__map__line__beginning">
          <div className="map__group__date">1990</div>
          <div className="map__group__cursor" />
        </div>
        <div className="result-timeline__map__line__end">
          <div className="map__group__date">{currentYear}</div>
          <div className="map__group__cursor" />
        </div>
        <div className="result-timeline__map__line" />

        {
        resultByYearTable.map((year) => {
          const yearleft = calculateLeft(year[0]);
          return (
            <div key={year[0]} className="result-timeline__map__group" style={{ left: yearleft }}>
              <div className="map__group__date">{year[0].substring(0,4) == 1990 ? '' : (year[0].substring(0,4) == currentYear ? '' : year[0].substring(0,4))}</div>
              <div className="map__group__cursor" />
              <div className="map__group__dot-list">
                {
                year[1].map((interview) => (
                  <div className="map__group__dot" onClick={() => displayInterview(interview.id)} key={interview.id}/>
                ))}
              </div>
            </div>
          )})
        }
      </div>

      {
            chosenInterview.hasOwnProperty('id') && (
              <ResultSelected interview={chosenInterview} />
            )
        }
    </div>
  );
};

ResultsTimeline.propTypes = {
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

export default ResultsTimeline;
