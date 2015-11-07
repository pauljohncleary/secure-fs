// Redux utility functions
import { compose, createStore, applyMiddleware } from 'redux';
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';


 var defaultState = {
   route: 'TBC',
   room: null,
   peerStatus: 'Connecting...',
   fileQueue: [],
   outgoingTransfers: [],
   incomingTransfers: [],
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
    let newArrays = moveFileAlong(state.fileQueue, state.outgoingTransfers, action.id);
    return Object.assign({}, state, {
      fileQueue: newArrays.from,
      outgoingTransfers: newArrays.to
    });
  case 'FILE_SENDING':
    return Object.assign({}, state, {
      outgoingTransfers: updateArrayItem(state.outgoingTransfers, action.id, {
        bytesSent: action.bytesSent
      })
    });
  case 'FILE_SENT':
    let updatedArrays = moveFileAlong(state.outgoingTransfers, state.sentFiles, action.id);
    return Object.assign({}, state, {
      outgoingTransfers: updatedArrays.from,
      sentFiles: updatedArrays.to
    });
  case 'NEW_INCOMING_FILE':
    return Object.assign({}, state, {
      incomingTransfers: state.incomingTransfers.concat([{'id': action.id, file: action.metadata}])
    });
  case 'FILE_DOWNLOADING':
    return Object.assign({}, state, {
      incomingTransfers: updateArrayItem(state.incomingTransfers, action.id, {
        bytesReceived: action.bytesReceived
      })
    });
  case 'FILE_RECIEVED':
    let changedArrays = moveFileAlong(state.incomingTransfers, state.availableForDownload, action.id);
    return Object.assign({}, state, {
      incomingTransfers: changedArrays.from,
      availableForDownload: changedArrays.to
    });
  default:
    return state;
  }

}

//takes an array from the state, copies it and updates it based on the update object passed to it
//the update object must be an object with a singple property
function updateArrayItem(arr, id, update) {
  let arrCopy = arr.slice(0);
  let index = arrCopy.findIndex((element) => {
    return element.id === id
  });
  let updatedFile = arrCopy.splice(index)[0];
  let key = Object.keys(update)[0];
  updatedFile[key] = update[key];
  arrCopy.push(updatedFile);
  return arrCopy;
};

//extract a file from an array by id and add it to another array
function moveFileAlong(fromArray, toArray, id) {
  let from = fromArray.slice(0);
  let to = toArray.slice(0);
  let fileIndex = from.findIndex((element) => {
    return element.id === id
  });
  let file = from.splice(fileIndex)[0];
  to.push(file);
  return {
    from: from,
    to: to
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
