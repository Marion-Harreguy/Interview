Week-end :
— Faire une 404 cool 

S4 :
LUNDI :
— Verifier tous les objets des requêtes axios, et que tout fonctionne
Read :
— Avoir les pastilles de catégories si l'entretien est enregistré 
— Gérer les structures dans read 
— Ajouter les tags
— Si on est l'auteur, crayon modifier pour passer sur /update/id
— Catégories ne passent pas dans l'enregistrement
Write :
— Gérer les inputs mandatory (to publish)

<!-- So it looks like you're trying to mix and match react-router v2 and v4, which are very different.

A couple of points:

Creating a new browserHistory won't work because <BrowserRouter> creates its own history instance, and listens for changes on that. So a different instance will change the url but not update the <BrowserRouter>.
browserHistory is not exposed by react-router in v4, only in v2.
If you want the full history object you can also grab that off context like router.

this.context.history.push('/path') -->


MARDI :
Search
— Menu déroulant pour classer les résultats ?
All
— Ajouter les tutos quand pas d'entretien selectionné ou pas de contenu (write, search)
Read
— Survol des initiales, noms qui se mettent en gras à gauche
— Cacher bouton télécharger si pas libre de droit
— Ajouter un bouton "citer" 
UserLibrary — Supprimer une catégorie
— Commenter et clean le code 
MERCREDI :
— CSS mobile
— Gérer le forgotten password
— Mentions légales
— Vérifier le système qui génère les coordonnées

En plus si il y a le temps :
— Zoom dans la frise chronologique
— Limiter le nombre de catégories (masquer l’input si il y a plus de 20 catégories)

Futur :
— Webtoprint [Baptiste]
— Supprimer un user 
— Modifier le nom ou l'email d'un user
— Plusieurs paramètres dans le moteur de recherche
— Recherche sémantique ? ("", &, /)
— Bouton "contacter" avec formulaire si pas libre de droit       > et donc système d’autorisation par id à gérer en front et en back
— Enregistrer une recherche (avec notif si nouveau résultat dans résultats correspondant à une recherche enregistrée ?)
— Bouton signaler ?
— Nécessité d’accepter les conditions d’utilisation pour s’inscrire

— Enlever 2eme enquête si vide