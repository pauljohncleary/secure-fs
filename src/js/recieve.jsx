var React = require('react');
import { connect } from 'react-redux';
var Recieve = React.createClass({

  componentDidMount() {

    //get the hash from the url?
    //connect to webrtc

  },

  render: function() {
    return (
      <h2>recieve page</h2>
    );
  }
});

//connect makes it smart
export default connect()(Recieve);
