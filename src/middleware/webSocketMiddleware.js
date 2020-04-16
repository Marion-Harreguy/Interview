import { CONNECT_WEBSOCKET, updateUser } from '../actions/socket';

// J'ai besoin de garder ma connexion ouverte tout le temps.

// Si je stockais ma connexions dans la fonction middelware
// elle serait détruite après chaque exécution de ma fonction.

// Je la stocke donc à la racine, et mon middleware lors de se première exécution
// va garder cette connexion dans ma variable.
let socket;

export default (store) => (next) => (action) => {

  switch (action.type) {
    case CONNECT_WEBSOCKET:

      console.log("Trying to connect websocket : ");
      socket = window.io('http://184.73.143.2/');

      // MAKE SOCKET HERE
      // socket.on(`api/users/${action.payload}`, (updatedUserData) => {
      //   console.log('received updatedUserData: ', updatedUserData);
      //   store.dispatch(updateUser(updatedUserData));
      // });

      // AS SOON AS THE API IS SENDING USER INFO BACK
      // store.dispatch(updateUser(payload));
      store.dispatch(updateUser(action.payload));

      break;
    // Dans le cas ou l'action.type est MESSAGE_SUBMIT
    // l'action ne doit plus aller à mon reducer, mais je dois
    // envoyer le message via Socket à mon serveur
    // Dans le message que j'envoie, il faut que je mette le bon content
    // et le bon author
    // socket.emit('send_message', { content: 'un message envoyé', author: 'userQuiLaEnvoyé' });
    default:
      next(action);
  }
};
