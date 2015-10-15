var $ = require('jquery');
var simpleWebRTC = require('simplewebrtc');
var React = require('react');
var store = require('./store');
var Provider = require('react-redux').Provider;
var View = require('./view.jsx');

global.jQuery = global.$ = $;

let rootElement = document.getElementById('remotes');
React.render(
  // bind to redux
  <Provider store={store}>
    {() => <View />}
  </Provider>,
  rootElement
);


//set things up for data transfers
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

store.dispatch({ type: 'CONNECTING' });


//url will contain the room name, e.g https://senditdirect.com/sadf3r3
var roomName = window.location.pathname.substr(1);
webrtc.joinRoom(roomName);

// called when a peer is created
webrtc.on('createdPeer', function (peer) {
  store.dispatch({ type: 'CONNECTED' });

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
  fileinput.addEventListener('change', function() {
      fileinput.disabled = true;

      var file = fileinput.files[0];
      var sender = peer.sendFile(file);
  });

  //monitor if the peer has connected or not
  peer.pc.on('iceConnectionStateChange', function (event) {
    switch (peer.pc.iceConnectionState) {
    case 'checking':
        store.dispatch({ type: 'CONNECTING' });
        break;
    case 'connected':
        store.dispatch({ type: 'CONNECTED' });
        break;
    case 'completed': // on caller side
        store.dispatch({ type: 'CONNECTED' });
        break;
    case 'disconnected':
        store.dispatch({ type: 'DISCONNECTED' });
        break;
    case 'failed':
        store.dispatch({ type: 'DISCONNECTED' });
        break;
    case 'closed':
        store.dispatch({ type: 'DISCONNECTED' });
        break;
    }
  });

});

//setup the input file box
var fileinput = document.createElement('input');
fileinput.type = 'file';
document.getElementById('remotes').appendChild(fileinput);
