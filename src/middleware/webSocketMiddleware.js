import { CONNECT_WEBSOCKET, updateUser } from '../actions/socket';

let socket;

export default (store) => (next) => (action) => {

  switch (action.type) {
    case CONNECT_WEBSOCKET:

      console.log("Trying to connect websocket : ");
      // + put user token at the end
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
    default:
      next(action);
  }
};
