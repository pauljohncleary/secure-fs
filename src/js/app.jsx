var React = require('react');
var connect = require('react-redux').connect;

var Send = require('./send.jsx');
var Recieve = require('./recieve.jsx');
var Status = require('./components/status.jsx');
var NotFound = require('./components/404.jsx');
import { sharedWebRTC } from './lib/webrtc';


module.exports = function(store) {

  const App = React.createClass({
    getInitialState() {
      return {
        route: window.location.pathname.substr(1)
      }
    },

    componentDidMount() {
      this.props.onRouteChange();

      let webrtc = sharedWebRTC();
      webrtc.joinRoom(store.getState().room);
      store.dispatch({
        type: 'PEERCONNECTIONSTATUS',
        status: 'Connecting to other computer...'
      });
      // called when a peer is created
      webrtc.on('createdPeer', function (peer) {
        store.dispatch({
          type: 'PEER_CHANGE',
          peer: peer
        })

        //monitor if the peer has connected or not
        peer.pc.on('iceConnectionStateChange', function (event) {
          switch (peer.pc.iceConnectionState) {
          case 'checking':
          case 'connected':
          case 'completed': // on caller side
            store.dispatch({
              type: 'PEER_CHANGE',
              peer: peer
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

    },

    render() {
      let Child;
      let regex = /recieve\/.*/;
      if(regex.exec(this.state.route)) {
        Child = Recieve;
      } else if(this.state.route === 'send'){
        Child = Send;
      } else {
        Child = NotFound;
      }

      const { dispatch, peerConnectionStatus, peer} = this.props;

      return (
        <div>
          <Status peerConnectionStatus={peerConnectionStatus}/>
          <Child dispatch={dispatch} peer={peer}/>
        </div>
      )
    }
  });

  // Which props do we want to inject, given the global state?
  // Note: use https://github.com/faassen/reselect for better performance.
  function mapStateToProps(state) {
    return {
      peerConnectionStatus: (typeof state.peer.pc === 'undefined' ? 'Connecting...' : state.peer.pc.iceConnectionState ),
      peer: state.peer
    };
  }

  return connect(mapStateToProps)(App);
};
