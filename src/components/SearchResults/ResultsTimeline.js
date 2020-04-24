import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ResultSelected from './ResultSelected';

const ResultsTimeline = ({ resultList }) => {

  const [chosenInterview, setChosenInterview] = useState({});
  const groupByYear = () => {
    let resultByYear = {};
    resultList.map((interview) => {
      const yearOnly = Number(interview.date.substring(0, 4));
      console.log(yearOnly);
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
            <div className="map__group__cursor"></div>
          </div>
        <div className="result-timeline__map__line__end">
            <div className="map__group__date">{currentYear}</div>
            <div className="map__group__cursor"></div>
          </div>
        <div className="result-timeline__map__line"></div>

        {
        resultByYearTable.map((year) => {
          const yearleft = calculateLeft(year[0]);
          return (
            <div className="result-timeline__map__group" style={{ left: yearleft }}>
              <div className="map__group__date">{year[0].substring(0,4)}</div>
              <div className="map__group__cursor" />
              <div className="map__group__dot-list">
                {
                year[1].map((interview) => (
                  <div className="map__group__dot" onClick={() => displayInterview(interview.id)} />
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

export default ResultsTimeline;