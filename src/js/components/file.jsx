var React = require('react');

var File = React.createClass({
  render: function() {
    return (
      <div>
        <button id={this.props.key}>{this.props.name}</button>
      </div>
    );
  }
});

export default File;
