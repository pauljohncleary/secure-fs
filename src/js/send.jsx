var React = require('react');
var connect = require('react-redux').connect;
var Component = require('react'),Component;
var PropTypes = require('react'),PropTypes;
var uuid = require('uuid');

var SendArea = require('./components/sendFile.jsx');


var Send = React.createClass({

  componentDidMount() {

      this.roomId = generateRoomId();

    /*connect.dispatch({
      type: 'NEW_HASH_ID',
      payload: {
        hashId: 'test'
      }
    });*/

  },
  render: function() {
    // Injected by connect() call at end of the file
    const { dispatch } = this.props;
    return (
      <div>
        <SendArea roomId={this.roomId}/>
      </div>
    );
  }
});

function generateRoomId() {
  return uuid.v4();
}

module.exports = Send;
