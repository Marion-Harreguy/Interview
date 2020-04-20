import React from 'react';
import './style.scss';

const ReadContent = ({ interviewContext, interviewContent, author }) => {

  // Get only initiales of author
  let authorInitiales = author.match(/\b\w/g) || [];
  authorInitiales = ((authorInitiales.shift() || '') + (authorInitiales.pop() || '')).toUpperCase();

  console.log(interviewContent);

  return(
    <div className="interview__content">
      <div className="interview__context">
        {interviewContext}
      </div>

      {
      interviewContent.map((set) => {
        return(
        <div>
          <div className="interview__question">
            <span className="interview__initiales interview__initiales--question">{authorInitiales}</span>
            <p className="question__content">
              {set.question}
            </p>
          </div>
          {
          set.answers.map((answer) => (
          <div className="interview__answer">
            <span className="interview__initiales interview__initiales--answer">{answer.interviewed}</span>
            <p className="answer__content">{answer.content}</p>
          </div>
          ))
          }
      </div>
        )}
       )
    }
    </div>
  )};

export default ReadContent;