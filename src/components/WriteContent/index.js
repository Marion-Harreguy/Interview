import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import $ from 'jquery';

const WriteContent = ({
  addNewQuestion,
  addNewAnswer,
  deleteQuestion,
  deleteAnswer,
  writeInterview,
  updateQuestion,
  updateAnswer,
  updateContext,
  interviewId,
  writeInterviewPut,
  interviewGet,
  fillAuthor,
  dataUser,
  dataStructure,
}) => {

  // If the interview is new, create a new one in API
  // If interview exists as a draft, get its data from API
  useEffect(() => {
    if (interviewId) {
      interviewGet({ interviewId, reducer: 'write' });
    }
    else {
      fillAuthor({
        name: `${dataUser.firstname} ${dataUser.lastname}`,
        status: dataUser.status,
        email: dataUser.email,
        structure: {
          name: dataStructure.name,
          city: dataStructure.city,
        },
      });
    }
  },[interviewId]);

  const fitSize = (target) => {
    console.log("fitting Size", $(target).height(),target.scrollHeight); 
    $(target).height(0).height(target.scrollHeight - 12);
  };

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
        <textarea type="text" className="interview__context" value={writeInterview.meta.context} placeholder="Veuillez saisir le contexte de l'entretien" onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => updateContext(event.target.value)} />
        {

          writeInterview.content.map((set, indexQuestion) => (
              // Creating all the question blocs
              <div key={`question-${indexQuestion}`}>
                <div className="interview__question">
                  <span className="interview__initiales interview__initiales--question">{authorInitiales}</span>
                  <textarea type="text" className="question__content" value={set.question} placeholder="Question" onBlur={() => writeInterviewPut(interviewId) } onChange={(event) => { fitSize(event.target) ,updateQuestion({ indexQuestion, value: event.target.value })}} /><button type="button" label="Supprimer cette question" className="question__content--delete" onClick={() => {deleteQuestion({ indexQuestion }), writeInterviewPut(interviewId)}} />
                </div>
                {
                  set.answer.map((answer, indexAnswer) => (
                    // Creating all the answer blocs
                    <div className="interview__answer" key={`answer-${indexAnswer}`}>
                      {/* <span className="interview__initiales interview__initiales--answer">{answer.interviewed}</span> */}
                      <span className="interview__initiales interview__initiales--answer">AA</span>
                      <textarea type="text" className="answer__content" value={answer.content} placeholder="Réponse" onBlur={() => writeInterviewPut(interviewId)} onChange={(event) => {fitSize(event.target), updateAnswer({ indexQuestion, indexAnswer, value: event.target.value })}} /><button type="button" label="Supprimer cette question" className="answer__content--delete" onClick={() => { deleteAnswer({ indexQuestion, indexAnswer }), writeInterviewPut(interviewId)}} />
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
  deleteQuestion: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  writeInterviewPut: PropTypes.func.isRequired,
  interviewGet: PropTypes.func.isRequired,
  fillAuthor: PropTypes.func.isRequired,
  dataUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  dataStructure: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired,
  }).isRequired,
};

export default WriteContent;
