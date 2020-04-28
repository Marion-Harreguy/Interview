import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import $ from 'jquery';

const ReadContent = ({ interview, interviewId, interviewGet }) => {
  // Load the interview from API based on the ID put in the URL
  useEffect(() => {
    interviewGet({ interviewId, reducer: 'read' });
  }, [interviewId]);

  // Get the different parts of the interview
  const interviewContext = interview.meta.context;
  const interviewContent = interview.content;
  const author = interview.meta.author.firstname+' '+interview.meta.author.lastname;

  // Get only initiales of author
  let authorInitiales = author.match(/\b\w/g) || [];
  authorInitiales = ((authorInitiales.shift() || '') + (authorInitiales.pop() || '')).toUpperCase();

  const highlightPerson = ({ person, content }) => {
    if (person === 'author') {
      document.querySelector('.interview__data--'+person+' p').style.fontFamily = 'Source-SemiBold';
    }
    else {
      const interviewedList = document.querySelectorAll('.interview__data--'+person);
      for (let interviewedIndex = 0; interviewedIndex < interviewedList.length; interviewedIndex ++) {
        let currentInitiales = interviewedList[interviewedIndex].querySelector('p').innerHTML.replace('(e)', '').match(/\b\w/g) || [];
        currentInitiales = ((currentInitiales.shift() || '') + (currentInitiales.pop() || '')).toUpperCase();
        console.log(interviewedList[interviewedIndex].innerHTML);
        if (currentInitiales === content) {
          interviewedList[interviewedIndex].querySelector('p').style.fontFamily = 'Source-SemiBold';
        }
      }
    }
  };

  const unhighlight = () => {
    document.querySelector('.interview__data--author p').style.fontFamily = 'Source-Light';
    $('.interview__data--interviewed p').css('font-family','Source-Light');
  };

  return (
    <div className="interview__content">
      <div className="interview__context">
        {interviewContext}
      </div>

      { // Mapping on each questions
      interviewContent.map((set, index) => (
        <div key={`question-${index}`}>
          <div className="interview__question">
            <span className="interview__initiales interview__initiales--question" onMouseOver={(event) => highlightPerson({ person: 'author', content: event.target.innerHTML})} onMouseOut={unhighlight}>{authorInitiales}</span>
            <p className="question__content">
              {set.question}
            </p>
          </div>
          { // Mapping on each answer for each question
          set.answer.map((answer, indexA) => (
            <div className="interview__answer" key={`answer-${indexA}`}>
              <span className="interview__initiales interview__initiales--answer" onMouseOver={(event) => highlightPerson({ person: 'interviewed', content: event.target.innerHTML})} onMouseOut={unhighlight}>{answer.interviewed}</span>
              <p className="answer__content">{answer.content}</p>
            </div>
          ))
          }
        </div>
      ))
    }
    </div>
  );
};


ReadContent.propTypes = {
  interviewId: PropTypes.string.isRequired,
  interviewGet: PropTypes.func.isRequired,
  interview: PropTypes.shape({
    meta: PropTypes.shape({
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
    content: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.shape({
          content: PropTypes.string.isRequired,
          interviewed: PropTypes.string.isRequired,
        }),
      }),
    ).isRequired,
  }).isRequired,
};

export default ReadContent;
