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
      sharedWebRTC(store);
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

      const { dispatch, status } = this.props;

      return (
        <div>
          <Status status={status} />
          <Child dispatch={dispatch}/>
        </div>
      )
    }
  });

  // Which props do we want to inject, given the global state?
  // Note: use https://github.com/faassen/reselect for better performance.
  function mapStateToProps(state) {
    return {
      status: state.connectionStatus
    };
  }

  return connect(mapStateToProps)(App);
};
