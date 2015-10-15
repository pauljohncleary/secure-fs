var createStore = require('redux').createStore;

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 */

function store(state = false, action) {
  switch (action.type) {
  case 'PEERCONNECTIONSTATUS':
    return Object.assign({}, state, {
      connectionStatus: action.status
    });
  default:
    return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
module.exports = createStore(store);
