var React = require('react');
var connect = require('react-redux').connect;

var Send = require('./send.jsx');
var Recieve = require('./recieve.jsx');
var Status = require('./components/status.jsx');


const App = React.createClass({
  getInitialState() {
    return {
      route: window.location.pathname.substr(1)
    }
  },

  componentDidMount() {
    this.props.onRouteChange();
  },


  render() {
    let Child;
    switch (this.state.route) {
      case 'send': Child = Send; break;
      case 'recieve': Child = Recieve; break;
      default:      Child = Send;
    }

    const { dispatch, status } = this.props;

    return (
      <div>
        <Status status={status} />
        <Child />
      </div>
    )
  }
});

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    status: state.connectionStatus
  };
}

module.exports = connect(select)(App);
