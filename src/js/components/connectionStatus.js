import React from 'react';

export var ConnectionStatus = React.createClass({
  getInitialState: function() {
    return {status: false};
  },
  render: function() {
    return <div> {this.state.status} </div>;
  }
});
