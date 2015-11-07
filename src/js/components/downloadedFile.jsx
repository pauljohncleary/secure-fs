var React = require('react');

var DownloadedFile = React.createClass({
  render: function() {
    return (
      <div>
        <a href="#" id={this.props.key}>{this.props.name}</a>
      </div>
    );
  }
});

export default DownloadedFile;
