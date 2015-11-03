var simpleWebRTC = require('simplewebrtc');

export function sharedWebRTC(store) {

  //configure webrtc for data transfers
  var webrtc =  new simpleWebRTC({
      localVideoEl: '',
      remoteVideosEl: '',
      autoRequestMedia: false,
      receiveMedia: {
          mandatory: {
              offerToReceiveAudio: false,
              offerToReceiveVideo: false
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

    function select(state) {
      return state.transfers.length
    }

    let numberOfCurrentTransfers;
    function monitorFileQueue() {
      let oldTransfers = numberOfCurrentTransfers;
      numberOfCurrentTransfers = select(store.getState());

      if (oldTransfers < numberOfCurrentTransfers) {

        let transfers = store.getState().transfers;
        var file = document.getElementById('fileInput').files[0];


        var sender = peer.sendFile(file);
        //FILE IS NULL!!! AHHHHHHHHHHHHHH
        console.log(sender);

        sender.on('progress', function(bytesSent) {
          dispatch({
            type: 'FILE_SENDING',
            id: fileId,
            bytes: bytesSent
          });
        });

        sender.on('complete', function() {
          dispatch({
            type: 'FILE_SEND_COMPLETE',
            id: fileId,
          });
        });
      }
    }

    let unsubscribe = store.subscribe(monitorFileQueue)
    monitorFileQueue()

    /*

    */

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
      //filelist.appendChild(item);
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
