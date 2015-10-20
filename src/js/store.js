// Redux utility functions
import { compose, createStore, applyMiddleware } from 'redux';
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 */

 var defaultState = {
   connectionStatus: 'Starting up...',
   route: 'TBC',
   room: null
 }

function reducer(state = defaultState, action) {
  switch (action.type) {
  case 'PEERCONNECTIONSTATUS':
    return Object.assign({}, state, {
      connectionStatus: action.status
    });
  case 'ROUTE_CHANGE':
    return Object.assign({}, state, {
      route: route(action.route)
    });
  case 'ROOM_CHANGE':
    return Object.assign({}, state, {
      room: action.room
    });
  default:
    return state;
  }
}

//route should be the string after the domain
function route(route) {
  //check if it is send
  if(route === 'send') {
    return 'send';
  } else if (route === '') {
    return 'landing';
  } else if (route.substr(0,7) === 'recieve') {
    return 'recieve';
  } else {
    return 'landing';
  }
}

const finalCreateStore = compose(
  // Enables your middleware:
  //applyMiddleware(m1, m2, m3), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
module.exports = finalCreateStore(reducer);
