export const CONNECT_WEBSOCKET = 'CONNECT_WEBSOCKET';
export const UPDATE_USER = 'UPDATE_USER';

export const connectWebsocket = (payload) => ({
  type: CONNECT_WEBSOCKET,
  payload,
});

export const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});
