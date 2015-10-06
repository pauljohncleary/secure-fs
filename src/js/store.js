import { createStore } from 'redux';

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 */

 //Only one peer is ever allowed to join the room
function peerConnectionStatus(state = false, action) {
  switch (action.type) {
  case 'CONNECTED':
    return true;
  case 'DISCONNECTED':
    return false;
  case 'CONNECTING':
    return 'CONNECTING';
  default:
    return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(peerConnectionStatus);
export { store };
