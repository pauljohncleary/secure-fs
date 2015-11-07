var React = require('react');

var IncomingFile = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.name}
        {this.props.bytesReceived}
      </div>
    );
  }
});

export default IncomingFile;
