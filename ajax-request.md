LOGIN
Se connecter : post + /login/
> Response.data = user data
[Ajax : LOGIN]

CREATE USER
Créer utilisateur : post + /api/users/
> Response.data = user id
[Ajax : CREATE_USER]
OU nécéssaire de faire une requête get pour récupérer les user data ?

ESPACE PERSO
Au load de la page : get + /api/users/{id} (mettre credentials)
[Ajax : UPDATE_USER_GET]
> Response.data = user data
*reload user data

Changer les infos (dataUser / dataStructure) : put + /api/users/{id} (envoyer seulement dataUser & dataStructure ou tout ?)
[Ajax : UPDATE_USER_PUT]
> No response.data
*reload user data
[Ajax : UPDATE_USER_GET]

Ajouter une catégorie : put + /api/users/{id}/categories/ (envoyer seulement la nouvelle catégorie)
[Ajax : UPDATE_USER_CATEGORIES]
> No response.data
*reload user data
[Ajax : UPDATE_USER_GET]

READ
Au load de la page : get + /api/interviews/{id}
> Response.data = objet readInterview (> state)
[Ajax : READ_INTERVIEW]
** Checker si l'id est présent dans le savedInterviews

Au clic sur enregistrer l’entretien : put + /api/users/{id} (envoyer seulement le dashboard ou tout le user ?)
> No response.data
*reload user data
[Ajax : UPDATE_USER_GET]
** Rechecker si l'id est présent dans le savedInterviews


WRITE
Au load de la page : DEUX OPTIONS :
— Si interviewId est defined (route /write/{interviewId}) : get + /api/interviews/{id}
[Ajax : WRITE_INTERVIEW_GET]
> Response.data = l'objet writeArticle (state)
- Si interviewId est undefined (route /create en front) : post + /api/interviews/ (pour créer un nouvel entretien)
[Ajax : WRITE_INTERVIEW_CREATE]
> Response.data = id du nouvel article
** On passe sur la route write/{idrécupéré}

Changement des méta (on non-focus) : put + /api/interviews/{id} (poster seulement les méta ou tout l'interview ?)
[Ajax : WRITE_INTERVIEW_PUT]
> No response.data
* Recharger l'interview ?
[Ajax : WRITE_INTERVIEW_GET]

Changement des catégories (de l'interview) : put + /api/users/{id} (renvoyer seulement le dashboard ou tout le user?)
[Ajax : UPDATE_USER_PUT]
> No response.data
* Recharger le userData
[Ajax : UPDATE_USER_GET]

Publication : put + /api/interviews/{id} (poster tout ou juste published : true)
post + route (pour ajouter aux interview publiées du user)
[Ajax : WRITE_INTERVIEW_PUT]
> No response.data
* Recharger le userData
[Ajax : UPDATE_USER_GET]
* Recharger l'interview
[Ajax : WRITE_INTERVIEW_GET]

Supprimer : delete + /api/interviews/{id} (pour supprimer l'interview — mais comment gérer la suppression dans le dashboard ? autre requête ?)
> No response.data
[Ajax : WRITE_INTERVIEW_DELETE]
[Ajax : UPDATE_USER_PUT]
/!\ Retourner sur espace perso

Changement du contenu (on non-focus) : put + /api/interviews/{id} (poster seulement la nouvelle question / réponse ou tout le contenu de l'interview — sans meta ?)
[Ajax : WRITE_INTERVIEW_PUT]
> No response.data
* Recharger l'interview
[Ajax : WRITE_INTERVIEW_GET]

Search :
+ tard

forgotten password :
+ tard

LISTE DES ACTIONS AJAX :

[Ajax : UPDATE_USER_PUT]
[Ajax : UPDATE_USER_GET]
[Ajax : CREATE_USER]

[Ajax : UPDATE_USER_CATEGORIES] ? ou direct [Ajax : UPDATE_USER_PUT] ?

[Ajax : READ_INTERVIEW]

[Ajax : WRITE_INTERVIEW_GET]
[Ajax : WRITE_INTERVIEW_PUT]
[Ajax : WRITE_INTERVIEW_DELETE]
