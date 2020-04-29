import React from 'react';
import './style.scss';


const LegalMentions = () => (
  <div className="right__contact">
    <button type="button" className="contact__button" onClick={() => toggleOpened()} label="Nous Contacter" />
    Mentions légales
  </div>
);

export default LegalMentions;