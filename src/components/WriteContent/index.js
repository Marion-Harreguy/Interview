import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const WriteContent = ({
  addNewQuestion,
  addNewAnswer,
  writeInterview,
  updateQuestion,
  updateAnswer,
  updateContext,
  interviewId,
  writeInterviewPut,
  // writeInterviewCreate,
  interviewGet,
  fillAuthor,
  dataUser,
}) => {

  // If the interview is new, create a new one in API
  // If interview exists as a draft, get its data from API
  useEffect(() => {
    if (interviewId) {
      interviewGet({ interviewId, reducer: 'write' });
    }
    else {
      fillAuthor(dataUser);
    }
  });

  // TODO : get user (or author) initiales
  // + get interviewed initiales (make select if several ?)
  const authorInitiales = 'LP';

  return (
    <div>
      <div className="interview__add">
        <button className="interview__add__button interview__add__button--question" onClick={() => addNewQuestion()} label="Ajouter une question" type="button">Question</button>
        <button className="interview__add__button interview__add__button--answer" onClick={() => addNewAnswer()} label="Ajouter une réponse" type="button">Réponse</button>
      </div>

      <div className="interview__content interview__content--write">
        <input type="text" className="interview__context" value={writeInterview.context} placeholder="Veuillez saisir le contexte de l'entretien" onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => updateContext(event.target.value)} />
        {

          writeInterview.content.map((set, indexQuestion) => (
              // Creating all the question blocs
              <div>
                <div className="interview__question">
                  <span className="interview__initiales interview__initiales--question">{authorInitiales}</span>
                  <input type="text" className="question__content" value={set.question} placeholder="Question" onBlur={() => writeInterviewPut(interviewId) } onChange={(event) => updateQuestion({ indexQuestion, value: event.target.value })} />
                </div>
                {
                  set.answers.map((answer, indexAnswer) => (
                    // Creating all the answer blocs
                    <div className="interview__answer">
                      <span className="interview__initiales interview__initiales--answer">{answer.interviewed}</span>
                      <input type="text" className="answer__content" value={answer.content} placeholder="Réponse" onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => updateAnswer({ indexQuestion, indexAnswer, value: event.target.value })} />
                    </div>
                  ))
                }
              </div>
          ))
        }
      </div>
    </div>
  )};

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

// TODO : add proptypes validation
// writeInterviewPut, writeInterviewCreate, interviewGet,

export default WriteContent;
