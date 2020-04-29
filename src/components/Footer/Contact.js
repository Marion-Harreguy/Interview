import React from 'react';
import './style.scss';
import $ from 'jquery';


const Contact = () => {

  const toggleClosed = () => {
    $('.right__contact').animate({ marginTop: '-110vh' }, 300);
  };

  return (
      <div>
    <div className="right__contact" style={{ position: 'absolute', marginTop:'110vh' }}>
      <button type="button" className="contact__button" onClick={() => toggleClosed()} label="Nous Contacter" />
      <h4>Contact</h4>
      <p> email: inter.view@gmail.com</p>
      <p> L'équipe Inter.View reste a votre écoute à tout heure du jour et de la nuit</p>
    <div className="legal__mentions">
        <h4> Mentions légales et Politique de confidentialité</h4>
        <p> L'équipe Inter.View, soucieuse des droits des individus, notamment au regard des traitements automatisés et dans une volonté de transparence avec ses utilisateurs, a mis en place une politique reprenant l'ensemble de ces traitements, des finalités poursuivies par ces derniers ainsi que des moyens d'actions à la disposition des individus afin qu'ils puissent au mieux exercer leurs droits</p>
        <p>Pour toute information complémentaire sur la protection des données personnelles, nous vous invitons à consulter le site: https://www.cnil.fr </p>
        <p>La poursuite de la navigation sur ce site vaut acceptation sans réserve des dispositions et conditions d'utilisation qui suivent.</p>
        <p>La version actuellement en ligne de ces conditions d'utilisation est la seule opposable pendant toute la durée d'utilisation du site et jusqu'a ce qu'une nouvelle version la remplace</p>
    </div>
    </div>
    </div>

)};

export default Contact;
