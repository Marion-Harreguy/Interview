import React from 'react';
import './style.scss';
import PictureA from './../../assets/images/introduction_A.png';
import PictureB from './../../assets/images/introduction_B.png';
import PictureC from './../../assets/images/introduction_C.png';

const Introduction = () => (
  <div className="right__presentation">
    <h2 className="presentation__title">Bienvenue</h2>
    <p className="presentation__content">Inter.view, la plateforme dédiée aux entretiens dans la recherche.</p>
    <p className="presentation__content">Naviguez au sein de notre banque d'entretiens, alimentée par le monde de la recherche lui-même.</p>
    <p className="presentation__content">Entrez vos critères dans le moteur de recherche et trouvez les entretiens qui nourriront votre travail.</p>

    <p className="presentation__content">La plateforme offre trois modes de représentation pour les corpus de résultats :</p>
    <div className="presentation__img"><img alt="Mode liste" src={PictureB} /></div>
    <div className="presentation__img"><img alt="Mode chronologique" src={PictureC} /></div>
    <div className="presentation__img"><img alt="Mode carte" src={PictureA} /></div>

    <p className="presentation__content">&bull; Liste par ordre alphabétique</p>
    <p className="presentation__content">&bull; Frise chronologique</p>
    <p className="presentation__content">&bull; Cartographie</p>

    <p className="presentation__content">Enregistrez les représentations générées afin d'enrichir votre travail.</p>
    <p className="presentation__content">Publier vos propres entretiens, et faites-en faire profiter vos pairs.</p>
  </div>
);

export default Introduction;
