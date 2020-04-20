import React from 'react';
import './style.scss';

const WriteContent = ({ addNewQuestion, addNewAnswer, writeInterview, updateQuestion, updateAnswer }) => {
  // TODO : get user initiales
  const authorInitiales = 'LP';

  return(
  <div>
    <div className="interview__add">
      <button className="interview__add__button interview__add__button--question" onClick={() => addNewQuestion()}>Question</button>
      <button className="interview__add__button interview__add__button--answer" onClick={() => addNewAnswer()}>Réponse</button>
    </div>

    <div className="interview__content interview__content--write">
      {
        // writeInterview.context && <input type="text" className="interview__context">{writeInterview.context}</input>

        writeInterview.content.map((set, indexQuestion) => {
          return (
            <div>
              <div className="interview__question">
                <span className="interview__initiales interview__initiales--question">{authorInitiales}</span>
                <input type="text" className="question__content" value={set.question} onChange={(event) => updateQuestion({indexQuestion, value: event.target.value})}/>
              </div>
              {
                set.answers.map((answer, indexAnswer) => (
                  <div className="interview__answer">
                    <span className="interview__initiales interview__initiales--answer">{answer.interviewed}</span>
                    <input type="text" className="answer__content" value={answer.content} onChange={(event) => updateAnswer({indexQuestion, indexAnswer, value: event.target.value})}/>
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
)};

export default WriteContent;
