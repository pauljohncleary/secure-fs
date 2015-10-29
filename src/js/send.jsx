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
    const { dispatch, status } = this.props;

    return (
      <div>
        <SendArea
          roomId = {this.props.roomId}
          onRoomChange =  {() => dispatch({
              type: 'ROOM_CHANGE',
              room: this.props.roomId
            })}
        />
      </div>
    );
  }
});

//connect makes it smart
export default Send;
