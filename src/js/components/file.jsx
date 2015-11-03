var React = require('react');

var File = React.createClass({

  sendFile: function() {
    this.props.dispatch({
      type: 'SEND_FILE',
      id: this.props.id
    });
  },

  render: function() {
    return (
      <div>
        <button id={this.props.key} onClick={this.sendFile}>{this.props.name}</button>
      </div>
    );
  }
});

export default File;
