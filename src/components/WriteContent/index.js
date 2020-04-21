import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const WriteContent = ({ addNewQuestion, addNewAnswer, writeInterview, updateQuestion, updateAnswer, updateContext, interviewId }) => {
  // TODO : get user initiales
  const authorInitiales = 'LP';
  return(
  <div>
    <div className="interview__add">
      <button className="interview__add__button interview__add__button--question" onClick={() => addNewQuestion()}>Question</button>
      <button className="interview__add__button interview__add__button--answer" onClick={() => addNewAnswer()}>Réponse</button>
    </div>

    <div className="interview__content interview__content--write">
    <input type="text" className="interview__context" value={writeInterview.context} placeholder="Veuillez saisir le contexte de l'entretien" onChange={(event) => updateContext(event.target.value)} />
      {

        writeInterview.content.map((set, indexQuestion) => {
          return (
            <div>
              <div className="interview__question">
                <span className="interview__initiales interview__initiales--question">{authorInitiales}</span>
                <input type="text" className="question__content" value={set.question} placeholder="Question" onChange={(event) => updateQuestion({indexQuestion, value: event.target.value})}/>
              </div>
              {
                set.answers.map((answer, indexAnswer) => (
                  <div className="interview__answer">
                    <span className="interview__initiales interview__initiales--answer">{answer.interviewed}</span>
                    <input type="text" className="answer__content" value={answer.content} placeholder="Réponse" onChange={(event) => updateAnswer({indexQuestion, indexAnswer, value: event.target.value})}/>
                  </div>
                ))
              }
            </div>
          )
        }
        )
      }
    </div>
  </div>
  ) };

WriteContent.propTypes = {
  addNewQuestion: PropTypes.func.isRequired,
  addNewAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  updateContext: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  interviewId: PropTypes.string.isRequired,
  writeInterview: PropTypes.shape({

  }).isRequired,
};

export default WriteContent;
