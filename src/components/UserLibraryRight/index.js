import React from 'react';
import './style.scss';

const UserLibraryRight = () => (
  <div>
    <div>
      <h2>Notice</h2>
    </div>

    <div className="tuto__espace-perso">
      <p> <strong> Espace perso : </strong>
        <span className="tuto__pencil" />Modifiez votre profil
        <span className="tuto__plus" />Commencez un nouvel entretien (seulement disponible sur les écrans larges)
        <span className="tuto__deroulant" />Classez les entretiens de votre bibliothèque
        <span className="tuto__categoryplus" />Créez vos catégories personnelles, pour ranger vos documents
        Séléctionnez-les ou non afin de choisir ce qui apparait dans votre bibliothèque</p>
    </div>
    <div className="tuto__lecture">
      <p>
        <strong>Espace lecture :</strong>
        <span className="tuto__content">&#8594;</span>Apprenez-en plus sur la personne
        <span className="tuto__bookmark-save" />Enregistrez l'entretien dans votre bibliothèque
        {/* Les textes surlignés signifient que le publicateur a ajouté une annotation sur une partie du texte. Cliquez dessus pour la voir. */}
      </p>
      <p>
        <span className="tuto__download" />Téléchargez l’entretien sous forme de PDF
        <span className="tuto__quote" />Citez l’entretien grâce à des références exactes préformatées.
      </p>
    </div>
    <div className="tuto__write">
      <p>
        <strong>Espace écriture :</strong>
        <span className="tuto__content">></span>Remplissez toutes les informations sur l'entretien (tous les champs sont requis pour la publication)
        <span className="tuto__content">></span>L'adresse email est obligatoire afin d'informer l'enquêté lors de la publication de l'entretien.
        <br/><em>Pour rappel : libre de droit signifie que les lecteurs peuvent citer librement vos entretiens — tout en en citant obligatoirement la source. Si vous ne souhaitez pas donner cette possibilité aux lecteurs, ils devront vous contacter et obtenir votre accord pour avoir accès à ces options.</em>
        <span className="tuto__content">></span>L'entretien est enregistré automatiquement.
        <span className="tuto__trash"/> Supprimez l'entretien.
        <span className="tuto__category"/> Séléctionnez les catégories personnelles dans lesquelles vous souhaitez ranger l'entretien (visible pour vous seulement).
      </p>
    </div>
    <p>
      <span className="tuto__export" />Publiez l’entretien : il sera disponible dans les résultats du moteur de recherche.
      <span className="tuto__context" />Entrez le contexte de l'entretien (qui constituera une introduction)
      <span className="tuto__question" />Entrez les questions (posées par l'auteur)
      <span className="tuto__answer" />Entrez les réponses (fournies par l'enquêté)
    </p>
    <div className="tuto__search">
      <p>
      <strong>Espace Recherche :</strong>
        Entrez autant de critères que vous le souhaitez.
      </p>
      <p>
        Visualisez les résultats selon trois modes :
        <span className="tuto__list"/>— Liste: par ordre alphabétique des titres.
        <span className="tuto__planet"/>— Cartographie: lieux du déroulement des entretiens, ou des structure liées aux entretiens
        <span className="tuto__clock"/>— Chronologie: dates du déroulement des entretiens
        {/* <span className="tuto__bookmark-save"/>Enregistrez une recherche pour la relancer à tout moment depuis votre bibliothèque. */}
      </p>
    </div>
  </div>


  
);

export default UserLibraryRight;
