var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>ID: {this.props.roomId}</h1>
        <input type="file" id="fileInput" />
      </div>
    );
  }
});
