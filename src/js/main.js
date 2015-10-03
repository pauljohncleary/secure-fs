var $ = require('jquery');
var easyrtc = require('easyrtc');

global.jQuery = global.$ = $;

alert("Hello Wooorld!");

//url will contain the remote peer id, e.g https://securefiles.com/sadf3r3
var remotePeerId = window.location.pathname.substr(1);
console.log(remotePeerId);

//after connecting to webrtc?
//we connect to that peer directly automatically

//display file send button once connection is established
