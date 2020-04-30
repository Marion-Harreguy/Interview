import React from 'react';
import './style.scss';
import $ from 'jquery';


const Contact = () => {

  const toggleClosed = () => {
    $('.right__contact').animate({ marginTop: '110vh' }, 300);
  };

  return (
    <div className="right__contact row">
      <button type="button" className="contact__close" onClick={() => toggleClosed()} label="Fermer" />
      <div className="contact col-12 col-lg-4 col-xl-4">
      <h4>Notre équipe</h4>
        <p>La plateforme Inter.view a été développée dans le cadre de la formation O'clock par Marion Harreguy, Arnaud Ola, Gaël Glotin et Laura Piccolo.</p>
        <a href="mailto:hello.laurapiccolo@gmail.com">Contactez-nous ici !</a>
      </div>
      <div className="legal__mentions col-12 col-lg-8 col-xl-8">
        <h4> Mentions légales et Politique de confidentialité</h4>
        <div className="legal__mentions--scroll">
        <h5>Droits de propriété intellectuelle</h5>
        <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction et de distribution sont réservés (sauf pour un usage strictement privé), y compris les illustrations et les photographies.
        </p>
        <p>Le principe de la courte citation doit être respecté sous réserve de mentionner le lien d'origine de la page citée (ou, à défaut, la page d'accueil) ou, dans le cas d'une reproduction sur support physique, en mentionnant l'auteur et l'URL du page citée.
        </p>
        <p>Toute autre reproduction ou représentation, ou du contenu de ce site par quelque moyen que ce soit, est soumise à autorisation.
        </p>
        <p>Pour toute question à ce sujet, envoyez un e-mail à: <a href="mailto:hello.laurapiccolo@gmail.com">team@interview.fr</a>
        </p>
        <p>Pour plus d'informations sur la propriété intellectuelle, les utilisateurs peuvent visiter: <a href="www.legifrance.gouv.fr" target="_blank">www.legifrance.gouv.fr</a>.
        </p>
        <h5>Licence Interview pour les entretiens</h5>
        <p>Tous les entretiens en libre accès sur la plateforme Interview sont protégés par la loi française (droits d’auteur). Ils sont en accès libre pour tous, et ce sans limitation. Ils peuvent être partagés avec notre lectorat, dans n'importe quel contexte, pour un usage privé également.
        </p>
        <h5>Liens vers d'autres sites Web</h5>
        <p>Interview peut contenir des liens vers des sites Web existants ou vers des sites Web exploités par des tiers. La plateforme ne peut exercer un contrôle permanent sur ces sites, ni assumer aucune responsabilité quant à leurs conditions d'accès, de contenu, de publicité et de services offerts ou à l'utilisation qui peut en être faite.</p>

        {/* <p>Cookies et confidentialité
        Veuillez vous référer à notre politique de confidentialité: https://www.openedition.org/19362 */}

        <h5>Avertissement</h5>
        <p>Malgré le soin apporté à la réalisation de la plateforme et à ses mises à jour régulières, la responsabilité de l'éditeur sera engagée en cas d'erreurs ou d'omissions dans le contenu.</p>
        </div>
      </div>
    </div>
)};

export default Contact;
