var React = require('react');
var Recieve = React.createClass({

  componentWillMount() {
    const { dispatch } = this.props
    const path = window.location.pathname.substr(9);

    dispatch({
        type: 'ROOM_CHANGE',
        room: path
      });
  },

  componentDidUpdate() {
    const { dispatch, peerConnectionStatus } = this.props

  },

  render: function() {
    return (
      <h2>recieve page</h2>
    );
  }
});

export default Recieve;
