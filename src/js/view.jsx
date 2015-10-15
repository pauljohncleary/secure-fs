var React = require('react');
var connect = require('react-redux').connect;
var Status = require('./components/status.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {status: 'Connecting...'};
  },
  render: function() {
    return (
      <div>
        <Status status={this.state.status} />
      </div>
    );
  }
});
