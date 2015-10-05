var $ = require('jquery');
var simpleWebRTC = require('simplewebrtc');
global.jQuery = global.$ = $;

var webrtc = new simpleWebRTC({
    // we don't do video
    localVideoEl: '',
    remoteVideosEl: '',
    // dont ask for camera access
    autoRequestMedia: false,
    // dont negotiate media
    receiveMedia: {
        mandatory: {
            offerToReceiveAudio: false,
            offerToReceiveVideo: false
        }
    }
});

//url will contain the remote peer id, e.g https://senditdirect.com/sadf3r3
var remotePeerId = window.location.pathname.substr(1);
console.log(remotePeerId);
webrtc.joinRoom('sharingIdFromUrl');

// called when a peer is created
webrtc.on('createdPeer', function (peer) {
    console.log('peer connected', peer);

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


});

// select a file
var fileinput = document.createElement('input');
fileinput.type = 'file';
document.getElementById('remotes').appendChild(fileinput);
