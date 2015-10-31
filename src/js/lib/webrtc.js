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
}
