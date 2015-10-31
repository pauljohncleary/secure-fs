var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <p>{this.props.peerConnectionStatus}</p>
      </div>
    );
  }
});
