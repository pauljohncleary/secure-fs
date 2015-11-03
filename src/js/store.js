// Redux utility functions
import { compose, createStore, applyMiddleware } from 'redux';
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';


 var defaultState = {
   route: 'TBC',
   room: null,
   peerStatus: 'Connecting...',
   fileQueue: [],
   transfers: [],
   availableForDownload: [],
   sentFiles: []
 }

function reducer(state = defaultState, action) {
  switch (action.type) {
  case 'PEER_CHANGE':
    return Object.assign({}, state, {
      peerStatus: action.peerStatus
    });
  case 'PEER_DISCONNECT':
    return Object.assign({}, state, {
      peerStatus: 'Connecting...'
    });
  case 'ROUTE_CHANGE':
    return Object.assign({}, state, {
      route: route(action.route)
    });
  case 'ROOM_CHANGE':
    return Object.assign({}, state, {
      room: action.room
    });
  case 'NEW_FILE':
    return Object.assign({}, state, {
      fileQueue: state.fileQueue.concat([{'id': action.id, file: action.file}])
    });
  case 'SEND_FILE':
    let fileQueue = state.fileQueue;
    let transfers = state.transfers;
    let fileIndex = fileQueue.findIndex((element) => {
      return element.id === action.id
    });

    let file = fileQueue.splice(fileIndex)[0];
    transfers.push(file);

    return Object.assign({}, state, {
      fileQueue: fileQueue,
      transfers: transfers
    });
  case 'FILE_SENDING':
    let currentTransfers = state.transfers;

    let index = currentTransfers.findIndex((element) => {
      return element.id === action.id
    });

    let updatedFile = currentTransfers.splice(index)[0];
    file.bytesSent = action.bytesSent;
    currentTransfers.push(updatedFile);

    return Object.assign({}, state, {
      transfers: currentTransfers
    });
  case 'FILE_SENT':
    let transfers2 = state.transfers;
    let sentFiles2 = state.sentFiles;
    let fileIndex2 = transfers2.findIndex((element) => {
      return element.id === action.id
    });

    let file2 = transfers2.splice(fileIndex)[0];
    sentFiles2.push(file2);

    return Object.assign({}, state, {
      sentFiles: sentFiles2,
      transfers: transfers2
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
