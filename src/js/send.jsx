var React = require('react');
import { connect } from 'react-redux';
var Component = require('react'),Component;
var PropTypes = require('react'),PropTypes;
var uuid = require('uuid');

var SendArea = require('./components/sendFile.jsx');

var Send = React.createClass({

  getDefaultProps(){
    //generate a room id
    return {
      roomId: uuid.v4()
    };
  },
  render: function() {
    return (
      <div>
        <SendArea
          roomId = {this.props.roomId}
          onRoomChange = {this.props.onRoomChange}
        />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {};
};


function mapDispatchToProps(dispatch) {
  return {
    onRoomChange: (roomId) => dispatch({
      type: 'ROOM_CHANGE',
      room: roomId
    })
  };
};

//connect makes it smart
export default connect(mapStateToProps, mapDispatchToProps)(Send);
