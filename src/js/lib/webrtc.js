var simpleWebRTC = require('simplewebrtc');
var uuid = require('uuid');

export function sharedWebRTC(store) {

  //configure webrtc for data transfers
  var webrtc =  new simpleWebRTC({
      localVideoEl: '',
      remoteVideosEl: '',
      autoRequestMedia: false,
      //url: 'http://localhost:8888',
      receiveMedia: {
          mandatory: {
              OfferToReceiveAudio: false,
              OfferToReceiveVideo: false
          }
      }
  })

  webrtc.joinRoom(store.getState().room);

  // called when a peer is created
  webrtc.on('createdPeer', function (peer) {

    store.dispatch({
      type: 'PEER_CHANGE',
      peerStatus: peer.pc.iceConnectionState
    });

    //handle sending files
    function select(state) {
      return state.outgoingTransfers.length
    }

    let numberOfCurrentTransfers;
    function monitorFileQueue() {
      let oldTransfers = numberOfCurrentTransfers;
      numberOfCurrentTransfers = select(store.getState());

      if (oldTransfers < numberOfCurrentTransfers) {

        let transfers = store.getState().outgoingTransfers.slice(0);
        var file = transfers[0];
        var sender = peer.sendFile(file.file);

        sender.on('progress', function(bytesSent) {
          store.dispatch({
            type: 'FILE_SENDING',
            id: file.id,
            bytesSent: bytesSent
          });
        });

        sender.on('complete', function() {
          store.dispatch({
            type: 'FILE_SENT',
            id: file.id
          });
        });
      }
    }

    let unsubscribe = store.subscribe(monitorFileQueue);
    monitorFileQueue();

    //handle receiving files
    peer.on('fileTransfer', function (metadata, receiver) {
      let fileTransferId = uuid.v4();
      store.dispatch({
        type: 'NEW_INCOMING_FILE',
        id: fileTransferId,
        metadata: metadata
      });
      receiver.on('progress', function (bytesReceived) {
        store.dispatch({
          type: 'FILE_DOWNLOADING',
          id: fileTransferId,
          bytesReceived: bytesReceived
        });
      });
      receiver.on('receivedFile', function (file, metadata) {
        store.dispatch({
          type: 'FILE_RECIEVED',
          id: fileTransferId
        });
        receiver.channel.close();
      });
    });

    //monitor if the peer has connected or not
    peer.pc.on('iceConnectionStateChange', function (event) {
      switch (peer.pc.iceConnectionState) {
      case 'checking':
      case 'connected':
      case 'completed': // on caller side
        store.dispatch({
          type: 'PEER_CHANGE',
          peerStatus: peer.pc.iceConnectionState
        });
        break;
      case 'disconnected':
      case 'failed':
      case 'closed':
        store.dispatch({
          type: 'PEER_DISCONNECT'
        });
        break;
      }
    });
  });
};
