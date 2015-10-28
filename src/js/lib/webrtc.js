var simpleWebRTC = require('simplewebrtc');

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
