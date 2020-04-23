import React from 'react';

const ResultsTimeline = ({resultList}) => {

  const currentYear = () => {
    const now = new Date();
    return now.getFullYear();
  };

  const groupByYear = () => {
      return resultList;
  }

  let chosenInterview;

  const displayInterview = (id) => {
    chosenInterview = resultList.filter((interview) => interview.id === id);
  }

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
                groupByYear.map((year) => (
                    <div className="result-timeline__map__group" style="left:100px">
                        <div className="map__group__date">{year.date}</div>
                        <div className="map__group__cursor"></div>
                        <div className="map__group__dot-list">
                            {
                                year.interviews.map((interview) => {
                                    <div className="map__group__dot" onClick={() => displayInterview(interview.id)}></div>
                                }),
                            }
                        </div>
                    </div>
                ))
            }
            
        </div>

        {
            chosenInterview && (
              <div className="result-timeline__interview">
                <div className="result-interview">
                <div className="result-interview__meta-list">
                    <h5 className="result-interview__meta result-interview__meta--title">{chosenInterview.title}</h5>
                    <p className="result-interview__meta result-interview__meta--date">{chosenInterview.date}</p>
                    <p className="result-interview__meta result-interview__meta--place">{chosenInterview.city}</p>
                    <p className="result-interview__meta result-interview__meta--language">{chosenInterview.language}</p>
                    <p className="result-interview__meta result-interview__meta--author">{chosenInterview.author.name}</p>
                    { chosenInterview.interviewed.map((interviewed) => (
                        <p className="result-interview__meta result-interview__meta--interviewed">{interviewed.name}</p>
                    ))
                    }
                    
                    <p className="result-interview__meta result-interview__meta--structure">{chosenInterview.interviewed[0].structure.name}</p>
                </div>
                <div className="result-interview__tag-list">
                { chosenInterview.tags.map((tag) => (
                    <p className="result-interview__tag">{tag}</p>
                ))}
                </div>
            </div>
        </div>
            )
        }
        
    </div>
    )};

export default ResultsTimeline;