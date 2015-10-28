var React = require('react');

module.exports = React.createClass({
  componentDidMount: function() {
    this.props.onRoomChange(this.props.roomId);
  },
  render: function() {
    return (
      <div>
        <h1>ID: {this.props.roomId}</h1>
        <input type="file" id="fileInput" />
      </div>
    );
  }
});
