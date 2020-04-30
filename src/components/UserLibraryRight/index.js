import React from 'react';
import './style.scss';
import $ from 'jquery';

const UserLibraryRight = () => {

  const toggleSection = (currentTarget) => {
    const toToggle = document.querySelector('.'+currentTarget.parentElement.className.replace('tuto__','instructions--'));
    console.log(toToggle);
    const isOpen = toToggle.clientHeight > 0;
    if (!isOpen) {
      toToggle.style.height = 'auto';
      const autoHeight = toToggle.clientHeight+'px';
      toToggle.style.height = '0px';
      $(toToggle).animate({ height: autoHeight}, 300);
    }
   else $(toToggle).animate({ height: '0px'}, 300);
  };

  return (
  <div className="tuto">
    <h2>Guide de la plateforme</h2>
    <div className="tuto__scroll">
      <div className="tuto__perso">
        <h3 onClick={(event) => toggleSection(event.currentTarget)}> Espace perso</h3>
        <div className="instructions instructions--perso">
        <p><span className="tuto__pencil" />Modifiez votre profil</p>
        <p><span className="tuto__plus tuto__round" />Commencez un nouvel entretien (seulement disponible sur les écrans larges)</p>
        <p><span className="tuto__categoryplus tuto__round" /><span className="tuto__category" />Créez vos catégories personnelles, pour ranger vos documents. Séléctionnez-les ou non afin de choisir ce qui apparait dans votre bibliothèque</p>
        <p><span className="tuto__deroulant" />Classez les entretiens de votre bibliothèque</p>
        </div>
      </div>
      <div className="tuto__read">
          <h3 onClick={(event) => toggleSection(event.currentTarget)}>Espace lecture</h3>
          <div className="instructions instructions--read">
          <p><span className="tuto__content">&#8594;</span>Apprenez-en plus sur la personne</p>
          <p><span className="tuto__bookmark-save" />Enregistrez l'entretien dans votre bibliothèque</p>
          {/* Les textes surlignés signifient que le publicateur a ajouté une annotation sur une partie du texte. Cliquez dessus pour la voir. */}
          <p>
          <span className="tuto__download" />Téléchargez l’entretien sous forme de PDF</p>
          <p><span className="tuto__quote" />Citez l’entretien grâce à des références exactes préformatées.</p>
          </div>
      </div>
      <div className="tuto__write">
        <h3 onClick={(event) => toggleSection(event.currentTarget)}>Espace écriture</h3>
        <div className="instructions instructions--write">
        <p><span className="tuto__content">></span>Remplissez toutes les informations sur l'entretien (tous les champs sont requis pour la publication)</p>
        <p><span className="tuto__content">></span>L'adresse email est obligatoire afin d'informer l'enquêté lors de la publication de l'entretien.
        <br/><em>Pour rappel, libre de droit signifie que les lecteurs peuvent citer librement vos entretiens — tout en référençant obligatoirement la source. Si vous ne souhaitez pas donner cette possibilité aux lecteurs, ils devront vous contacter et obtenir votre accord pour avoir accès à ces options.</em></p>
        <p><span className="tuto__content">></span>L'entretien est enregistré automatiquement.</p>
        <p><span className="tuto__trash"/> Supprimez l'entretien.</p>
        <p><span className="tuto__category"/>Séléctionnez les catégories personnelles dans lesquelles vous souhaitez ranger l'entretien (visible pour vous seulement).</p>
        <p><span className="tuto__export" />Publiez l’entretien, il sera disponible dans les résultats du moteur de recherche.</p>
        <p><span className="tuto__content">></span>Entrez le contexte de l'entretien (qui constituera une introduction)</p>
        <p><span className="tuto__question" />Entrez les questions (posées par l'auteur.e)</p>
        <p><span className="tuto__answer" />Entrez les réponses (fournies par le ou les enquêté.e.s)</p>
        </div>
      </div>
      <div className="tuto__search">
        <h3 onClick={(event) => toggleSection(event.currentTarget)}>Espace Recherche</h3>
        <div className="instructions instructions--search">
        <p>Entrez autant de critères que vous le souhaitez dans le moteur de recherche et visualisez les résultats selon trois modes.
        </p>
          <p className="tuto__mode__p"><span className="tuto__list tuto__round tuto__mode" />Liste: par ordre alphabétique des titres.</p>
          <p className="tuto__mode__p"><span className="tuto__planet tuto__round tuto__mode"/>Cartographie: lieux du déroulement des entretiens, ou des structure liées aux entretiens</p>
          <p className="tuto__mode__p"><span className="tuto__clock tuto__round tuto__mode"/>Chronologie: dates du déroulement des entretiens</p>
          {/* <span className="tuto__bookmark-save"/>Enregistrez une recherche pour la relancer à tout moment depuis votre bibliothèque. */}
          </div>
      </div> 
    </div>
  </div>
)};

export default UserLibraryRight;
