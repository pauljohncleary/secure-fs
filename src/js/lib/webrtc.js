var simpleWebRTC = require('simplewebrtc');

export function sharedWebRTC() {

  //configure webrtc for data transfers
  return new simpleWebRTC({
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

  var setupRecieveFile = function(peer) {
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
  }

}
