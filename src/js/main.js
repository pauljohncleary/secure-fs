/* NEXT STEPS:
- use react router (or something else) to split into /send and /#hash (recieve) routes
- get the send page started
- abstract webrtc stuff into it's own file
- fix up the UI
- restrict to max two peers in a room
- encrypt files
*/

var jquery = require('jquery');
global.$ = jquery;
var simpleWebRTC = require('simplewebrtc');

var React = require('react');
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

var store = require('./store');
var App = require('./app.jsx');

let rootElement = document.getElementById('remotes');
React.render(
  <div>
    <Provider store={store}>
      {() => <App
        onRouteChange={ route =>
          store.dispatch({
            type: 'ROUTE_CHANGE',
            route: window.location.pathname.substr(1)
          })
        }/>}
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  rootElement
);

/**********
WEBRTC CODE BELOW
************/

//configure webrtc for data transfers
var webrtc = new simpleWebRTC({
    localVideoEl: '',
    remoteVideosEl: '',
    autoRequestMedia: false,
    receiveMedia: {
        mandatory: {
            offerToReceiveAudio: false,
            offerToReceiveVideo: false
        }
    }
});

//subscribe to the the peer connection status
//store.subscribe(() => console.log('peer: ', store.getState()) );

store.dispatch({
  type: 'PEERCONNECTIONSTATUS',
  status: 'Waiting for the other person to connect...'
});


//url will contain the room name, e.g https://senditdirect.com/sadf3r3
var roomName = window.location.pathname.substr(1);
webrtc.joinRoom(roomName);

// called when a peer is created
webrtc.on('createdPeer', function (peer) {
  store.dispatch({
    type: 'PEERCONNECTIONSTATUS',
    status: 'Connected'
  });

  // receiving an incoming filetransfer
  peer.on('fileTransfer', function (metadata, receiver) {
      console.log('incoming filetransfer', metadata.name, metadata);
      receiver.on('progress', function (bytesReceived) {
          console.log('receive progress', bytesReceived, 'out of', metadata.size);
      });
      // get notified when file is done
      receiver.on('receivedFile', function (file, metadata) {
          console.log('received file', metadata.name, metadata.size);

          // close the channel
          receiver.channel.close();
      });
      filelist.appendChild(item);
  });

  // send a file
  var fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', function() {
      fileInput.disabled = true;
      store.dispatch({
        type: 'PEERCONNECTIONSTATUS',
        status: 'File uploading...'
      });

      var file = fileInput.files[0];
      var sender = peer.sendFile(file);
  });

  //monitor if the peer has connected or not
  peer.pc.on('iceConnectionStateChange', function (event) {
    switch (peer.pc.iceConnectionState) {
    case 'checking':
      store.dispatch({
        type: 'PEERCONNECTIONSTATUS',
        status: 'Connecting...'
      });
      break;
    case 'connected':
    case 'completed': // on caller side
      store.dispatch({
        type: 'PEERCONNECTIONSTATUS',
        status: 'Connected'
      });
      break;
    case 'disconnected':
    case 'failed':
    case 'closed':
      store.dispatch({
        type: 'PEERCONNECTIONSTATUS',
        status: 'Waiting for the other person to connect...'
      });
      break;
    }
  });

});
