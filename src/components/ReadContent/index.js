import React, { useEffect } from 'react';
import './style.scss';

const ReadContent = ({ interview, interviewId, interviewGet }) => {

  // Load the interview from API based on the ID put in the URL
  useEffect(() => {
    interviewGet({ interviewId, reducer: 'read' });
  });

  // Get the different parts of the interview
  const interviewContext = interview.meta.context;
  const interviewContent = interview.content;
  const author = interview.meta.author.name;

  // Get only initiales of author
  let authorInitiales = author.match(/\b\w/g) || [];
  authorInitiales = ((authorInitiales.shift() || '') + (authorInitiales.pop() || '')).toUpperCase();

  return (
    <div className="interview__content">
      <div className="interview__context">
        {interviewContext}
      </div>

      { // Mapping on each questions
      interviewContent.map((set) => (
        <div>
          <div className="interview__question">
            <span className="interview__initiales interview__initiales--question">{authorInitiales}</span>
            <p className="question__content">
              {set.question}
            </p>
          </div>
          { // Mapping on each answer for each question
          set.answers.map((answer) => (
            <div className="interview__answer">
              <span className="interview__initiales interview__initiales--answer">{answer.interviewed}</span>
              <p className="answer__content">{answer.content}</p>
            </div>
          ))
          }
        </div>
      ))
    }
    </div>
  )};

// TODO : Proptypes Validation
// interview, interviewId, interviewGet
ReadContent.propTypes = {
  interviewId: PropTypes.string.isRequired,
  interviewGet: PropTypes.func.isRequired,
  interview: PropTypes.shape({

  }).isRequired,
};

export default ReadContent;