var React = require('react');
var Recieve = React.createClass({

  componentDidMount() {
    let path = window.location.pathname.substr(9);
    this.props.dispatch({
        type: 'ROOM_CHANGE',
        room: path
      });
  },

  render: function() {
    return (
      <h2>recieve page</h2>
    );
  }
});

export default Recieve;
